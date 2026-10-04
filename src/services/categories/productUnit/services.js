import client from "@/api/axiosGlobals";



export const getAllProductUnitsFn = async (page) => await client.get(`/api/ProductUnits?page=${page}`).then(res => res.data)



export const addNewProductUnitFn = async (data) => await client.post('/api/ProductUnits',data).then(res => res.data)


export const updateProductUnitFn = async (data) => await client.put(`/api/ProductUnits/${data.id}`,data.data).then(res => res.data)


export const deleteProductUnitFn = async (id) => await client.delete(`/api/ProductUnits/${id}`).then(res => res.data)

