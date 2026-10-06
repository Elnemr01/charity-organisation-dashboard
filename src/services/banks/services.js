import client from "@/api/axiosGlobals";



// products

export const getAllProductItemsFn = async (data)=> await client.get("/api/ProductInventories",{
    params: data
}).then((res)=>res.data);


export const deleteProductItemsFn = async (id)=> await client.delete(`/api/ProductInventories/${id}`);

export const addProductItemsFn = async (data)=> await client.post(`/api/ProductInventories`,data);

export const editProductItemsFn = async (data)=> await client.put(`/api/ProductInventories/${data.id}`,data);

// money


export const getAllCashInvertoriesFn = async (data)=> await client.get("/api/CashInventories").then((res)=>res.data);


// export const deleteCashInvertoriesFn = async (id)=> await client.delete(`/api/CashInventories/${id}`);
