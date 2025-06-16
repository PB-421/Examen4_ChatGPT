import { useEffect, useState } from "preact/hooks";
import { Char } from "../types.ts";
import CharCard from "./charCard.tsx";
import { favSignal } from "../signals.ts";

type data = {
    charsOG:Char[]
    session:string
}

export default function CharList({charsOG,session}:data){
    const [chars,setChars] = useState<Char[]>([])


    useEffect(() => {
        const cookie = document.cookie.split("; ")
        const fav = cookie.find((cookie) => cookie.trim().startsWith("favourites="))?.split("=")[1]
        const ids = fav?.split(",")
        console.log(ids)
        if(ids){
            setChars(charsOG.filter((char) => ids.includes(char.id)))
            console.log(chars)
        } else {
            setChars([])
        }
    },[favSignal.value])

    return(
        <div>
            <h4>Username: {session}</h4>
            {chars.length === 0 && <h2>No hay favoritos</h2>}
            {chars.map((char) => (<li key={char.id}><CharCard char={char} /></li>))}
        </div>
    )
}