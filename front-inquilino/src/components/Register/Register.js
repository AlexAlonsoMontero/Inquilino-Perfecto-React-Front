import { Profiler, useState } from "react"
import './Register.css'
import { useUser } from "../../context/UserContext";
import { Redirect } from "react-router";
import avatar from './avatar.png'
import { file } from "@babel/types";



const Register = () => {
    //username:"",password:"",email:"", tipo:""
    const [avatarStyle,setAvatarStyle] = useState ({ backgroundImage: 'url(' + avatar + ')' })
    const [user] = useUser()
    const [newUser,setNewUser] = useState({tipo:"INQUILINO"});
    console.log(newUser)
    if(user){
        return <Redirect to="/"/>
    }
   
    const onHandleSubmit = async (e) =>{
        e.preventDefault()
        const avatar = e.target.avatar.files[0]
        console.log("LOS DATOS DEL USUARIO" + newUser.tipo)
        const fd = new FormData()
        fd.append('avatar', avatar)
        fd.append('username',newUser.username)
        fd.append('password',newUser.password)
        fd.append('tipo',newUser.tipo)
        fd.append('email',newUser.email)
        console.log("LOS DATOS DEL FORM " + JSON.stringify(fd))
        const addUser = await fetch('http://127.0.0.1:3001/api/users',{
            body: fd,
            method: 'POST'
            
        })
        if(addUser)
        {
            <Redirect to="/"/>
        }
        
        
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
                    <label>
                        Avatar: <br/>
                        <div className="loadimage-container" style={avatarStyle} />
                        <p>Pulsa la imagen para seleccionar un avatar</p>
                        <input className="primary-file-select" name="avatar" type="file" accept="image/*" />
                        
                    </label>
                    <button className="primary-button">Enviar</button>
                </form>
            </div>
            
        </div>
    )
}

export default Register