import { useState } from "react"
import { useNavigate } from "react-router-dom"

function NavBar() {
    const navigate = useNavigate()
    const [disable, setDisable] = useState(false)
    const token = localStorage.getItem("token")

    const handleDisable = ()=>{
        if(disable){
            setDisable(false)
        }else{
            setDisable(true)
        }
    }

    const handleCerrarSesion = ()=>{
        localStorage.clear()
        navigate("/login")
    }
    return (
        <>
            <div className='w-full bg-yellow-500 h-14 fixed flex justify-between items-center z-50 px-3'>
                <div className='w-32'>
                    <img src='/images/logo_2.png' className=''></img>
                </div>
                {
                    token ? (
                        <>
                            <div>
                                <button onClick={handleDisable} className="border border-black rounded-full py-1"><img src="/images/account-w.png" /></button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex justify-end w-full gap-5'>
                                <button className='border border-white py-1 text-white px-5 w-24 rounded-lg' onClick={() => navigate("/login")}>Login</button>
                                <button className='border border-white py-1 text-white px-5 w-24 rounded-lg' onClick={() => navigate("/singup")}>SingUp</button>
                            </div>
                        </>
                    )
                }
                {
                    disable ? (<>
                        <div className="fixed content-between w-1/5 h-96  top-14 right-0 border border-black bg-white">
                            <div className="h-full flex flex-col content-between justify-between">
                                <div className="flex justify-center">
                                    <button onClick={()=>{navigate("/dashboard/profile")}}>Perfil</button>
                                </div>
                                <div>
                                    <button onClick={()=>{navigate("/dashboard")}}>Dashboard</button>
                                </div>
                                <div className="flex justify-center">
                                    <button onClick={handleCerrarSesion}>Cerrar Sesion</button>
                                </div>
                            </div>
                        </div>
                    </>) : (<></>)
                }
            </div>
        </>
    )
}

export default NavBar