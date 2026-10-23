import React, { useMemo } from 'react'
import FieldError from './FieldError'
import { getIn } from 'formik';
import { hasErr, inputClass } from '@/utlis/inputClass';

const SelectField = ({ formik, name, label, placeholder, options }) => {

    
    return (
        <div>
            <label htmlFor={name} className="block mb-2">{label}</label>
            <select
            id={name}
            {...formik.getFieldProps(name)}
            className={inputClass(hasErr(formik, name))}
            >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
            </select>
            <FieldError formik={formik} name={name} />
        </div>
    )
}

export default SelectField