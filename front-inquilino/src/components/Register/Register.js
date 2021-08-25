import { useState } from "react"
import './Register.css'
import avatar from './avatar.png'
import { backRoutes } from "../../routes"


const Register = () => {
    const [error, setError] = useState()
    const [avatarStyle,setAvatarStyle] = useState({ backgroundImage: 'url(' + avatar + ')' })
    const [newUser,setNewUser] = useState({tipo:"INQUILINO"});
    const [registered,setRegistered]=useState(false)
    
    const handleImageAvatar = (e)=>{
        e.preventDefault()
        if( e.target.files[0] ){
            setAvatarStyle ({backgroundImage: 'url(' + URL.createObjectURL(e.target.files[0]) + ')'})
        }
        
    }
    
    const onHandleSubmit = async (e) =>{
        e.preventDefault()
        alert("entra")
        const avatar = e.target.avatar.files[0]
        const fd = new FormData()
        for (let cont =0; cont < Object.keys(newUser).length; cont ++){
            fd.append(Object.keys(newUser)[cont],Object.values(newUser)[cont])
        }
        fd.append('avatar', avatar)
       
        
        const addUser = await fetch(backRoutes.r_register,{
            body: fd,
            method: 'POST'
            
        })
        const res = await addUser.json()
        if(res.error){
            setError(res.error)
        }else{
            setRegistered(true)
        }
        //TODO VERIFICAR QUE SE USA ROUTES EN VEZ DE LAS RUTAS A MANO
    }
    if (registered) {
        return(
            <>  
                <h1>Revisa tu mail, y activa el usuario</h1>
            </>
        ) 
    }
    else{
        return !registered && (
        
            <div className="registerLogin-Container">
                <div className="register-Container">
                <header><h1>Registro de nuevo usuario</h1></header>
                    <form onSubmit={ onHandleSubmit }>
                        {error &&
                            <>
                                <div className="error">
                                    {error}
                                </div>
                                <div className="alert-container">
                                    <p>username: Caracteres alfanumericos si "ñ" ni espacios en blanco</p>
                                    <p>contraseña: Caracteres alfanumericos si "ñ" ni espacios en blanco</p>
                                    <p>email: Debe de llevar @ y dominio</p>
                                </div> 
                            </>
                        
                        }
                        <label>
                            Nombre de usuario:<br/>
                            <input type="text" alt="prueba" className="primary-input" value ={newUser.username} onChange={ e =>setNewUser({ ...newUser, username: e.target.value })}/>
                        </label>
                        <label>
                            Contraseña:<br/>
                            <input type="password" className="primary-input" value = {newUser.password} onChange={ e => setNewUser({ ...newUser, password: e.target.value })}  />
                        </label>
                        <label>
                            Confirma contraseña:<br/>
                            <input type="password" className="primary-input" value = {newUser.confirmPassword} onChange={ e => setNewUser({ ...newUser, confirmPassword: e.target.value })}  />
                        </label>
                        <label>
                            Correo electrónico:<br/>
                            <input type="mail" className="primary-input" value = {newUser.email} onChange={ e => setNewUser({ ...newUser, email: e.target.value })} />
                        </label>
                        <label>
                            Tipo de usuario:<br/>
                            <select className="primary-input" name="userTipo"  defaultValue="INQUILINO" onChange={ e => setNewUser({ ...newUser, tipo: e.target.value }) }>
                                <option value="INQUILINO">INQUILINO</option>
                                <option value="CASERO" >CASERO</option>
                                <option value="INQUILINO/CASERO">INQUILINO/CASERO</option>
                            </select>
                        </label>
                        <label name="avatarImage" className="avatarImage" onChange={e=>handleImageAvatar(e)}>
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
    
}

export default Register