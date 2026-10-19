import client from "@/api/axiosGlobals";


export const getFinancialBudgetByIdFn = async (id) =>
    await client.get(`/api/FamilyFinancialBudgets/${id}`).then((res) => res.data);

export const deleteFinancialBudgetFn = async (id) =>
    await client.delete(`/api/FamilyFinancialBudgets/${id}`);

export const addFinancialBudgetFn = async (data) =>
    await client.post(`/api/FamilyFinancialBudgets`, data);

export const editFinancialBudgetFn = async (data) =>
    await client.put(`/api/FamilyFinancialBudgets/${data.id}`, data.data);