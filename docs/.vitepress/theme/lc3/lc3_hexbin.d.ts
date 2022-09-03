declare const _default: (fileContents: string) =>
  | {
      error: string
      type?: string
    }
  | {
      orig: number
      machineCode: number[]
    }
export default _default
