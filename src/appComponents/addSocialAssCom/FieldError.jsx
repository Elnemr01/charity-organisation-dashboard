import { getIn } from 'formik';
import React from 'react'

const FieldError = ({ formik, name }) => {

    const error = getIn(formik.errors, name);
    const touched = getIn(formik.touched, name);
    if (!touched || !error || typeof error !== 'string') return null;
    return (
        <p className="text-red-500 text-sm mt-1">{error}</p>
    )
}

export default FieldError