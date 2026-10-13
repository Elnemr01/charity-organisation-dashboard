import client from "@/api/axiosGlobals";

export const loginFn=async (data)=> 
    await client.post("/auth", data,{
        withCredentials: true
    });


export const logoutFn=async ()=> 
    await client.post("/Auth/revoke-refresh-token",{
        withCredentials: true
    });