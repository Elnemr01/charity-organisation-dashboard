import client from "@/api/axiosGlobals";

export const getAllCharityExpensesFn = async (data) => await client.get("/api/CharityExpenses", {
    params: data
}).then((res) => res.data);

export const getCharityExpenseByIdFn = async (id) =>
    await client.get(`/api/CharityExpenses/${id}`).then((res) => res.data);

export const addCharityExpenseFn = async (data) => await client.post("/api/CharityExpenses", data);

export const editCharityExpenseFn = async (data) =>
    await client.put(`/api/CharityExpenses/${data.id}`, data.data);

export const deleteCharityExpenseFn = async (id) => await client.delete(`/api/CharityExpenses/${id}`);

export const payCharityExpenseFn = async (data) =>
    await client.post(`/api/CharityExpenses/${data.id}/pay`, data.data);