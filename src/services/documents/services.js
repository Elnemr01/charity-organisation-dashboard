import client from "@/api/axiosGlobals";

export const getAllDocumentsFn = async (data) =>
    await client.get(`/api/Families/${data.id}/documents`, {
        params: data?.data
    }).then((res) => res.data);

export const getDocumentByIdFn = async (id) =>
    await client.get(`/api/Families/${id}/documents`).then((res) => res.data);

export const deleteDocumentFn = async (id) =>
    await client.delete(`/api/Families/${id}/documents`);

export const addDocumentFn = async (data) =>
    await client.post(`/api/Families/${data.id}/documents`, data);

export const editDocumentFn = async (data) =>
    await client.put(`/api/Families/${data.id}/documents/${data.documentId}`, data.data);