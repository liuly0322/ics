export default class {
  pc: number
  psr: number
  totalInstruction: number
  r: number[]
  constructor()
  formatAddress(address: any): any
  getConditionCode(): 0 | 1 | -1
  setConditionCode(value: any): void
  nextInstruction(): {
    raw: any
    strictValid: boolean
  }
  fetch(): void
  decode(instruction: any): {
    raw: any
    strictValid: boolean
  }
  evaluateAddress(pc: any, op: any): any
  fetchOperands(address: any): any
  execute(op: any, address: any, operand: any): any
  storeResult(op: any, result: any): void
  instructionToString(inAddress: any, instruction: any): any
  instructionAddressToString(address: any): any
  setLabel(address: any, label: any): void
  unsetLabelGivenAddress(address: any): boolean
  unsetLabelGivenName(label: any): boolean
  unsetLabel_internal_(address: any, label: any): void
  getMemory(address: any): any
  setMemory(address: any, data: any): void
  readMemory(address: any): any
  writeMemory(address: any, data: any): void
  getRegister(register: any): any
  setRegister(register: any, value: any): boolean
  resetNumericRegisters(): void
  resetAllRegisters(): void
  formatConditionCode(): 'Invalid' | 'P' | 'N' | 'Z'
  sendKey(character: any): void
  clearBufferedKeys(): void
  isRunning(): boolean
  halt(): void
  unhalt(): void
  loadAssembled(assemblyResult: any): boolean
  interrupt(priorityLevel: any, newPC: any): void
}
