import { useEffect, useState } from "preact/hooks";
import { Char } from "../types.ts";
import { favSignal } from "../signals.ts";

type data = {
    char: Char
}

export default function CharCard({char}:data) {
    function isFavourite():boolean {
        const cookie = document.cookie.split("; ")
        const favourites = cookie.find((cookie) => cookie.trim().startsWith("favourites="))?.split("=")[1]
        if(favourites){
            const favSep = favourites.split(",")
            if(favSep.length === 1){
                return favSep[0] === char.id
            } else {
            return favSep.some((id) => id === char.id)
            }
        } else {
            return false
        }
    }

    function favourites():string[]{
        const favourites = document.cookie.split("; ").find((cookie) => cookie.trim().startsWith("favourites="))?.split("=")[1]
        if(favourites){
            const favSep = favourites.split(",")
            return favSep
        } else {
            return []
        }
    }

    function addFavourite():void {
        const date= new Date()
        const expire = new Date(date.getTime() + 365 * 24 * 60 *60 *1000).toUTCString()
        const favoritos = favourites()
        favoritos.push(char.id)
        document.cookie = `favourites=${favoritos.join(",")}; path=/; expires=${expire}`
    }

    function eraseFavourite():void {
        const favoritos = favourites()
        const filtrado = favoritos.filter((id) => id !== char.id)
        if(filtrado.length === 0){
            const date= new Date()
            const expire = new Date(date.getTime() - 365 * 24 * 60 *60 *1000).toUTCString()
            document.cookie = `favourites=${filtrado.join(",")}; path=/; expires=${expire}`
        } else {
            const date= new Date()
            const expire = new Date(date.getTime() + 365 * 24 * 60 *60 *1000).toUTCString()
            document.cookie = `favourites=${filtrado.join(",")}; path=/; expires=${expire}`
        }
    }

    const [fav,setFav] = useState<boolean>(false)
    const [first,setFirst] = useState<boolean>(true)

    useEffect(() => {
        if(first){
        favSignal.value = !favSignal.value
        setFav(isFavourite)
        setFirst(false)
        } else {
            favSignal.value = !favSignal.value
            if(!fav){
                eraseFavourite()
            } else {
                addFavourite()
            }
        }  
    },[fav])

    return(
        <div class="charCard">
            <img src={char.image} alt={char.name + " image"} />
            <h4><a href={"/"+char.id} style={{textDecoration: "none",color:" black"}}>{char.name}</a></h4>
            <p>Casa: {char.house}</p>
            {!fav && <button type="button" onClick={() => setFav(true)}>Añadir a favs</button>}
            {fav && <button type="button" onClick={() => setFav(false)}>Quitar de favs</button>}
        </div>
    )
}