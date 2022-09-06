function Queue() {
  var a = [],
    b = 0
  this.getLength = function () {
    return a.length - b
  }
  this.isEmpty = function () {
    return 0 == a.length
  }
  this.enqueue = function (b) {
    a.push(b)
  }
  this.dequeue = function () {
    if (0 != a.length) {
      var c = a[b]
      2 * ++b >= a.length && ((a = a.slice(b)), (b = 0))
      return c
    }
  }
  this.peek = function () {
    return 0 < a.length ? a[b] : void 0
  }
}

const lc3osSymbols = {
  TRAP_GETC: 0x0400,
  TRAP_OUT: 0x0430,
  TRAP_PUTS: 0x0450,
  TRAP_IN: 0x04a0,
  TRAP_PUTSP: 0x04e0,
  TRAP_HALT: 0xfd70,
}
const lc3os = {
  // Trap vector table (valid entries)
  0x0020: 0x0400,
  0x0021: 0x0430,
  0x0022: 0x0450,
  0x0023: 0x04a0,
  0x0024: 0x04e0,
  0x0025: 0xfd70,
  // Implementation of GETC
  0x0400: 0x3e07,
  0x0401: 0xa004,
  0x0402: 0x07fe,
  0x0403: 0xa003,
  0x0404: 0x2e03,
  0x0405: 0xc1c0,
  0x0406: 0xfe00,
  0x0407: 0xfe02,
  // Implementation of OUT
  0x0430: 0x3e0a,
  0x0431: 0x3208,
  0x0432: 0xa205,
  0x0433: 0x07fe,
  0x0434: 0xb004,
  0x0435: 0x2204,
  0x0436: 0x2e04,
  0x0437: 0xc1c0,
  0x0438: 0xfe04,
  0x0439: 0xfe06,
  // Implementation of PUTS
  0x0450: 0x3e16,
  0x0451: 0x3012,
  0x0452: 0x3212,
  0x0453: 0x3412,
  0x0454: 0x6200,
  0x0455: 0x0405,
  0x0456: 0xa409,
  0x0457: 0x07fe,
  0x0458: 0xb208,
  0x0459: 0x1021,
  0x045a: 0x0ff9,
  0x045b: 0x2008,
  0x045c: 0x2208,
  0x045d: 0x2408,
  0x045e: 0x2e08,
  0x045f: 0xc1c0,
  0x0460: 0xfe04,
  0x0461: 0xfe06,
  0x0462: 0xf3fd,
  0x0463: 0xf3fe,
  // Implementation of IN
  0x04a0: 0x3e06, // ST R7, SaveR7
  0x04a1: 0xe006, // LEA R0, Message
  0x04a2: 0xf022, // PUTS
  0x04a3: 0xf020, // GETC
  0x04a4: 0xf021, // OUT
  0x04a5: 0x2e01, // LD R7, SaveR7
  0x04a6: 0xc1c0, // RET
  0x04a7: 0x3001, // SaveR7 (.BLKW #1)
  /* the "Input a character> " message goes here */
  // Implementation of PUTSP
  0x04e0: 0x3e27,
  0x04e1: 0x3022,
  0x04e2: 0x3222,
  0x04e3: 0x3422,
  0x04e4: 0x3622,
  0x04e5: 0x1220,
  0x04e6: 0x6040,
  0x04e7: 0x0406,
  0x04e8: 0x480d,
  0x04e9: 0x2418,
  0x04ea: 0x5002,
  0x04eb: 0x0402,
  0x04ec: 0x1261,
  0x04ed: 0x0ff8,
  0x04ee: 0x2014,
  0x04ef: 0x4806,
  0x04f0: 0x2013,
  0x04f1: 0x2213,
  0x04f2: 0x2413,
  0x04f3: 0x2613,
  0x04f4: 0x2e13,
  0x04f5: 0xc1c0,
  0x04f6: 0x3e06,
  0x04f7: 0xa607,
  0x04f8: 0x0801,
  0x04f9: 0x0ffc,
  0x04fa: 0xb003,
  0x04fb: 0x2e01,
  0x04fc: 0xc1c0,
  0x04fe: 0xfe06,
  0x04ff: 0xfe04,
  0x0500: 0xf3fd,
  0x0501: 0xf3fe,
  0x0502: 0xff00,
  // Implementation of HALT
  0xfd00: 0x3e3e,
  0xfd01: 0x303c,
  0xfd02: 0x2007,
  0xfd03: 0xf021,
  0xfd04: 0xe006,
  0xfd05: 0xf022,
  0xfd06: 0xf025,
  0xfd07: 0x2036,
  0xfd08: 0x2e36,
  0xfd09: 0xc1c0,
  0xfd70: 0x3e0e,
  0xfd71: 0x320c,
  0xfd72: 0x300a,
  0xfd73: 0xe00c,
  0xfd74: 0xf022,
  0xfd75: 0xa22f,
  0xfd76: 0x202f,
  0xfd77: 0x5040,
  0xfd78: 0xb02c,
  0xfd79: 0x2003,
  0xfd7a: 0x2203,
  0xfd7b: 0x2e03,
  0xfd7c: 0xc1c0,
  /* the "halting the processor" message goes here */
  0xfda5: 0xfffe,
  0xfda6: 0x7fff,
  // Display status register
  0xfe04: 0x8000,
  // Machine control register
  0xfffe: 0xffff,
}
const LC3Util = {
  /*
   * Parses a decimal or hexadecimal value, or returns NaN.
   */
  parseNumber: function (value) {
    value = value.toLowerCase()
    if (value.length == 0) {
      return NaN
    }
    var negative = false
    if (value[0] === '-') {
      value = value.slice(1)
      negative = true
    }
    switch (value[0]) {
      // Hex: input is like "x123"
      case 'x':
        var hexDigits = value.slice(1)
        if (hexDigits.match(/[^0-9a-f]/)) {
          return NaN
        }
        var num = parseInt(hexDigits, 16)
        return negative ? -num : num
      // Binary: input is like "b1101"
      case 'b':
        var binaryDigits = value.slice(1)
        if (binaryDigits.match(/[^01]/)) {
          return NaN
        }
        var num = parseInt(binaryDigits, 2)
        return negative ? -num : num
      // Decimal: input is like "1234"
      default:
        if (value.match(/[^0-9]/)) {
          return NaN
        }
        var num = parseInt(value)
        return negative ? -num : num
    }
  },

  /*
   * Converts a number to a four-digit hexadecimal string with 'x' prefix.
   */
  toHexString: function (value, padLength) {
    var hex = value.toString(16).toUpperCase()
    padLength = padLength || 4
    if (hex.length < padLength) {
      hex = Array(padLength - hex.length + 1).join('0') + hex
    }
    return 'x' + hex
  },

  /*
   * Converts a number possibly outside the [-32768, 32767] range
   * to a 16-bit signed integer.
   */
  toInt16: function (n) {
    n = n % 0x10000 & 0xffff
    if (n & 0x8000) {
      return n - 0x10000
    }
    return n
  },

  toUint16: function (n) {
    var int16 = this.toInt16(n)
    return int16 < 0 ? int16 + 0x10000 : int16
  },

  /*
   * Sign-extends a size-bit number n to 16 bits.
   */
  signExtend16: function (n, size) {
    var sign = (n >> (size - 1)) & 1
    if (sign === 1) {
      for (var i = size; i < 16; i++) {
        n |= 1 << i
      }
    } else {
      n &= (1 << size) - 1
    }
    return this.toInt16(n)
  },
}

export default class {
  constructor() {
    // Create and initialize memory; load from OS if possible
    this.memory = new Array(0x10000).fill(0)
    for (const osEntry in lc3os) {
      this.memory[osEntry] = lc3os[osEntry]
    }

    // Listeners for when registers, memory, etc. are changed
    this.listeners = []
    this.addListener = function (callback) {
      this.listeners.push(callback)
    }
    this.notifyListeners = function (e) {
      for (var i = 0; i < this.listeners.length; i++) {
        this.listeners[i](e)
      }
    }

    // Create and initialize registers
    this.r = new Array(8).fill(0)
    this.specialRegisters = ['pc', 'ir', 'psr']
    this.resetSpecialRegisters()

    // Dictionaries for linking addresses and labels
    this.labelToAddress = {}
    this.addressToLabel = {}

    // Load OS symbols
    for (var label in lc3osSymbols) {
      var address = lc3osSymbols[label]
      this.setLabel(address, label)
    }

    // Exclusive upper bound for normal memory
    // Memory address 0xFE00 and up are mapped to devices
    this.maxStandardMemory = 0xfe00

    // Addresses of mapped memory locations
    this.kbsr = 0xfe00
    this.kbdr = 0xfe02
    this.dsr = 0xfe04
    this.ddr = 0xfe06
    this.mcr = 0xfffe
    this.ioLocations = [this.kbsr, this.kbdr, this.dsr, this.ddr]

    // Device interrupt vectors
    this.kbiv = 0x0180
    this.div = 0x0181 // TODO is this right? not specified

    // Device priority levels
    this.kbpl = 2
    this.dpl = 1

    this.namedTrapVectors = {
      0x20: 'GETC',
      0x21: 'OUT',
      0x22: 'PUTS',
      0x23: 'IN',
      0x24: 'PUTSP',
      0x25: 'HALT',
    }

    // A queue of keys that the user has entered, but have not been processed.
    this.bufferedKeys = new Queue()

    // The current subroutine depth. Used for next/continue.
    this.subroutineLevel = 0
  }
  formatAddress(address) {
    var label = this.addressToLabel[address]
    return label !== undefined ? label : LC3Util.toHexString(address)
  }
  getConditionCode() {
    var n = (this.psr & 4) !== 0
    var z = (this.psr & 2) !== 0
    var p = (this.psr & 1) !== 0
    if (n ^ z ^ p && !(n && z && p)) {
      return n ? -1 : z ? 0 : 1
    } else {
      return undefined
    }
  }
  setConditionCode(value) {
    value = LC3Util.toInt16(value)
    var n = value < 0
    var p = value > 0
    var z = !n && !p

    var mask = (n ? 0x4 : 0) | (z ? 0x2 : 0) | (p ? 0x1 : 0)
    this.setRegister('psr', (this.psr & 0xfff8) | mask)
  }
  // Stages of the instruction cycle
  nextInstruction() {
    // Perform the instruction cycle.
    this.fetch()
    var op = this.decode(this.ir)
    var address = this.evaluateAddress(this.pc, op)
    var operand = this.fetchOperands(address)
    var result = this.execute(op, address, operand)
    this.storeResult(op, result)

    return op
  }
  fetch() {
    this.ir = this.getMemory(this.pc)
    this.setRegister('pc', this.pc + 1)
  }
  decode(instruction) {
    // We'll augment this object depending on the opcode.
    var op = {
      raw: instruction,
      strictValid: true,
    }

    var bits = Array(16)
    for (var i = 0; i < bits.length; i++) {
      bits[i] = (instruction >> i) & 0x1
    }

    op.opcode = (instruction >> 12) & 0xf

    var bits05 = instruction & 0x3f
    var bits68 = (instruction >> 6) & 0x7
    var bits08 = instruction & 0x1ff
    var bits911 = (instruction >> 9) & 0x7
    var bits010 = instruction & 0x7ff

    var valid = true
    switch (op.opcode) {
      case 1: // ADD
      case 5: // AND
        op.opname = op.opcode === 1 ? 'ADD' : 'AND'
        op.dr = bits911
        op.sr1 = bits68
        op.mode = 'none'
        if (bits[5] === 0) {
          op.arithmeticMode = 'reg'
          op.sr2 = instruction & 0x7
          if (bits[4] !== 0 || bits[3] !== 0) {
            op.strictValid = false
          }
        } else {
          op.arithmeticMode = 'imm'
          op.imm = LC3Util.signExtend16(instruction & 0x1f, 5)
        }
        break
      case 0: // BR
        op.opname = 'BR'
        op.n = bits[11] == 1
        op.z = bits[10] == 1
        op.p = bits[9] == 1
        op.mode = 'pcOffset'
        op.offset = LC3Util.signExtend16(bits08, 9)
        break
      case 12: // JMP, RET
        op.opname = bits68 === 7 ? 'RET' : 'JMP'
        op.mode = 'baseOffset'
        op.baseR = bits68
        op.offset = 0
        if (bits911 !== 0 || bits05 !== 0) {
          op.strictValid = false
        }
        break
      case 4: // JSR, JSRR
        if (bits[11] === 0) {
          op.opname = 'JSRR'
          op.mode = 'baseOffset'
          op.baseR = bits68
          op.offset = 0
          if (bits911 !== 0 || bits05 !== 0) {
            op.strictValid = false
          }
        } else {
          op.opname = 'JSR'
          op.mode = 'pcOffset'
          op.offset = LC3Util.signExtend16(bits010, 11)
        }
        break
      case 2: // LD
      case 10: // LDI
        op.opname = op.opcode === 2 ? 'LD' : 'LDI'
        op.dr = bits911
        op.mode = 'pcOffset'
        op.offset = LC3Util.signExtend16(bits08, 9)
        break
      case 6: // LDR
        op.opname = 'LDR'
        op.dr = bits911
        op.mode = 'baseOffset'
        op.baseR = bits68
        op.offset = LC3Util.signExtend16(bits05, 6)
        break
      case 14: // LEA
        op.opname = 'LEA'
        op.dr = bits911
        op.mode = 'pcOffset'
        op.offset = LC3Util.signExtend16(bits08, 9)
        break
      case 9: // NOT
        op.opname = 'NOT'
        op.mode = 'none'
        op.dr = bits911
        op.sr = bits68
        if (bits05 !== 0x3f) {
          op.strictValid = false
        }
        break
      case 8: // RTI
        op.opname = 'RTI'
        op.mode = 'none'
        if (instruction & (0xfff !== 0)) {
          op.strictValid = false
        }
        break
      case 3: // ST
      case 11: // STI
        op.opname = op.opcode === 3 ? 'ST' : 'STI'
        op.sr = bits911
        op.mode = 'pcOffset'
        op.offset = LC3Util.signExtend16(bits08, 9)
        break
      case 7: // STR
        op.opname = 'STR'
        op.sr = bits911
        op.mode = 'baseOffset'
        op.baseR = bits68
        op.offset = LC3Util.signExtend16(bits05, 6)
        break
      case 15: // TRAP
        op.opname = 'TRAP'
        op.mode = 'trap'
        op.trapVector = instruction & 0xff
        if (0 !== (instruction & 0x0f00)) {
          op.strictValid = false
        }
        break
      default:
        op.opname = 'reserved'
        op.strictValid = false
        break
    }
    return op
  }
  evaluateAddress(pc, op) {
    if (op.mode === 'none') {
      return null
    } else if (op.mode === 'pcOffset') {
      return LC3Util.toUint16(pc + op.offset)
    } else if (op.mode === 'baseOffset') {
      return LC3Util.toUint16(this.getRegister(op.baseR) + op.offset)
    } else if (op.mode === 'trap') {
      return op.trapVector
    } else {
      return undefined
    }
  }
  fetchOperands(address) {
    if (address === null || address === undefined) {
      return address
    }
    return this.readMemory(address)
  }
  execute(op, address, operand) {
    op.isIO = false
    switch (op.opcode) {
      case 1: // ADD
      case 5: // AND
        var x1 = this.getRegister(op.sr1)
        var x2 = op.arithmeticMode === 'reg' ? this.getRegister(op.sr2) : op.imm
        return op.opcode === 1 ? x1 + x2 : x1 & x2
      case 0: // BR
        var cc = this.getConditionCode()
        var doBreak = (op.n && cc < 0) || (op.z && cc === 0) || (op.p && cc > 0)
        if (doBreak) {
          this.setRegister('pc', address)
        }
        return null
      case 12: // JMP, RET
        this.setRegister('pc', address)
        // internal: decrement depth on return
        if (op.opname === 'RET') {
          this.subroutineLevel--
        }
        return null
      case 4: // JSR, JSRR
        this.setRegister(7, this.pc)
        this.setRegister('pc', address)
        // internal: also increment the depth
        this.subroutineLevel++
        return null
      case 2: // LD
        if (this.ioLocations.indexOf(address) !== -1) {
          op.isIO = true
        }
        return operand
      case 10: // LDI
        if (this.ioLocations.indexOf(operand) !== -1) {
          op.isIO = true
        }
        return this.readMemory(operand)
      case 6: // LDR
        if (this.ioLocations.indexOf(address) !== -1) {
          op.isIO = true
        }
        return operand
      case 14: // LEA
        return address
      case 9: // NOT
        return LC3Util.toUint16(~this.getRegister(op.sr))
      case 8: // RTI
        if ((this.psr & 0x8000) !== 0) {
          // Privilege mode exception
          var ev = {
            type: 'exception',
            exception: 'privilege',
          }
          this.notifyListeners(ev)
          this.halt()
        } else {
          var r6 = this.r[6]
          this.setRegister('pc', this.readMemory(r6))
          this.setRegister('psr', this.readMemory(r6 + 1))
          this.setRegister(6, r6 + 2)
        }
        return null
      case 3: // ST
        if (this.ioLocations.indexOf(address) !== -1) {
          op.isIO = true
        }
        this.writeMemory(address, this.getRegister(op.sr))
        return null
      case 11: // STI
        if (this.ioLocations.indexOf(operand) !== -1) {
          op.isIO = true
        }
        this.writeMemory(operand, this.getRegister(op.sr))
        return null
      case 7: // STR
        if (this.ioLocations.indexOf(address) !== -1) {
          op.isIO = true
        }
        this.writeMemory(address, this.getRegister(op.sr))
        return null
      case 15: // TRAP
        this.setRegister(7, this.pc)
        this.setRegister('pc', operand)
        // internal: also increment the depth
        this.subroutineLevel++
        return null
      case 13:
        // Illegal opcode exception
        var ev = {
          type: 'exception',
          exception: 'opcode',
        }
        this.notifyListeners(ev)
        this.halt()
        return null
      default:
        return undefined
    }
  }
  storeResult(op, result) {
    switch (op.opcode) {
      case 1: // ADD
      case 5: // AND
      case 9: // NOT
        this.setRegister(op.dr, result)
        this.setConditionCode(result)
        break
      case 0: // BR
      case 12: // JMP, RET
      case 4: // JSR, JSRR
        // Nothing to do here.
        return
      case 2: // LD
      case 10: // LDI
      case 6: // LDR
      case 14: // LEA
        this.setRegister(op.dr, result)
        this.setConditionCode(result)
        break
      case 8: // RTI
        // Nothing to do here.
        return
      case 3: // ST
      case 11: // STI
      case 7: // STR
        // Still nothing to do here.
        return
      case 15: // TRAP
        // Nothing to do here, either!
        break
      default:
        break
    }
  }
  instructionToString(inAddress, instruction) {
    var op = this.decode(instruction)
    if (!op.strictValid) {
      return '.FILL ' + LC3Util.toHexString(op.raw)
    }
    var reg = function (i) {
      return 'R' + i
    }
    if (!op.strictValid) {
      return '.FILL ' + LC3Util.toHexString(op.raw)
    }
    var prefix = op.opname + ' '
    var pc = inAddress + 1
    var address = this.evaluateAddress(pc, op)
    switch (op.opcode) {
      case 1: // ADD
      case 5: // AND
        var x1 = reg(op.sr1)
        var x2 = op.arithmeticMode == 'reg' ? reg(op.sr2) : '#' + op.imm
        var dest = reg(op.dr)
        return prefix + [dest, x1, x2].join(', ')
      case 9: // NOT
        return prefix + [reg(op.dr), reg(op.sr)].join(', ')
      case 0: // BR
        // If all the NZP bits are zero,
        // or it just jumps to the next location,
        // then it's a NOP.
        if ((op.raw & 0x0e00) === 0 || op.offset === 0) {
          return 'NOP'
        }
        var opname = 'BR'
        if (op.n) opname += 'n'
        if (op.z) opname += 'z'
        if (op.p) opname += 'p'
        return opname + ' ' + this.formatAddress(address)
      case 12: // JMP, RET
        var baseR = op.baseR
        if (baseR === 7) {
          return 'RET'
        } else {
          return 'JMP ' + reg(baseR)
        }
      case 4: // JSR, JSRR
        if (op.mode === 'pcOffset') {
          // JSR
          return prefix + this.formatAddress(address)
        } else {
          // JSRR
          return prefix + reg(op.baseR)
        }
      case 2: // LD
      case 10: // LDI
      case 14: // LEA
        return prefix + [reg(op.dr), this.formatAddress(address)].join(', ')
      case 6: // LDR
        return prefix + [reg(op.dr), reg(op.baseR), '#' + op.offset].join(', ')
      case 8: // RTI
        return op.opname
      case 3: // ST
      case 11: // STI
        return prefix + [reg(op.sr), this.formatAddress(address)].join(', ')
      case 7: // STR
        return prefix + [reg(op.sr), reg(op.baseR), '#' + op.offset].join(', ')
      case 15: // TRAP
        var namedTrap = this.namedTrapVectors[address]
        if (namedTrap !== undefined) {
          return namedTrap
        } else {
          return prefix + LC3Util.toHexString(address, 2)
        }
      default:
        return null
    }
  }
  instructionAddressToString(address) {
    return this.instructionToString(address, this.getMemory(address))
  }
  /*
   * Links a label with an address and notifies listeners.
   */
  setLabel(address, label) {
    // Unlink a previous label to the same address or of the same name.
    this.unsetLabelGivenAddress(address)
    this.unsetLabelGivenName(label)

    // Set up the new label and notify listeners.
    this.labelToAddress[label] = address
    this.addressToLabel[address] = label
    var ev = {
      type: 'labelset',
      address: address,
      label: label,
    }
    this.notifyListeners(ev)
  }
  /*
   * Deletes a label at the given address.
   * Returns true if the given label existed, else false.
   */
  unsetLabelGivenAddress(address) {
    var label = this.addressToLabel[address]
    var hasLabel = label !== undefined
    if (!hasLabel) {
      return false
    }
    this.unsetLabel_internal_(address, label)
    return true
  }
  /*
   * Deletes a label with the given name.
   * Returns true if the given label existed, else false.
   */
  unsetLabelGivenName(label) {
    var address = this.labelToAddress[label]
    var hasLabel = address !== undefined
    if (!hasLabel) {
      return false
    }
    this.unsetLabel_internal_(address, label)
    return true
  }
  /*
   * Internal command to unset a label at the given name and address.
   */
  unsetLabel_internal_(address, label) {
    delete this.addressToLabel[address]
    delete this.labelToAddress[label]
    var ev = {
      type: 'labelunset',
      address: address,
      label: label,
    }
    this.notifyListeners(ev)
  }
  // Functions to get and set memory.
  // getMemory and setMemory are the referentially transparent versions of
  // readMemory and writeMemory, respectively.
  getMemory(address) {
    return this.memory[address]
  }
  setMemory(address, data) {
    var ev = {
      type: 'memset',
      address: address,
      newValue: data,
    }
    this.memory[address] = LC3Util.toUint16(data)
    this.notifyListeners(ev)
  }
  // Functions to read from and write to memory.
  // If these interact with data/status registers, other memory may be changed!
  // If you just want to purely inspect the data, use (get|set)Memory instead.
  readMemory(address) {
    if (address === this.kbdr) {
      // Reading KBDR: must turn off KBSR.
      this.setMemory(this.kbsr, this.getMemory(this.kbsr) & 0x7fff)
    }
    return this.getMemory(address)
  }
  writeMemory(address, data) {
    if (address === this.ddr) {
      // Writing DDR: must turn of DSR.
      this.setMemory(this.dsr, this.getMemory(this.dsr) & 0x7fff)
    }
    this.setMemory(address, data)
  }
  // Functions to get and set registers (standard or special)
  getRegister(register) {
    if (!isNaN(register) && register >= 0 && register < this.r.length) {
      return this.r[register]
    }
    for (var i = 0; i < this.specialRegisters.length; i++) {
      var name = this.specialRegisters[i]
      if (name === register) {
        return this[name]
      }
    }
    return undefined
  }
  setRegister(register, value) {
    value = LC3Util.toUint16(value)
    var ev = {
      type: 'regset',
      register: undefined,
      newValue: value,
    }
    if (!isNaN(register) && register >= 0 && register < this.r.length) {
      ev.register = register
      this.r[register] = value
      this.notifyListeners(ev)
      return true
    }
    for (var i = 0; i < this.specialRegisters.length; i++) {
      var name = this.specialRegisters[i]
      if (name === register) {
        ev.register = name
        this[name] = value
        this.notifyListeners(ev)
        return true
      }
    }
    return false
  }
  resetSpecialRegisters() {
    this.pc = 0x3000
    this.ir = 0
    this.psr = 0x8002
  }
  formatConditionCode() {
    var code = this.getConditionCode()
    if (code === undefined) {
      return 'Invalid'
    } else if (code > 0) {
      return 'P'
    } else if (code < 0) {
      return 'N'
    } else {
      return 'Z'
    }
  }
  sendKey(character) {
    this.bufferedKeys.enqueue(character)
    this.notifyListeners({ type: 'bufferchange' })
  }
  clearBufferedKeys() {
    // This Queue library has no clear function.
    this.bufferedKeys = new Queue()
    this.notifyListeners({ type: 'bufferchange' })
  }
  /*
   * Determines whether the clock is running.
   */
  isRunning() {
    return (this.getMemory(this.mcr) & 0x8000) !== 0
  }
  /*
   * Manually initiates the equivalent of a HALT command.
   */
  halt() {
    this.setMemory(this.mcr, this.getMemory(this.mcr) & 0x7fff)
  }
  /*
   * Unhalts the clock after a HALT command.
   */
  unhalt() {
    this.setMemory(this.mcr, this.getMemory(this.mcr) | 0x8000)
  }
  /*
   * Load an assembly result into the LC-3.
   * Return true on success, false on failure.
   */
  loadAssembled(assemblyResult) {
    if (assemblyResult.error) {
      return false
    }

    var orig = assemblyResult.orig
    var mc = assemblyResult.machineCode
    var symbols = assemblyResult.symbolTable || {}

    // Add all the instructions.
    for (var i = 0; i < mc.length; i++) {
      this.setMemory(orig + i, mc[i])
    }

    // Add all the symbols.
    for (var labelName in symbols) {
      this.setLabel(symbols[labelName], labelName)
    }

    // Snap the PC to the origin point.
    this.setRegister('pc', orig)
  }
  interrupt(priorityLevel, newPC) {
    // Check to see if the new priority level is higher than the current.
    // If not, don't interrupt.
    if (priorityLevel <= (this.psr & 0x0700) >> 8) {
      return
    }

    // Get supervisor stack pointer
    var ssp = this.getRegister(6)

    // Stash PSR
    ssp--
    this.setMemory(ssp, this.psr)

    // Stash PC
    ssp--
    this.setMemory(ssp, this.pc)

    // Clear privilege, priority, and condition codes
    // (clear bits 15, 10:8, and 2:0),
    // then set the new priority level.
    this.psr &= 0x78f8
    this.psr |= (priorityLevel & 0x7) << 8

    // Set new PC
    this.setRegister('pc', newPC)

    // Set new supervisor stack pointer
    this.setRegister(6, ssp)
  }
}
