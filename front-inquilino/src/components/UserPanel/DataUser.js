import { useGetUser } from "../../hooks/inmowebApi"
import { useUser } from "../../context/UserContext"
import { backRoutes } from "../../routes"
import { useEffect, useState } from "react"
import './DataUser.css'
const DataUser = () => {
    const [user] = useUser()
    const [dbUser, setDbUser] = useState()
    const [avatarStyle, setAvatarStyle] = useState()
    
    useEffect(() => {
        const userData = async()=>{
            const userId = {user_uuid:user.user.user_uuid}
            const data = await fetch(backRoutes.r_Datauser + user.user.user_uuid,{
                method:'get',
                boyd:JSON.stringify(userId),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const result = await data.json()
            setDbUser(result.user)
            
        }
        userData()   
        
    }, []);

    console.log(dbUser)

    const onHandleSubmit = () =>{

    }
    const handleImageAvatar = () =>{

    }
    if(!dbUser){
        return <p>Cargando datos</p>
    }
    
    return dbUser &&(
        <div className={"dataUserContainer"}>
            <div className={"formDataUserContainer"}>
            <h1>Datos de usuario</h1>

                <form onSubmit={onHandleSubmit}>
                    <label>
                        <p>Nombre de usuario</p>
                        <input type="text" className="primary-input" value = {dbUser.username} onChanget ={ e=>setDbUser({...dbUser, unsername:e.target.value}) } />
                    </label>
                    <label>
                        <p>Contraseña</p>
                        <input type="password" className="primary-input" value = {dbUser.password} onChange={ e => setDbUser({ ...dbUser, password: e.target.value })}  />
                    </label>
                    <label>
                        <p>Confirma contraseña:</p>
                        <input type="password" className="primary-input" value = {dbUser.confirmPassword} onChange={ e => setDbUser({ ...dbUser, confirmPassword: e.target.value })}  />
                    </label>
                    <label>
                        <p>Email</p>
                        <input type="mail" className="primary-input" value = {dbUser.email} onChanget ={ e=>setDbUser({...dbUser, email:e.target.email}) } />
                    </label>
                    <label>
                        <p>Tipo de usuario:</p>
                        
                        <select className="primary-input" name="userTipo"  defaultValue="Tipo de usuario" onChange={ e => setDbUser({ ...dbUser, tipo: e.target.value }) }>
                        <option disabled>Tipo de usuario</option>
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
                <button className={"primary-button data-user-button"}>Enviar</button>
                </form>
            </div>
        </div>
    )
}
export default DataUser