export interface FiledsModel {
    name: string
    type: string
    text: string
    value: string
    helper: string
    validate?: any
    options?: { [key: string]: string }
}
