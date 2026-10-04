import client from "@/api/axiosGlobals";



export const getAllProductCategoriesFn = async (page) => await client.get(`/api/ProductCategories?pageNumber=${page}`).then(res => res.data)



export const addNewProductCategoryFn = async (data) => await client.post('/api/ProductCategories',data).then(res => res.data)


export const updateProductCategoryFn = async (data) => await client.put(`/api/ProductCategories/${data.id}`,data.data).then(res => res.data)

export const deleteProductCategoryFn = async (id) => await client.delete(`/api/ProductCategories/${id}`).then(res => res.data)

