export interface MyFieldModel {
    formik: any
    name: string
    type: string
    text: string
    helper: string
    options?: { [key: string]: string | number }
    handleAddress: Function
}
