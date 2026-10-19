import client from "@/api/axiosGlobals";

export const getAllProductItemsFn = async (data) =>
    await client.get("/api/ProductItems", {
        params: data
    }).then((res) => res.data);

export const getProductItemByIdFn = async (id) =>
    await client.get(`/api/ProductItems/${id}`).then((res) => res.data);

export const deleteProductItemFn = async (id) =>
    await client.delete(`/api/ProductItems/${id}`);

export const addProductItemFn = async (data) =>
    await client.post(`/api/ProductItems`, data);

export const editProductItemFn = async (data) =>
    await client.put(`/api/ProductItems/${data.id}`, data.data);