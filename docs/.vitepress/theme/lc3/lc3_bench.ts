import as from './lc3_as'
import hexbin from './lc3_hexbin'
import type { AssemblyResult, Event } from './lc3_core'
import Core from './lc3_core'

interface CaseResult {
  /** Cycles used to run the testcase */
  cycles: number
  /** Logs of the testcase */
  logs: string[]
  /** If this testcase is passed */
  passed: boolean
}

export type ExpectedAnsFunc = (lc3: Core, testcase: string) => number
export type ActualAnsFunc = (lc3: Core) => number

function caseTest(
  lc3: Core,
  limit: number,
  debug: boolean,
  testcase: string,
  expectedAnsFunc: ExpectedAnsFunc,
  actualAnsFunc: ActualAnsFunc,
):
  CaseResult {
  const expectedAns = expectedAnsFunc(lc3, testcase)
  const logs: string[] = []

  // debug listener
  if (debug) {
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
    lc3.addListener(eventCallback)
  }

  const performInstructionCycle = debug
    ? () => {
        const curInstr = lc3.instructionAddressToString(lc3.pc)
        logs.push(`x${lc3.pc.toString(16)}：${curInstr}`)
        lc3.nextInstruction()
      }
    : () => {
        lc3.nextInstruction()
      }

  // main loop
  let cycles = 0
  for (; cycles <= limit; cycles++) {
    const op = lc3.memory[lc3.pc]
    // if op is halt or nop, break
    if ((op >= 0xF000 && op <= 0xF0FF) || op === 0)
      break
    performInstructionCycle()
  }

  const actualAns = actualAnsFunc(lc3)

  // finish this testcase, save logs
  if (cycles > limit)
    logs.push(`异常 ${testcase}, 超出最大指令数，请调整设置，或者可能发生了死循环`)
  else if (expectedAns === actualAns)
    logs.push(`通过 ${testcase}, 指令数: ${cycles}, 输出: ${actualAns}`)
  else
    logs.push(`失败 ${testcase}, 指令数: ${cycles}, 输出: ${actualAns}, 预期: ${expectedAns}`)

  return { cycles, logs, passed: expectedAns === actualAns }
}

export interface BenchResult {
  /** Which kind of code the input is treated as, null if not recognized */
  state: 'assembly' | 'machine' | null
  /** Logs of the full test */
  logs: string[]
}

function assembleCode(code: string): ['assembly' | 'machine', AssemblyResult] | [null, string[]] {
  const asResult = as(code)
  let hexbinResult = hexbin(code)
  if (!('error' in asResult)) {
    return ['assembly', asResult]
  }
  else if (!('error' in hexbinResult)) {
    if (hexbinResult.orig !== 0x3000)
      hexbinResult = hexbin(`0011000000000000\n${code}`) as AssemblyResult
    return ['machine', hexbinResult]
  }
  else {
    return [null, [`机器码：${hexbinResult.error}`, `汇编：${asResult.error}`]]
  }
}

export default function lc3bench(
  code: string,
  expectedAnsFunc: ExpectedAnsFunc,
  actualAnsFunc: ActualAnsFunc,
  testcases: string[],
  instrLimit: number,
  debug: boolean,
): BenchResult {
  const result: BenchResult = { state: null, logs: [] }

  // try assemble the code
  const [assemblyState, assembyResult] = assembleCode(code)
  if (!assemblyState) {
    result.logs = assembyResult
    return result
  }
  result.state = assemblyState

  // if in debug mode, only test the first testcase
  if (debug)
    testcases = [testcases[0]]

  // test each testcase
  const caseResults = testcases.map((testcase) => {
    const lc3 = new Core()
    lc3.loadAssembled(assembyResult)
    return caseTest(lc3, instrLimit, debug, testcase, expectedAnsFunc, actualAnsFunc)
  })

  // collect logs
  const totalCases = caseResults.length
  const passCases = caseResults.filter(testcase => testcase.passed).length
  const totalInstructions = caseResults.reduce((acc, testcase) => acc + testcase.cycles, 0)
  result.logs.push(`${passCases} / ${totalCases} 个通过测试用例`)
  result.logs.push(`平均指令数: ${totalInstructions / totalCases}`)
  result.logs.push(...caseResults.map(testcase => testcase.logs).flat())

  return result
}
