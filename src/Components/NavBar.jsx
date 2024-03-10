import { useNavigate } from "react-router-dom"

function NavBar() {
    const navigate = useNavigate()
    return (
        <>
            <div className='w-full bg-yellow-600 h-14 fixed flex justify-between items-center z-50 px-3'>
                <div className='w-32'>
                    <img src='./images/logo_2.png' className=''></img>
                </div>
                <div className='flex justify-end w-full gap-5'>
                    <button className='border border-white py-1 text-white px-5 w-24 rounded-lg' onClick={()=>navigate("/login")}>Login</button>
                    <button className='border border-white py-1 text-white px-5 w-24 rounded-lg' onClick={()=>navigate("/singup")}>SingUp</button>
                </div>
                <div>
                    <img></img>
                </div>
            </div>
        </>
    )
}

export default NavBar