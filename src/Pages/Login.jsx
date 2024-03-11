import { useForm } from "react-hook-form"
import { login } from "../Requests/RequestsUser"
import { useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {
            isValid
        }
    } = useForm({
        defaultValues: {
            email: "",
            pass: "",
        }
    })

    const handleLogin = (data) => {
        login(data)
            .then(res => res.json())
            .then(dataLogin => {
                if (dataLogin.token) {
                    localStorage.setItem("token", dataLogin.token)
                    navigate("/dashboard")
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <form>
                <div className="w-full h-screen flex justify-center items-center bg-yellow-500">
                    <div className=" w-4/12 h-4/5 border border-black rounded-2xl flex flex-col items-center justify-center gap-7 bg-purple-700">
                        <div className="w-48">
                            <img src="./images/logo_2.png" />
                        </div>
                        <div className="flex flex-col gap-5 w-full items-center">
                            <div className="flex flex-col w-3/5">
                                <label className="text-white">Correo</label>
                                <input {...register("email")} type="email" className="border border-black rounded-lg h-8 p-1"></input>
                            </div>
                            <div className="flex flex-col w-3/5">
                                <label className="text-white">Contraseña</label>
                                <input {...register("pass")} type="password" className="border border-black rounded-lg h-8 p-1"></input>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <button className="border border-yellow-800 rounded-xl w-24 py-2 bg-yellow-500" onClick={handleSubmit(handleLogin)}>Login</button>
                            <a href="/singup" className="text-yellow-300">Sing Up</a>
                        </div>
                    </div>
                </div>

            </form>
        </>
    )
}

export default Login