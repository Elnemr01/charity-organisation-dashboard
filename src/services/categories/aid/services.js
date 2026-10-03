import client from "@/api/axiosGlobals";



export const getAllAidCategoriesFn = async () => await client.get('/api/AidCategories').then(res => res.data)


export const addNewAidCategoryFn = async (data) => await client.post('/api/AidCategories',data).then(res => res.data)


export const updateAidCategoryFn = async (data) => await client.put(`/api/AidCategories/${data.id}`,data.data).then(res => res.data)


export const deleteAidCategoryFn = async (id) => await client.delete(`/api/AidCategories/${id}`).then(res => res.data)

