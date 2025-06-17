import { useState } from "preact/hooks";


export default function Formulario(){
    const [password,setPassword] = useState<string>("")
    const [error,setError] = useState<boolean>(false)

    function handlerClick(e: Event){
        if(password !== "1234"){
            e.preventDefault()
            setError(true)
        }
    }

    return(
        <div style={{display: "flex",justifyContent: "center"}}>
            <form class="form" method="POST" action="/">
                <label>Username</label>
                <input type="text" name="username" required />
                <label>Password</label>
                <input type="password" name="password" onInput={(e) => {setPassword(e.currentTarget.value); setError(false)}}required />
                <button type="submit" onClick={(e) => handlerClick(e)}>Acceder</button>
                {error && <h4 style={{color: "red"}}>Contraseña Incorrecta</h4>}
            </form>
        </div>
    )
}