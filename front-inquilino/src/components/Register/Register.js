import { useState } from "react"
import './Register.css'
const Register = () => {
    //username:"",password:"",email:"", tipo:""
    const [newUser,setNewUser] = useState({});

    const onHandleSubmit = async (e) =>{
        e.preventDefault()
        console.log({newUser})
        const addUser = await fetch('http://127.0.0.1:3001/api/users',{
            method: 'POST',
            body: JSON.stringify( newUser ),
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(addUser)
        
    }
    return(
        <div className="registerLogin-Container">
            <div className="register-Container">
            <header><h1>Registro de nuevo usuario</h1></header>
                
                <form onSubmit={ onHandleSubmit }>
                    <label>
                        Nombre de usuario:<br/>
                        <input type="text" className="primary-input" value ={newUser.username} onChange={ e =>setNewUser({ username: e.target.value })}/>
                    </label>
                    <label>
                        Contraseña:<br/>
                        <input type="password" className="primary-input" value = {newUser.password} onChange={ e => setNewUser({ ...newUser, password: e.target.value })}  />
                    </label>
                    <label>
                        Correo electrónico:<br/>
                        <input type="mail" className="primary-input" value = {newUser.email} onChange={ e => setNewUser({ ...newUser, email: e.target.value })} />
                    </label>
                    <label>
                        Tipo de usuario:<br/>
                        <select className="primary-input"  onChange={ e => setNewUser({ ...newUser, tipo: e.target.value }) }>
                            <option selected></option>
                            <option value="INQUILINO" >INQUILINO</option>
                            <option value="CASERO" >CASERO</option>
                            <option value="CASERO/INQUILINO">CASERO E INQUILINO</option>
                        </select>
                    </label>
                    <button className="primary-button">Enviar</button>
                </form>
            </div>
            
        </div>
    )
}

export default Register