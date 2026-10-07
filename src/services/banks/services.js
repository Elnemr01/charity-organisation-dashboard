import client from "@/api/axiosGlobals";



// products

export const getAllProductItemsFn = async (data)=> await client.get("/api/ProductInventories",{
    params: data
}).then((res)=>res.data);


export const deleteProductItemsFn = async (id)=> await client.delete(`/api/ProductInventories/${id}`);

// export const addProductItemsFn = async (data)=> await client.post(`/api/ProductInventories`,data);

// export const editProductItemsFn = async (data)=> await client.put(`/api/ProductInventories/${data.id}`,data.data);

export const equlProductItemsFn = async (data)=> await client.post(`/api/ProductInventories/${data.id}/adjust`,data.data);


// money


export const getAllCashInventoriesFn = async (data)=> await client.get("/api/CashInventories", {
    params: data
}).then((res)=>res.data);


export const deleteCashInventoryFn = async (id)=> await client.delete(`/api/CashInventories/${id}`);


export const equelCashInventoryFn = async (data)=> await client.post(`/api/CashInventories/${data.id}/adjust`,data.data);
