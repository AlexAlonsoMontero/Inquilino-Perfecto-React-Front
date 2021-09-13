import { useUser } from "../../context/UserContext"
import { backRoutes, routes } from "../../routes"
import { useEffect, useState } from "react"
import './DataUser.css'
import { useHistory } from "react-router"
const DataUser = () => {
    const [user] = useUser()
    const [dbUser, setDbUser] = useState()
    const [avatarStyle, setAvatarStyle] = useState()
    const history = useHistory()
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
            setAvatarStyle({backgroundImage: 'url(' + `${backRoutes.r_host_port}${result.user.avatar}` + ')'})
            setDbUser(result.user)
            
        }
        userData()   
        
    }, []);
    if(!user){
        alert("Necesita estar logado para accedere a esta página")
        history.push(routes.home)
    }

    const onHandleSubmit = async(e) =>{
        e.preventDefault()
        delete dbUser.id_usuario
        const fdProp= new FormData()
        fdProp.append('user_uuid',dbUser.user_uuid)
        fdProp.append('username', dbUser.username)
        fdProp.append( 'email' ,dbUser.email)
        fdProp.append('tipo' ,dbUser.tipo)
        // for (const key of Object.keys(dbUser)) {
        //     if (dbUser[key]) {
        //         console.log(key, dbUser)
        //         fdProp.append(key, dbUser[key])
        //     }
        // }
        fdProp.append('avatar',e.target.avatar.files[0])
        const data = await fetch(`${backRoutes.r_Datauser}${dbUser.username}`,{
            body:fdProp,
            method: 'PUT',
            headers:{
                'Authorization': 'Bearer ' + user.token
            },
            
        })
        const result = await data.json()
        if(result.newData){
            alert("El usuario ha sido cambiado con exito.En el proximo inicio de sesión verá el nuevo avatar")
        }
    }
    const handleImageAvatar = (e) =>{
        e.preventDefault()
        if( e.target.files[0] ){
            setAvatarStyle ({backgroundImage: 'url(' + URL.createObjectURL(e.target.files[0]) + ')'})
        }
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
                        <input  className="primary-input"  value = {dbUser.username} onChange ={ e=>setDbUser({...dbUser,username:e.target.value })} />
                    </label>
                    <label>
                        <p>Email</p>
                        <input type="mail" className="primary-input" value = {dbUser.email} onChange ={ e=>setDbUser({...dbUser, email:e.target.value}) } />
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