import client from "@/api/axiosGlobals";

export const getAllSocialAssessmentsFn = async (data) =>
    await client.get("/api/SocialAssessments", {
        params: data
    }).then((res) => res.data);

export const getSocialAssessmentByIdFn = async (data) =>
    await client.get(`/api/SocialAssessments/${data.id}`, {
        params: data.data
    }).then((res) => res.data);

export const deleteSocialAssessmentFn = async (id) =>
    await client.delete(`/api/SocialAssessments/${id}`);

export const addSocialAssessmentFn = async (data) =>
    await client.post(`/api/SocialAssessments`, data);

export const editSocialAssessmentFn = async (data) =>
    await client.put(`/api/SocialAssessments/${data.id}`, data.data);