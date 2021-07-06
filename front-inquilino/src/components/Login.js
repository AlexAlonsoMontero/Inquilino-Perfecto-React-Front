import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import  {useUser}  from '../context/UserContext'
import './componentsCSS/Login.css'
import '../App.css';



function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useUser()

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch('http://chat-api.trek-quest.com/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(res)
        const data = await res.json()
        setLoading(false)
        if (res.ok) {
            console.log(data)
            setUser(data)
        } else {
            console.log(data)
            setError(data.error)
        }
    }

    if (loading) {
        return <h1>Cargando...</h1>
    }

    if (user) {
        return <Redirect to="/profile" />
    }

    return (
        <div className="loginContainer">
            <form onSubmit={handleSubmit} className="loginForm">
                
                <label>
                    Username:
                    <input required value={username} onChange={e => setUsername(e.target.value)} className="primary-input" />
                </label>
                <label>
                    Password:
                    <input required value={password} onChange={e => setPassword(e.target.value)} type="password" className="primary-input" />
                </label>
                <label>
                    Recuérdame
                    <input type="checkbox" onChange={e => console.log(e.target.checked)} />
                </label>
                <button className="primary-button loginFormButton">Iniciar sesión</button>
                {error &&
                    <p className="error">{error}</p>
                }
                
            </form>
        </div>
    )
}

export default Login