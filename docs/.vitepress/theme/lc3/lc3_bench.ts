import as from './lc3_as'
import hexbin from './lc3_hexbin'
import Core from './lc3_core'

class SimResult {
  instructions = 0
  logs: string[]
  constructor(instructions: number, logs?: string[]) {
    this.instructions = instructions
    this.logs = logs ?? []
  }
}

class CaseResult extends SimResult {
  testcase
  expectedResult
  yourResult
  constructor(
    testcase: string,
    expectedResult: number,
    instructions: number,
    logs: string[],
    yourResult: number,
  ) {
    super(instructions, logs)
    this.testcase = testcase
    this.expectedResult = expectedResult
    this.yourResult = yourResult
  }
}

// 进行单个样例的测试，返回总用指令数以及 log（如果有）
function caseTest(lc3: Core, limit: number, log: boolean): SimResult {
  const logs: string[] = []
  lc3.pc = 0x3000
  lc3.psr = 0x8002
  for (let cnt = 0; cnt <= limit; cnt++) {
    let regs: number[]
    const op = lc3.decode(lc3.getMemory(lc3.pc))
    if (log) {
      const curInstr = lc3.instructionAddressToString(lc3.pc)
      logs.push(`x${lc3.pc.toString(16)}：${curInstr}`)
      regs = Array.from(lc3.r)
    }
    if ((op.raw >= 61440 && op.raw <= 61695) || op.raw === 0)
      return new SimResult(cnt, logs)

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
  return new SimResult(limit, logs)
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

  let expectedResult: (arg0: string) => number
  let yourResult: () => number
  try {
    // eslint-disable-next-line no-eval
    eval(`expectedResult = ${testCode}`)
  }
  catch {
    return { logs: ['评测函数编写出现语法错误'] }
  }

  try {
    // eslint-disable-next-line no-eval
    eval(`yourResult = ${ansCode}`)
  }
  catch {
    return { logs: ['答案函数编写出现语法错误'] }
  }

  if (log)
    testcases = [testcases[0]]

  const caseResults = testcases.map(
    (testcase) => {
      const expected = expectedResult(testcase)
      const simResult = caseTest(lc3, instrLimit, log)
      const yourAns = yourResult()
      return new CaseResult(
        testcase,
        expected,
        simResult.instructions,
        simResult.logs,
        yourAns,
      )
    },
  )

  // 分析运行结果
  caseResults.forEach((testcase) => {
    if (testcase.instructions >= instrLimit) {
      result.logs!.push(
        `异常 ${testcase.testcase}, 超出最大指令数，请调整设置，或者可能发生了死循环`,
      )
    }
    else if (testcase.expectedResult === testcase.yourResult) {
      result.logs!.push(
        `通过 ${testcase.testcase}, 指令数: ${testcase.instructions}, 输出: ${testcase.yourResult}`,
      )
    }
    else {
      result.logs!.push(
        `失败 ${testcase.testcase}, 指令数: ${testcase.instructions}, 输出: ${testcase.yourResult}, 预期: ${testcase.expectedResult}`,
      )
    }
    if (log)
      result.logs!.push(...testcase.logs)
  })

  const totalCases = caseResults.length
  const totalInstructions = caseResults.reduce((acc, testcase) => acc + testcase.instructions, 0)
  result.logs!.push(`平均指令数: ${totalInstructions / totalCases}`)

  const passCases = caseResults.filter(testcase => testcase.expectedResult === testcase.yourResult).length
  result.passes = `${passCases} / ${totalCases} 个通过测试用例`

  return result
}
