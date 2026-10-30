import client from "@/api/axiosGlobals";


export const deleteDocumentFn = async (id) =>
    await client.delete(`/api/FamilyDocuments/${id}`);

export const addDocumentFn = async (data) =>
    await client.post(`/api/Families/${data.id}/documents`, data?.data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
