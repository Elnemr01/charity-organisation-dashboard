import client from "@/api/axiosGlobals";



export const getAllDonationPursposesFn = async (data) => await client.get(`/api/DonationPurposes`,{
    params: data
}).then(res => res.data)



export const addNewDonationPursposeFn = async (data) => await client.post('/api/DonationPurposes',data).then(res => res.data)


export const updateDonationPursposeFn = async (data) => await client.put(`/api/DonationPurposes/${data.id}`,data.data).then(res => res.data)


export const deleteDonationPursposeFn = async (id) => await client.delete(`/api/DonationPurposes/${id}`).then(res => res.data)

