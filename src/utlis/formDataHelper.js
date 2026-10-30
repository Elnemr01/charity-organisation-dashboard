// utils/formDataHelpers.js


export const buildDocumentsFormData = (documents = [], rootKey = 'Documents') => {
    const formData = new FormData();

    console.log(documents)

    documents.forEach((doc, index) => {
        const prefix = `${rootKey}[${index}]`;
        if (doc.Name) formData.append(`${prefix}.Name`, doc.Name);
        if (doc.File) formData.append(`${prefix}.File`, doc.File);
    });


    return formData;
};