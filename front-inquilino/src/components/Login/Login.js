import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import  {useUser}  from '../../context/UserContext'
import './Login.css'
import '../../App.css';
import { backRoutes, routes } from '../../routes';
import { useEffect } from 'react';

function Login({setShowModal}) {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useUser()
    // useEffect (()=>{
    //     console.log("el usuario")
    //     console.log(user)
    //     if(user){
    //         alert("entra")
    //     }
    // },[user])
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        
        const res = await fetch(backRoutes.r_login, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' 
            }        
        })
        const data = await res.json()
        setLoading(false)
        
        if (res.ok) {
            setUser(data)
        } else {
            setError(data.error)
        }
    }

    if (loading) {
        return <h1>Cargando...</h1>
    }
    
    if(user){
        return <Redirect to={routes.r_register} />
    }

    return (
        <div className="login-Container">
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="loginForm">
                
                <label>
                    <p>Username/Email:</p>
                    <input required value={username} onChange={e => setUsername(e.target.value)} className="primary-input login-input" />
                </label>
                <label>
                    <p>Contraseña:</p>
                    <input required value={password} onChange={e => setPassword(e.target.value)} type="password" className="primary-input  login-input" />
                </label>
                <button className="primary-button loginFormButton">Iniciar sesión</button>
                {error &&
                    <div className="error">{error}</div>
                }
                
            </form>
        </div>
    )
}

export default Login