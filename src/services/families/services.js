import client from "@/api/axiosGlobals";

export const getAllFamiliesFn = async (data) =>
    await client.get("/api/Families", {
    params: data
}).then((res) => res.data);

export const getFamilyByIdFn = async (data) =>
    await client.get(`/api/Families/${data.id}`,{
        params: data.data
    }).then((res) => res.data);

export const deleteFamilyFn = async (id) =>
    await client.delete(`/api/Families/${id}`);

export const addFamilyFn = async (data) =>
    await client.post(`/api/Families`, data);

export const editFamilyFn = async (data) =>
    await client.put(`/api/Families/${data.id}`, data.data);