import React from "react"
import { FieldAttributes } from "formik"
import { MyFieldModel } from "../Models/MyField.model"

export const MyField: React.FC<MyFieldModel> = (props: MyFieldModel) => {

	let fieldClassName = props.type
	if (props.formik.errors[props.name] && props.formik.touched[props.name]) fieldClassName += ' error'
	let field: FieldAttributes<any>

	const activeClassName = (props.formik.values[props.name]) ? 'active' : ''

	switch (props.type) {
		case 'select':
			if (props.options) {
				const keys = Object.keys(props.options)
				field = (
					<select
						name={props.name}
						value={props.formik.values[props.name]}
						id={props.name}
						onChange={e => {
							props.formik.handleChange(e)
							props.handleAddress(e, props.name)
						}}
					>
						{keys.map(option => {
							return <option value={option} key={option}>{(props.options && props.options[option]) ? props.options[option] : null}</option>
						})}
					</select>
				)
			}
			break
		default:
			field = <input
				name={props.name}
				value={props.formik.values[props.name]}
				type={props.type}
				id={props.name}
				onChange={props.formik.handleChange}
				onBlur={(e) => {
					props.formik.handleBlur(e)
					props.handleAddress(e, props.name)
				}}
			/>
	}
	return (
		<div className="row" >
			<div className={fieldClassName + ' input-field'} >
				<label className={activeClassName} htmlFor={props.name}  >{props.text}</label>
				{field}
				<span className="helper-text">{props.helper}</span>
			</div>
		</div>
	)
}