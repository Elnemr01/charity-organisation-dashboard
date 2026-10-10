import client from "@/api/axiosGlobals";

export const getAllDonersFn = async (data) =>
    await client.get("/api/Donors", {
    params: data
}).then((res) => res.data);

export const getDonerByIdFn = async (data) =>
    await client.get(`/api/Donors/${data.id}`,{
        params: data
    }).then((res) => res.data);

export const deleteDonerFn = async (id) =>
    await client.delete(`/api/Donors/${id}`);

export const addDonerFn = async (data) =>
    await client.post(`/api/Donors`, data);

export const editDonerFn = async (data) =>
    await client.put(`/api/Donors/${data.id}`, data.data);