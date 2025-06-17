import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharDetail from "../../components/charDetail.tsx";
import { Char } from "../../types.ts";

type data = {
    char:Char
}


async function getPersonaje(id:string):Promise<Char> {
    const data = await fetch("https://hp-api.onrender.com/api/character/"+id)
    if(data.status !== 200) throw new Error("API Chars error")
    const response = await data.json()
    return response[0]
}

export const handler:Handlers<data> = {
    GET: async (_req:Request,ctx:FreshContext<unknown,data>) => {
        const {id} = ctx.params
        const personaje = await getPersonaje(id)
        return ctx.render({char: personaje})
    }
}

export default function Page(props:PageProps<data>){

    const {char} = props.data
    return(
        <div class="component">
            <CharDetail char={char} />
        </div>
    )
}