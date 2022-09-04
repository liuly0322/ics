import as from './lc3_as'
import hexbin from './lc3_hexbin'
import Core from './lc3_core'

class CaseResult {
  public testcase
  public expectedResult
  public state
  public yourResult
  constructor(
    testcase: string,
    expectedResult: number,
    state: string[],
    yourResult: number,
  ) {
    this.testcase = testcase
    this.expectedResult = expectedResult
    this.state = state
    this.yourResult = yourResult
  }
}

// 进行单个样例的测试，返回总用指令数以及 log（如果有）
function caseTest(lc3: Core, limit: number, log: boolean): string[] {
  const logs: string[] = []
  lc3.pc = 0x3000
  lc3.psr = 0x8002
  for (let cnt = 0; cnt <= limit; cnt++) {
    let regs: number[]
    const op = lc3.decode(lc3.getMemory(lc3.pc))
    if (log) {
      const curInstr = lc3.instructionAddressToString(lc3.pc)
      logs.push(`执行 x${lc3.pc.toString(16)}：${curInstr}`)
      regs = Array.from(lc3.r)
    }
    if ((op.raw >= 61440 && op.raw <= 61695) || op.raw === 0)
      return log ? [String(cnt), ...logs] : [String(cnt)]

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
  return log ? [String(limit), ...logs] : [String(limit)]
}

export default function lc3bench(
  code: string,
  testCode: string,
  ansCode: string,
  testcases: string[],
  instrLimit: number,
  log: boolean,
): string[] {
  const ans = ['']

  const lc3 = new Core()
  const asResult = as(code)
  const hexbinResult = hexbin(code)
  if (!('error' in asResult)) {
    lc3.loadAssembled(asResult)
    ans.push('(作为汇编代码处理)')
  }
  else if (!('error' in hexbinResult)) {
    if (hexbinResult.orig !== 0x3000) {
      const hexbinResult = hexbin(`0011000000000000\n${code}`)
      lc3.loadAssembled(hexbinResult)
    }
    else {
      lc3.loadAssembled(hexbinResult)
    }
    ans.push('(作为机器码处理)')
  }
  else {
    return ['代码无法被识别为正确的机器码或者汇编代码...', `机器码：${hexbinResult.error}`, `汇编：${asResult.error}`]
  }

  let expectedResult: (arg0: string) => number
  let yourResult: () => number
  try {
    // eslint-disable-next-line no-eval
    eval(`expectedResult = ${testCode}`)
  }
  catch {
    return ['评测函数编写出现语法错误...']
  }

  try {
    // eslint-disable-next-line no-eval
    eval(`yourResult = ${ansCode}`)
  }
  catch {
    return ['获取答案函数编写出现语法错误...']
  }

  if (log)
    testcases = [testcases[0]]

  const caseResults = testcases.map(
    testcase =>
      new CaseResult(
        testcase,
        expectedResult(testcase),
        caseTest(lc3, instrLimit, log),
        yourResult(),
      ),
  )

  // 分析运行结果
  let totalInstructions = 0
  let passCases = 0
  caseResults.forEach((res) => {
    const instructions = Number(res.state[0])
    totalInstructions += instructions
    if (instructions >= instrLimit) {
      ans.push(
        `异常样例: ${res.testcase} 超出最大执行指令数，可以尝试调整设置，或者可能发生了死循环`,
      )
    }
    else if (res.expectedResult === res.yourResult) {
      passCases++
      ans.push(
        `通过样例: ${res.testcase}. 指令数: ${instructions}, 预期结果: ${res.expectedResult}, 你的输出: ${res.yourResult}`,
      )
    }
    else {
      ans.push(
        `失败样例: ${res.testcase}. 指令数: ${instructions}, 预期结果: ${res.expectedResult}, 你的输出: ${res.yourResult}`,
      )
    }
    if (log)
      ans.push(...res.state.slice(1))
  })

  const totalCases = caseResults.length
  ans.push(`平均指令数: ${totalInstructions / totalCases}`)
  ans[0] = `通过: ${passCases} / ${totalCases}`

  return ans
}
