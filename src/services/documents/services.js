import client from "@/api/axiosGlobals";


export const deleteDocumentFn = async (id) =>
    await client.delete(`/api/FamilyDocuments/${id}`);

export const getFamilyDocumentFn = async (id) => {
    const res = await client.get(`/api/FamilyDocuments/${id}/file`, {
        responseType: 'blob',
    });
    return res.data;
};

export const addDocumentFn = async (data) =>
    await client.post(`/api/Families/${data.id}/documents`, data?.data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
