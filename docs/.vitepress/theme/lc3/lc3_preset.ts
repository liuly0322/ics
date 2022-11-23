interface LabPreset {
  /** Function body to tidy up lc3Core for test and return the expected result */
  testCode: string
  /** Function body to get the actual result after run a testcase */
  ansCode: string
  /** Testcases seperated by comma */
  testCases: string
}

const labs: Record<string, LabPreset> = {
  lab1: {
    testCode: `
let [number, bits] = testcase.split(':').map(Number)
lc3.memory[0x3100] = number
lc3.memory[0x3101] = bits
let mask = 1
let ans  = 0
while (bits-- > 0) {
  if (number & mask) {
     ans++
  }
  mask = mask + mask
}
return ans`,
    ansCode: 'return lc3.memory[0x3102]',
    testCases: '13:3, 167:6, 32767:15',
  },
  lab2: {
    testCode: `
let [p, q, n] = testcase.split(':').map(Number)
lc3.memory[0x3100] = p
lc3.memory[0x3101] = q
lc3.memory[0x3102] = n
const f = [1, 1]
for (let i = 2; i <= n; i++) {
    f[i] = f[i - 2] % p + f[i - 1] % q
}
return f[n]`,
    ansCode: 'return lc3.memory[0x3103]',
    testCases: '256:123:100, 512:456:200, 1024:789:300',
  },
  自定义: {
    testCode: '',
    ansCode: '',
    testCases: '',
  },
}

export const presets = Object.keys(labs)

export function getPreset(lab: string) {
  return labs[lab]
}
