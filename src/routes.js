import { createBrowserRouter} from "react-router-dom"
import Login from './Pages/Login'
import SingUp from "./Pages/SingUp"
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard"
import Task from "./Layout/Task"
import NewTask from "./Layout/NewTask"
import Profile from "./Layout/Profile"

const router = createBrowserRouter([
	{
		path: "/",
		Component: Home
	},
	{
		path: "/login",
		Component: Login
	},
	{
		path: "/singup",
		Component: SingUp
	},
	{
		path: "/dashboard",
		Component: Dashboard,
		children: [
			{
				path: "/dashboard",
				Component: Task,
			},
			{
				path: "/dashboard/profile",
				Component: Profile
			}
		]
	},
	{
		path: "/task",
		Component: NewTask
	}
])

export default router