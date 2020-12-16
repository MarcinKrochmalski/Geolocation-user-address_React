import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import M from 'materialize-css'
import { FieldsConfig } from '../Config/Fields.config'
import { MyFormModel } from '../Models/MyForm.model'
import { MyField } from './MyField'
import { AddressModel } from '../Models/Address.model'

export const MyForm: React.FC<MyFormModel> = (props: MyFormModel) => {

    const fields = FieldsConfig()

    const getInitialValues = (): { [key: string]: string } => {
        const values: { [key: string]: string } = {}
        fields.forEach(field => values[field.name] = field.value)
        return values
    }

    const getValidationObject = (): { [key: string]: Yup.StringSchema<string> } => {
        const validationObject: { [key: string]: Yup.StringSchema<string> } = {}
        fields.forEach(field => validationObject[field.name] = field.validate)
        return validationObject
    }

    const handleSubmit = (values: {}): void => {
        //save data
        console.log(values)
    }

    const formik = useFormik({
        initialValues: getInitialValues(),
        validationSchema: Yup.object(getValidationObject()),
        onSubmit: (values) => {
            if (props.addressIsCorrect) {
                formik.resetForm({})
                handleSubmit(values)
            } else {
                props.handleInfo('Adres jest nieprawidłowy')
            }
        }
    })

    const getAddressInfo = (values: any) => {
        const address: AddressModel[] = []
        const addressFields = ['woj', 'pow', 'gmi', 'msc', 'kod', 'ulc', 'nr']
        Object.keys(values).forEach(fieldname => {
            const index = addressFields.indexOf(fieldname)
            if (index > -1 && values[fieldname] && values[fieldname] !== '')
                address.push({
                    level: fieldname,
                    v: values[fieldname]
                })
        })
        if (address.length > 0) props.getAddressInfo(address)
    }

    const handleAddress = (e: React.ChangeEvent<HTMLSelectElement>, fieldname: string): void => {
        formik.values[fieldname] = e.target.value
        formik.validateForm(formik.values).then(errors => {
            if (!(fieldname in errors))
                getAddressInfo(formik.values)
        })
    }

    (() => {
        const apiAddress = props.getApiAddress()
        Object.keys(apiAddress).forEach(fieldname => {
            const index = fields.findIndex(field => field.name === fieldname)
            if (index > -1 && apiAddress[fieldname]) {
                if (apiAddress[fieldname] === 'error') {
                    formik.errors[fieldname] = 'error adress'
                } else {
                    formik.values[fieldname] = apiAddress[fieldname]
                    delete formik.errors[fieldname]
                }
                formik.touched[fieldname] = true;
            }
        })

    })()

    const btnDisabled = (formik.isValid && props.addressIsCorrect) ? false : true;

    useEffect(() => {
        M.AutoInit()
    }, [])

    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            {fields.map(({ name, type, text, helper, options }) =>
                <MyField
                    key={name}
                    formik={formik}
                    name={name}
                    type={type}
                    text={text}
                    helper={helper}
                    options={options}
                    handleAddress={handleAddress}
                />
            )}
            <div className="row">
                <button type="submit" className="btn" disabled={btnDisabled} >Zapisz</button>
            </div>
        </form>
    )
}