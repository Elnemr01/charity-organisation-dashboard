import { getIn } from "formik";


export const inputClass = (hasError) =>
    `w-full border rounded-md p-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-secondary ${
        hasError ? 'border-red-500' : 'border-gray-300'
    }`


export const hasErr =(formik, name) =>
        Boolean(getIn(formik?.touched, name) && getIn(formik.errors, name));