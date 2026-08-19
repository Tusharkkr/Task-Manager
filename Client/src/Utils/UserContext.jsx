import { createContext, useContext, useState } from "react";

const UserContext = createContext()


export function UserContextProvider({children})
{
    const[data, setData] = useState(null)

    return <UserContext.Provider value={{data, setData}}>
        {children}
    </UserContext.Provider>
}



export function useUserContext()
{
    return useContext(UserContext)
}

