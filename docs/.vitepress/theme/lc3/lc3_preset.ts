interface LabPreset {
  /** Function body to tidy up lc3Core for test and return the expected result */
  testCode: string
  /** Function body to get the actual result after run a testcase */
  ansCode: string
  /** Testcases seperated by comma */
  testCases: string
  /** Lab description */
  description: string
}

const labs: Record<string, LabPreset> = {
  lab1: {
    testCode: '',
    ansCode: '',
    testCases: '',
    description: '别急，等 lab1 出...',
  },
  自定义: {
    testCode: '',
    ansCode: '',
    testCases: '',
    description: '自定义测试样例',
  },
}

export const presets = Object.keys(labs)

export function getPreset(lab: string) {
  return labs[lab]
}
