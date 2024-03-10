import { Navigate, createBrowserRouter} from "react-router-dom"
import Login from './Pages/Login'
import SingUp from "./Pages/SingUp"
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard"
import Task from "./Layout/Task"
import NewTask from "./Layout/NewTask"

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
		]
	},
	{
		path: "/task",
		Component: NewTask
	}
])

export default router