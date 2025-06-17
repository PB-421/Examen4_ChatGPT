import { Char } from "../types.ts";

type data = {
    char: Char
}

export default function CharDetail({char}:data) {
    return(
        <div class="charDetail">
            <img src={char.image} />
            <h3><a href="/">{char.name}</a></h3>
            <h4>Genero: {char.gender}</h4>
            <h4>Casa: {char.house}</h4>
            <h4>Especie: {char.species}</h4>
            <h4>Fecha: {char.dateOfBirth}</h4>
            
        </div>
    )
}