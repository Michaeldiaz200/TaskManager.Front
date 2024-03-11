import { Outlet, useNavigate } from "react-router-dom"
import NavBar from '../Components/NavBar'
import { useEffect } from "react"

function Dashboard() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    },[])
    return (
        <>
            <NavBar />
            <div className='pt-14 w-full h-screen'>
                <Outlet />
            </div>
        </>
    )
}

export default Dashboard