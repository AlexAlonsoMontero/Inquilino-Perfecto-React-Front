import { useState } from "react"
import './Register.css'
import avatar from './avatar.png'

const Register = () => {
    const [error, setError] = useState()
    const  [avatarStyle,setAvatarStyle] = useState({ backgroundImage: 'url(' + avatar + ')' })
    const [newUser,setNewUser] = useState({tipo:"INQUILINO"});
        
    const handleImageAvatar = (e)=>{
        e.preventDefault()
        if( e.target.files[0] ){
            setAvatarStyle ({backgroundImage: 'url(' + URL.createObjectURL(e.target.files[0]) + ')'})
        }
        
    }
    
    const onHandleSubmit = async (e) =>{
        e.preventDefault()
        const avatar = e.target.avatar.files[0]
        const fd = new FormData()
        fd.append('avatar', avatar)
        fd.append('username',newUser.username)
        fd.append('password',newUser.password)
        fd.append('tipo',newUser.tipo)
        fd.append('email',newUser.email)
        
        const addUser = await fetch('http://127.0.0.1:3001/api/users',{
            body: fd,
            method: 'POST'
            
        })
        const res = await addUser.json()
        if(res.error){
            console.warn(res.error)
            setError(res.error)

        }
        //TODO VERIFICAR QUE SE USA ROUTES EN VEZ DE LAS RUTAS A MANO
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
                        <select className="primary-input" name="userTipo"  onChange={ e => setNewUser({ ...newUser, tipo: e.target.value }) }>
                            <option value="INQUILINO" selected>INQUILINO</option>
                            <option value="CASERO" >CASERO</option>
                            <option value="CASERO/INQUILINO">CASERO E INQUILINO</option>
                        </select>
                    </label>
                    <label name="avatarImage" class="avatarImage" onChange={e=>handleImageAvatar(e)}>
                        Avatar: <br/>
                        <div className="loadimage-container" style={avatarStyle} />
                        <p>Pulsa la imagen para seleccionar un avatar</p>
                        <input className="primary-file-select" name="avatar" type="file" accept="image/*" />
                        
                        
                    </label>
                    <button className="primary-button">Enviar</button>
                    {error && <div className="error">{error}</div> }
                </form>
            </div>
            
        </div>
        
    )
}

export default Register