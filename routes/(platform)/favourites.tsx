
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharFav from "../../islands/charFav.tsx";
import { Char } from "../../types.ts";

async function getPersonajes():Promise<Char[]> {
    const data = await fetch("https://hp-api.onrender.com/api/characters")
    if(data.status !== 200) throw new Error("API Chars error")
    const response = await data.json()
    return response
}

type data = {
    session:string
    chars:Char[]
}

type state = {
    session: string
}
export const handler:Handlers<state,data> = {
    GET: async (_req:Request,ctx:FreshContext<data>) => {
        const session = ctx.state.session
        const personajes = await getPersonajes()
        return ctx.render({chars: personajes,session:session})
    }
}
export default function Favourites(props:PageProps<data>){
const {session} = props.data
    const {chars} = props.data

    return(
        <CharFav charsOG={chars} session={session} />
    )
}