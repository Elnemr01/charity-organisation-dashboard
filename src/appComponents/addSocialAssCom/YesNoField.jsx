import { getIn } from 'formik';
import React from 'react'
import FieldError from './FieldError';

const YesNoField = ({ formik, name, label, onChange }) => {
    const value = getIn(formik.values, name);
    
    const handle = (val) => {
    formik.setFieldValue(name, val);
    formik.setFieldTouched(name, true, false);
    onChange?.(val);
    };
    
        return (
            <div>
            <span className="block mb-2">{label}</span>
            <div className="flex items-center gap-6">
                <label htmlFor={`${name}-yes`} className="flex items-center gap-2 cursor-pointer">
                <input
                    id={`${name}-yes`}
                    type="radio"
                    name={name}
                    checked={value === true}
                    onChange={() => handle(true)}
                    className="w-4 h-4"
                />
                نعم
                </label>
                <label htmlFor={`${name}-no`} className="flex items-center gap-2 cursor-pointer">
                <input
                    id={`${name}-no`}
                    type="radio"
                    name={name}
                    checked={value === false}
                    onChange={() => handle(false)}
                    className="w-4 h-4"
                />
                لا
                </label>
            </div>
            <FieldError formik={formik} name={name} />
            </div>
        );
}

export default YesNoField