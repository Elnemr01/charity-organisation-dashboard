import React from 'react'
import FieldError from './FieldError'
import { hasErr, inputClass } from '@/utlis/inputClass'

function TextAreaField({ formik, name, label, placeholder }) {
    return (
        <div>
            <label htmlFor={name} className="block mb-2">{label}</label>
            <textarea
            id={name}
            placeholder={placeholder}
            {...formik.getFieldProps(name)}
            className={`${inputClass(hasErr(formik, name))} h-24`}
            />
            <FieldError formik={formik} name={name} />
        </div>
    )
}

export default TextAreaField