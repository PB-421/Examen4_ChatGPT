import { useEffect, useState } from "preact/hooks";
import { Char } from "../types.ts";
import CharCard from "./charCard.tsx";
import { favSignal } from "../signals.ts";

type data = {
    charsOG:Char[]
    session:string
}

export default function CharList({charsOG,session}: data) {
    const [baseChars, setBaseChars] = useState<Char[]>([]);
    const [chars, setChars] = useState<Char[]>([]);
    const [name, setName] = useState<string>("");
    const [house, setHouse] = useState<string>("");

    // Carga inicial con favoritos desde cookies
    useEffect(() => {
        const cookie = document.cookie.split("; ");
        const fav = cookie.find((cookie) => cookie.trim().startsWith("favourites="))?.split("=")[1];
        const ids = fav?.split(",");
        if (ids) {
            const favoritos = charsOG.filter((char) => ids.includes(char.id));
            setBaseChars(favoritos);
            setChars(favoritos);
        } else {
            setBaseChars([]);
            setChars([]);
        }
    }, [favSignal.value, charsOG]);

    // Filtro por nombre y casa
    useEffect(() => {
        if(name === "" && house === "") setChars(charsOG)
        const filtradosN = baseChars.filter((char) => char.name.toLowerCase().includes(name.toLowerCase()))
        const filtradosH = filtradosN.filter((char) => char.house.toLowerCase().includes(house.toLowerCase()))
        setChars(filtradosH);
    }, [name, house, baseChars]);

    return (
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
                <div class="username" style={{ marginLeft: "auto" }}>
                    <h4>Username: {session}</h4>
                </div>
            </div>
            {chars.length === 0 && <h2>No hay favoritos</h2>}
            <div class="charList">
                {chars.map((char) => (
                    <div key={char.id}>
                        <CharCard char={char} />
                    </div>
                ))}
            </div>
        </div>
    );
}
