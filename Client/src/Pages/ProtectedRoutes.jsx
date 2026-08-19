import { useEffect } from 'react'
import { useUserContext } from '../Utils/UserContext'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AppLoading = () => {
    return (
        <main
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50 px-6"
            role="status"
            aria-label="Loading TaskManager"
        >
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />

            <div className="relative w-full max-w-sm text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl shadow-blue-100/70 ring-1 ring-blue-100">
                    <div className="relative flex h-14 w-14 items-center justify-center">
                        <span className="absolute inset-0 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600 border-r-purple-500" />
                        <span className="h-4 w-4 rounded-full bg-linear-to-br from-blue-500 to-purple-500 shadow-md shadow-blue-200" />
                    </div>
                </div>

                <h1 className="mt-7 text-2xl font-bold tracking-tight text-gray-800">
                    TaskManager
                </h1>
                <p className="mt-2 text-sm text-gray-500">Getting your workspace ready</p>
            </div>
        </main>
    )
}

const ProtectedRoutes = () => {
    const{data, setData} = useUserContext()
    const nav = useNavigate()

    useEffect(() => {

        async function getData(){
            try {
                const data = await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/get-user-data", {withCredentials : true})
                setData(data.data.data)
            } catch {
                nav("/login")
            }

        }

        getData()
        
       
    }, [])


    if(!data)
    {
        return <AppLoading />
    }

    return <Outlet />
}

export default ProtectedRoutes