declare const _default: (fileContents: string) =>
  | {
      error: string
    }
  | {
      orig: number
      machineCode: number[]
    }
export default _default
