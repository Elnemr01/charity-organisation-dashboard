    // utils/buildFamilyFormData.js

    const appendValue = (formData, key, value) => {
    // تجاهل null / undefined (الباك إند هيعتبرها مش مبعوتة)
    if (value === null || value === undefined) return;

    // File أو Blob
    if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
        return;
    }

    // Date
    if (value instanceof Date) {
        formData.append(key, value.toISOString());
        return;
    }

    // Array
    if (Array.isArray(value)) {
        if(key==="documents") {
            value.forEach((item, index) => {
            appendValue(formData, `${key}.${key}[${index}]`, item);
            });
            return;
        }
        value.forEach((item, index) => {
        appendValue(formData, `${key}[${index}]`, item);
        });
        return;
    }

    // Object
    if (typeof value === 'object') {
        Object.entries(value).forEach(([k, v]) => {
        appendValue(formData, `${key}.${k}`, v);
        });
        return;
    }

    // primitives (string, number, boolean)
    formData.append(key, value);
    };

    export const buildFamilyFormData = (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
        appendValue(formData, key, value);
    });

    return formData;
    };