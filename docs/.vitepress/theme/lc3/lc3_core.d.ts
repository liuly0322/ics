interface Op {
  raw: number
  strictValid: boolean
  opcode: number
  opname: string
  mode: string
}

export type AssemblyResult = {
  orig: number
  machineCode: number[]
}

export type Event = {
  type: 'exception',
  exception: string,
} | {
  type: 'memset',
  address: number,
  newValue: number
} | {
  type: 'regset',
  register: string | number,
  newValue: number,
} | {
  type: 'labelset' | 'labelunset',
  address: address,
  label: label,
} | {
  type: 'bufferchange'
}
export default class {
  pc: number
  psr: number
  r: number[]
  memory: number[]
  listeners: ((event: Event) => void)[]
  constructor()
  addListener(callback: (event: Event) => void): void
  formatAddress(address: number): string
  getConditionCode(): 0 | 1 | -1
  setConditionCode(value: number): void
  nextInstruction(): Op
  fetch(): void
  decode(instruction: number): Op
  evaluateAddress(pc: number, op: Op): number | null | undefined
  fetchOperands(address: number): number
  execute(op: Op, address: number, operand: number): number | null | undefined
  storeResult(op: Op, result: number): void
  instructionToString(inAddress: number, instruction: number): string
  instructionAddressToString(address: number): string
  setLabel(address: number, label: string): void
  unsetLabelGivenAddress(address: number): boolean
  unsetLabelGivenName(label: string): boolean
  unsetLabel_internal_(address: number, label: string): void
  getMemory(address: number): number
  setMemory(address: number, data: number): void
  readMemory(address: number): number
  writeMemory(address: number, data: number): void
  getRegister(register: number | string): number
  setRegister(register: number | string, value: number): boolean
  resetSpecialRegisters(): void
  formatConditionCode(): 'Invalid' | 'P' | 'N' | 'Z'
  isRunning(): boolean
  halt(): void
  unhalt(): void
  loadAssembled(assemblyResult: AssemblyResult): boolean
  interrupt(priorityLevel: number, newPC: number): void
}
