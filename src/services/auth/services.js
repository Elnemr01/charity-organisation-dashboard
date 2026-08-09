import client from "@/api/axiosGlobals";

export const loginFn=async (data)=> 
    await client.post("/auth", data);