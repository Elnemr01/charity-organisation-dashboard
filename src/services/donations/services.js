import client from "@/api/axiosGlobals";

export const getAllDonationsFn = async (data) =>
    await client.get("/api/Donations", {
    params: data
}).then((res) => res.data);

export const getDonationByIdFn = async (id) =>
    await client.get(`/api/Donations/${id}`).then((res) => res.data);

export const deleteDonationFn = async (id) =>
    await client.delete(`/api/Donations/${id}`);

export const addDonationFn = async (data) =>
    await client.post(`/api/Donations`, data);

export const editDonationFn = async (data) =>
    await client.put(`/api/Donations/${data.id}`, data.data);