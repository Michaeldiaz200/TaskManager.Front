import { Outlet } from "react-router-dom"
import NavBar from '../Components/NavBar'

function Dashboard() {
    return (
        <>
            <NavBar />
            <div className='pt-14'>
                <Outlet />
            </div>
        </>
    )
}

export default Dashboard