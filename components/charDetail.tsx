import { Char } from "../types.ts";

type data = {
    char: Char
}

export default function CharDetail({char}:data) {
    return(
        <div>
            <img src={char.image} width={200} />
            <h3><a href="/">{char.name}</a></h3>
            <h4>{char.gender}</h4>
            <h4>{char.house}</h4>
            <h4>{char.species}</h4>
            <h4>{char.dateOfBirth}</h4>
        </div>
    )
}