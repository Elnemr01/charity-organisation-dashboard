import client from "@/api/axiosGlobals";



export const getAllCaseCategoriesFn = async (page) => await client.get(`/api/CaseCategories`,{
    params: {
        pageNumber: page.page,
        searchValue: page.debounceValue
    }
}).then(res => res.data)


export const addNewCaseCategoryFn = async (data) => await client.post('/api/CaseCategories',data).then(res => res.data)


export const updateCaseCategoryFn = async (data) => await client.put(`/api/CaseCategories/${data.id}`,data.data).then(res => res.data)


export const deleteCaseCategoryFn = async (id) => await client.delete(`/api/CaseCategories/${id}`).then(res => res.data)

