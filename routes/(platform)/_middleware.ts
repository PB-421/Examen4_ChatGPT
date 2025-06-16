import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
    const headers = req.headers
    const cookies = headers.get("Cookie")
    const session = cookies?.split("; ").find((cookie) => cookie.trim().startsWith("session="))?.split("=")[1]
    if(session){
        ctx.state.session = session
        const resp = await ctx.next();
        return resp;
    }
    return new Response("", {
    status: 303,
    headers: { Location: "/" },
    });
}