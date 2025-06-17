import { FreshContext, Handlers } from "$fresh/server.ts";
import Formulario from "../islands/formulario.tsx";



export const handler:Handlers = {
  GET: (req: Request,ctx:FreshContext) => {
      const headers = req.headers
      const cookies = headers.get("Cookie")
      const session = cookies?.split("; ").find((cookie) => cookie.trim().startsWith("session="))?.split("=")[1]
      if(session){
        return new Response("", {
          status: 303,
          headers: { Location: "/chars" },
        });
      }
      return ctx.render()
  },

  POST: async (req:Request,ctx:FreshContext) => {
    const form = await req.formData()
    const username = form.get("username")
    if(username){
      const date = new Date()
      const expire = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString()
      const headers = new Headers()
      headers.append("Set-Cookie",`session=${username}; path=/; expires=${expire}`)
      headers.set("Location","/chars")
      return new Response("", {
        status: 303,
        headers: headers,
      });
    }
    return ctx.render()
  }
}

export default function Home() {

  return (
      <Formulario />
  );
}
