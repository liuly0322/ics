const labs = {
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
