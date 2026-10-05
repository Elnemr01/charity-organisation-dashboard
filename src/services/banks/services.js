import client from "@/api/axiosGlobals";

export const getAllProductItemsFn = async (data)=> await client.get("/api/ProductInventories").then((res)=>res.data);


export const deleteProductItemsFn = async (id)=> await client.delete(`/api/ProductInventories/${id}`);

export const addProductItemsFn = async (data)=> await client.post(`/api/ProductInventories`,data);

export const editProductItemsFn = async (data)=> await client.put(`/api/ProductInventories/${data.id}`,data);