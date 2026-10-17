import client from "@/api/axiosGlobals";

export const getAllCasesFn = async (data) =>
    await client.get("/api/Cases", {
    params: data
}).then((res) => res.data);

export const getCaseByIdFn = async (data) =>
    await client.get(`/api/Cases/${data.id}`,{
        params: data.data
    }).then((res) => res.data);

export const deleteCaseFn = async (id) =>
    await client.delete(`/api/Cases/${id}`);

export const addCaseFn = async (data) =>
    await client.post(`/api/Cases`, data);

export const editCaseFn = async (data) =>
    await client.put(`/api/Cases/${data.id}`, data.data);