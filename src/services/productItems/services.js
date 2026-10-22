import client from "@/api/axiosGlobals";

export const getAllProductItemsFn = async (data) =>
    await client.get("/api/FamilyRequiredItems", {
        params: data
    }).then((res) => res.data);

export const getProductItemByIdFn = async (id) =>
    await client.get(`/api/FamilyRequiredItems/${id}`).then((res) => res.data);

export const deleteProductItemFn = async (id) =>
    await client.delete(`/api/FamilyRequiredItems/${id}`);

export const addProductItemFn = async (data) =>
    await client.post(`/api/FamilyRequiredItems`, data);

export const editProductItemFn = async (data) =>
    await client.put(`/api/FamilyRequiredItems/${data.id}`, data.data);