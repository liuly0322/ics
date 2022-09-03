declare const _default: (text: string) =>
  | {
      error: string
      type?: string
    }
  | {
      orig: number
      machineCode: number[]
    }
export default _default
