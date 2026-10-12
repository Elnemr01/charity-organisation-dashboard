import client from "@/api/axiosGlobals";

export const getAllFamilyExpensesFn = async (data) => await client.get("/api/FamilyExpenses").then((res) => res.data);

export const editFamilyExpenseFn = async (data) =>
    await client.put(`/api/FamilyExpenses/${data.id}`, data.data);