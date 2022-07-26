
import {createContext, useState} from 'react'

export let AuthContext = createContext(null)

export function AuthProvider({children}) {

    let [user, setUser] = useState('北陌')

    let value = {user}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}