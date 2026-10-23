import React, { useMemo } from 'react'
import FieldError from './FieldError'
import { getIn } from 'formik';
import { hasErr, inputClass } from '@/utlis/inputClass';

const TextField = ({ formik, name, label, type = 'text', ...rest }) => {

    return (
        <div>
            <label htmlFor={name} className="block mb-2">{label}</label>
            <input
            id={name}
            type={type}
            {...formik.getFieldProps(name)}
            className={inputClass(hasErr(formik, name))}
            {...rest}
            />
            <FieldError formik={formik} name={name} />
        </div>
    )
}

export default TextField