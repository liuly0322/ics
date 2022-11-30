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
  lab3: {
    testCode: `
const [n, s, ans] = testcase.split(':')
lc3.memory[0x3100] = Number(n)
for (let i = 1; i <= Number(n); i++) {
  lc3.memory[0x3100 + i] = s[i - 1].charCodeAt();
}
return Number(ans)
`,
    ansCode: 'return lc3.memory[0x3050]',
    testCases: '6:aabbbc:3,5:ZZZZz:4,6:aabaaa:3',
  },
  lab4: {
    testCode: `
const arr = testcase.split(':').map(Number)
const baseAddr = 0x4000
for (let i = 0; i < 16; i++) {
  lc3.memory[baseAddr + i] = arr[i]
}
arr.sort((a, b) => a - b)
const cntA = arr.slice(-4).filter(score => score >= 85).length
const cntB = arr.slice(-8).filter(score => score < 85 && score >= 75).length
arr.push(cntA)
arr.push(cntB)
return arr.join(',')
  `,
    ansCode: `
const arr = new Array()
const baseAddr = 0x5000
for (let i = 0; i < 16; i++) {
  arr.push(lc3.memory[baseAddr + i])
}
arr.push(lc3.memory[baseAddr + 0x100])
arr.push(lc3.memory[baseAddr + 0x101])
return arr.join(',')
  `,
    testCases: '100:95:90:85:80:60:55:50:45:40:35:30:25:20:10:0,95:100:0:50:45:40:80:65:70:75:35:20:25:15:10:90,88:77:66:55:99:33:44:22:11:10:9:98:97:53:57:21',
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
