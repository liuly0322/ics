import as from './lc3_as'
import hexbin from './lc3_hexbin'
import type { AssemblyResult, Event } from './lc3_core'
import Core from './lc3_core'

class CaseResult {
  constructor(
    public testcase: string,
    public expectedAns: number,
    public instructions: number,
    public logs: string[],
    public actualAns: number,
  ) {
    this.instructions = instructions
    this.logs = logs
    this.testcase = testcase
    this.expectedAns = expectedAns
    this.actualAns = actualAns
  }
}

function caseTest(
  lc3: Core,
  limit: number,
  log: boolean,
  testcase: string,
  expectedAnsFunc: (lc3: Core, testcase: string) => number,
  actualAnsFunc: (lc3: Core) => number,
):
  CaseResult {
  const expectedAns = expectedAnsFunc(lc3, testcase)
  const logs: string[] = []

  const eventCallback = (event: Event) => {
    let log = ''
    switch (event.type) {
      case 'exception':
        log = `异常：${event.exception}`
        break
      case 'memset':
        log = `x${event.address.toString(16)} 变为 ${event.newValue}`
        break
      case 'regset':
        if (typeof event.register == 'number')
          log = `R${event.register} 变为 ${event.newValue}`
    }
    if (log) {
      const last = logs.pop()!
      logs.push(`${last} (${log})`)
    }
  }
  if (log)
    lc3.addListener(eventCallback)

  const performInstructionCycle = log
    ? () => {
        const curInstr = lc3.instructionAddressToString(lc3.pc)
        logs.push(`x${lc3.pc.toString(16)}：${curInstr}`)
        lc3.nextInstruction()
      }
    : () => {
        lc3.nextInstruction()
      }

  let cnt = 0
  for (; cnt <= limit; cnt++) {
    const op = lc3.memory[lc3.pc]
    if ((op >= 0xF000 && op <= 0xF0FF) || op === 0)
      break

    performInstructionCycle()
  }

  const actualAns = actualAnsFunc(lc3)
  return new CaseResult(testcase, expectedAns, cnt, logs, actualAns)
}

export interface BenchResult {
  state?: 'assembly' | 'machine'
  passes?: string
  logs?: string[]
}

export default function lc3bench(
  code: string,
  testCode: string,
  ansCode: string,
  testcases: string[],
  instrLimit: number,
  log: boolean,
): BenchResult {
  const result: BenchResult = { logs: [] }

  const lc3 = new Core()
  const asResult = as(code)
  let hexbinResult = hexbin(code)
  if (!('error' in asResult)) {
    lc3.loadAssembled(asResult)
    result.state = 'assembly'
  }
  else if (!('error' in hexbinResult)) {
    if (hexbinResult.orig !== 0x3000) {
      hexbinResult = hexbin(`0011000000000000\n${code}`) as AssemblyResult
      lc3.loadAssembled(hexbinResult)
    }
    else {
      lc3.loadAssembled(hexbinResult)
    }
    result.state = 'machine'
  }
  else {
    return {
      logs: ['代码无法被识别为正确的机器码或者汇编代码',
        `机器码：${hexbinResult.error}`,
        `汇编：${asResult.error}`],
    }
  }

  let expectedAnsFunc: (lc3: Core, testcase: string) => number
  let actualAnsFunc: (lc3: Core) => number
  try {
    // eslint-disable-next-line no-new-func
    expectedAnsFunc = Function('lc3', 'testcase', testCode) as (lc3: Core, testcase: string) => number
  }
  catch {
    return { logs: ['评测函数编写出现语法错误'] }
  }

  try {
    // eslint-disable-next-line no-new-func
    actualAnsFunc = Function('lc3', ansCode) as (lc3: Core) => number
  }
  catch {
    return { logs: ['答案函数编写出现语法错误'] }
  }

  if (log)
    testcases = [testcases[0]]

  const caseResults = testcases.map((testcase) => {
    const lc3 = new Core()
    if (result.state === 'assembly')
      lc3.loadAssembled(asResult as AssemblyResult)
    else
      lc3.loadAssembled(hexbinResult as AssemblyResult)
    return caseTest(lc3, instrLimit, log, testcase, expectedAnsFunc, actualAnsFunc)
  })

  const totalCases = caseResults.length
  const passCases = caseResults.filter(testcase => testcase.expectedAns === testcase.actualAns).length
  const totalInstructions = caseResults.reduce((acc, testcase) => acc + testcase.instructions, 0)

  result.passes = `${passCases} / ${totalCases} 个通过测试用例`
  result.logs!.push(`平均指令数: ${totalInstructions / totalCases}`)

  caseResults.forEach((testcase) => {
    if (testcase.instructions > instrLimit) {
      result.logs!.push(
        `异常 ${testcase.testcase}, 超出最大指令数，请调整设置，或者可能发生了死循环`,
      )
    }
    else if (testcase.expectedAns === testcase.actualAns) {
      result.logs!.push(
        `通过 ${testcase.testcase}, 指令数: ${testcase.instructions}, 输出: ${testcase.actualAns}`,
      )
    }
    else {
      result.logs!.push(
        `失败 ${testcase.testcase}, 指令数: ${testcase.instructions}, 输出: ${testcase.actualAns}, 预期: ${testcase.expectedAns}`,
      )
    }
    if (log)
      result.logs!.push(...testcase.logs)
  })

  return result
}
