import { useEffect, useState } from "preact/hooks";
import { Char } from "../types.ts";
import CharCard from "./charCard.tsx";

type data = {
    charsOG:Char[]
    session:string
}

export default function CharList({charsOG,session}:data){
    const [name,setName] = useState<string>("")
    const [house,setHouse] = useState<string>("")
    const [chars,setChars] = useState<Char[]>(charsOG)

    useEffect(() => {
        if(name === "" && house === "") setChars(charsOG)
        const filtradosN = charsOG.filter((char) => char.name.toLowerCase().includes(name.toLowerCase()))
        const filtradosH = filtradosN.filter((char) => char.house.toLowerCase().includes(house.toLowerCase()))
        setChars(filtradosH)
    },[house,name])

    return(
        <div class="component">
            <div class="searchRow">
                <input placeholder="Nombre" onInput={(e) => setName(e.currentTarget.value)} />
                <select onChange={(e) => setHouse(e.currentTarget.value)}>
                    <option value="">Sin filtros</option>
                    <option value="Gryffindor">Gryffindor</option>
                    <option value="Slytherin">Slytherin</option>
                    <option value="Hufflepuff">Hufflepuff</option>
                    <option value="Ravenclaw">Ravenclaw</option>
                </select>
                <div class="username">
                    <h4>Username: {session}</h4>
                </div>
            </div>
            <div class="charList">
            {chars.map((char) => (<div key={char.id}><CharCard char={char} /></div>))}
            </div>
        </div>
    )
}