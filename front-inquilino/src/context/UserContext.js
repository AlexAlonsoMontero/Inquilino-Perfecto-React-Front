import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('session')))
    const superSetUser = (value) => {
        setUser(value)
        sessionStorage.setItem('session', JSON.stringify(value || ''))
    }
    return (
        <UserContext.Provider value={[user, superSetUser]}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}
