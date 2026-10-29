import client from "@/api/axiosGlobals";


export const deleteDocumentFn = async (id) =>
    await client.delete(`/api/Families/${id}/documents`);

export const addDocumentFn = async (data) =>
    await client.post(`/api/Families/${data.id}/documents`, data);
