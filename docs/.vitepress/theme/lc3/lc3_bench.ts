import as from './lc3_as'
import hexbin from './lc3_hexbin'
import core from './lc3_core'

const logs: string[] = []

class caseResult {
  public testcase
  public expectedResult
  public state
  public instructions
  public yourResult
  constructor(
    testcase: string,
    expectedResult: number,
    state: boolean,
    instructions: number,
    yourResult: number
  ) {
    this.testcase = testcase
    this.expectedResult = expectedResult
    this.state = state
    this.instructions = instructions
    this.yourResult = yourResult
  }
}

// 进行单个样例的测试，超出最大指令数返回 false，否则返回 true
function caseTest(lc3: core, limit: number, log: boolean): boolean {
  lc3.pc = 0x3000
  lc3.psr = 0x8002
  lc3.totalInstruction = 0
  for (let cnt = 0; cnt <= limit; cnt++) {
    let regs: number[]
    const op = lc3.decode(lc3.getMemory(lc3.pc))
    if (log) {
      const curInstr = lc3.instructionAddressToString(lc3.pc)
      logs.push(`执行 x${lc3.pc.toString(16)}：${curInstr}`)
      regs = Array.from(lc3.r)
    }
    if ((op.raw >= 61440 && op.raw <= 61695) || op.raw === 0) {
      return true
    }
    lc3.nextInstruction()
    if (log) {
      lc3.r.forEach((v: number, i: number) => {
        if (v !== regs[i]) {
          const log = logs.pop()
          logs.push(log + `，R${i} 由 ${regs[i]} 变为 ${v}`)
        }
      })
    }
  }
  return false
}

export default function lc3bench(
  code: string,
  testCode: string,
  ansCode: string,
  testcases: string[],
  instrLimit: number,
  log: boolean
): string[] {
  const ans = ['']

  const lc3 = new core()
  const asResult = as(code)
  const hexbinResult = hexbin(code)
  if (!('error' in asResult)) {
    lc3.loadAssembled(asResult)
    ans.push('(作为汇编代码处理)')
  } else if (!('error' in hexbinResult)) {
    if (hexbinResult.orig != 0x3000) {
      const hexbinResult = hexbin('0011000000000000\n' + code)
      lc3.loadAssembled(hexbinResult)
    } else {
      lc3.loadAssembled(hexbinResult)
    }
    ans.push('(作为机器码处理)')
  } else {
    return ['代码无法被识别为正确的机器码或者汇编代码...']
  }

  let expectedResult: (arg0: string) => number
  let yourResult: () => number
  try {
    eval(`expectedResult = ${testCode}`)
  } catch {
    return ['评测函数编写出现语法错误...']
  }

  try {
    eval(`yourResult = ${ansCode}`)
  } catch {
    return ['获取答案函数编写出现语法错误...']
  }

  if (log) {
    testcases = [testcases[0]]
    logs.splice(0)
  }

  const caseResults = testcases.map(
    (testcase) =>
      new caseResult(
        testcase,
        expectedResult(testcase),
        caseTest(lc3, instrLimit, log),
        lc3.totalInstruction,
        yourResult()
      )
  )

  // 分析运行结果
  let totalInstructions = 0
  let passCases = 0
  caseResults.forEach((res) => {
    totalInstructions += res.instructions
    if (res.state == false) {
      ans.push(
        `异常样例: ${res.testcase} 超出最大执行指令数，可以尝试调整设置，或者可能发生了死循环`
      )
    } else if (res.expectedResult == res.yourResult) {
      passCases++
      ans.push(
        `通过样例: ${res.testcase}. 指令数: ${res.instructions}, 预期结果: ${res.expectedResult}, 你的输出: ${res.yourResult}`
      )
    } else {
      ans.push(
        `失败样例: ${res.testcase}. 指令数: ${res.instructions}, 预期结果: ${res.expectedResult}, 你的输出: ${res.yourResult}`
      )
    }
  })

  const totalCases = caseResults.length
  ans.push(`平均指令数: ${totalInstructions / totalCases}`)
  ans[0] = `通过: ${passCases} / ${totalCases}`

  if (log) {
    ans.push(...logs)
  }

  return ans
}
