import { FreshContext, Handlers } from "$fresh/server.ts";

type state = {
    session: string
}


export const handler:Handlers = {
    GET: (_req: Request,ctx:FreshContext) => {
        const session = ctx.state.session
        if(session){
            const date = new Date()
            const expire = new Date(date.getTime() - 365 * 24 * 60 *60 *1000).toUTCString()
            const headers = new Headers()
            headers.append("Set-Cookie",`session=${true}; path=/; expires=${expire}`)
            headers.set("Location","/logout/view")
            return new Response("", {
                status: 303,
                headers: headers,
            });            
        }
        return ctx.render()
    }
}

export default function Do(){}