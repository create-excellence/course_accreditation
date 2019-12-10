import { DeltaStatic, DeltaOperation } from 'quill'

export type TextEditorContentType =
  | DeltaStatic
  | { ops: DeltaOperation[] }
  | DeltaOperation[]
  | string;

export function string2delta(value: string) {
  if (typeof value === 'string') {
    const content = value.trim()
    if (
      (content.includes('{') && content.includes('}')) ||
      (content.includes('[') && content.includes(']'))
    ) {
      try {
        const json = JSON.parse(content)
        if (typeof json === 'string') {
          return JSON.parse(json)
        } else {
          return json
        }
      } catch (error) {
        console.error('failed to parse quill text ', value)
      }
    }
    return { ops: [{ insert: value }] }
  }
  return value
}

export function deltaToString(delta: DeltaStatic | string): string {
  if (typeof delta === 'string') {
    return delta
  }
  return JSON.stringify(delta)
}
