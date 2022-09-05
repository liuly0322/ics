import as from './lc3_as'
import hexbin from './lc3_hexbin'
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
  actualAnsFunc: (lc3: Core) => number):
  CaseResult {
  const expectedAns = expectedAnsFunc(lc3, testcase)
  const logs: string[] = []

  lc3.pc = 0x3000
  lc3.psr = 0x8002

  let cnt
  for (cnt = 0; cnt < limit; cnt++) {
    let regs: number[]
    const op = lc3.decode(lc3.getMemory(lc3.pc))

    if (log) {
      const curInstr = lc3.instructionAddressToString(lc3.pc)
      logs.push(`x${lc3.pc.toString(16)}：${curInstr}`)
      regs = Array.from(lc3.r)
    }

    if ((op.raw >= 61440 && op.raw <= 61695) || op.raw === 0)
      break

    lc3.nextInstruction()

    if (log) {
      lc3.r.forEach((v: number, i: number) => {
        if (v !== regs[i]) {
          const log = logs.pop()
          logs.push(`${log}，R${i} 由 ${regs[i]} 变为 ${v}`)
        }
      })
    }
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
  const hexbinResult = hexbin(code)
  if (!('error' in asResult)) {
    lc3.loadAssembled(asResult)
    result.state = 'assembly'
  }
  else if (!('error' in hexbinResult)) {
    if (hexbinResult.orig !== 0x3000) {
      const hexbinResult = hexbin(`0011000000000000\n${code}`)
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

  const caseResults = testcases.map(
    testcase => caseTest(lc3, instrLimit, log, testcase, expectedAnsFunc, actualAnsFunc),
  )

  // 分析运行结果
  caseResults.forEach((testcase) => {
    if (testcase.instructions >= instrLimit) {
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

  const totalCases = caseResults.length
  const totalInstructions = caseResults.reduce((acc, testcase) => acc + testcase.instructions, 0)
  result.logs!.push(`平均指令数: ${totalInstructions / totalCases}`)

  const passCases = caseResults.filter(testcase => testcase.expectedAns === testcase.actualAns).length
  result.passes = `${passCases} / ${totalCases} 个通过测试用例`

  return result
}
