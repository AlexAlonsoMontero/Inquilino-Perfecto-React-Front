import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import  {useUser}  from '../../context/UserContext'
import './Login.css'
import '../../App.css';
import { backRoutes, routes } from '../../routes';

function Login({setShowModal}) {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useUser()
    
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
            setShowModal(false)
            return <Redirect to="/" />
        } else {
            console.log(data.error)
            setError(data.error)
        }
    }

    if (loading) {
        return <h1>Cargando...</h1>
    }

    if (user) {
        setShowModal(false)
        alert("Entra")
        return <Redirect to="/" />
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
                <label>
                    Recuérdame
                    <input type="checkbox" onChange={e => console.log(e.target.checked)} />
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