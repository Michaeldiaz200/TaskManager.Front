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
            .then(dataLogin =>{
                if(dataLogin.token){
                    localStorage.setItem("token",dataLogin.token)
                    navigate("/dashboard")
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <form>
                <div className="flex flex-col">
                    <div>
                        <label>Correo</label>
                        <input {...register("email")} type="email"></input>
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input {...register("pass")} type="password"></input>
                    </div>
                </div>
                <button onClick={handleSubmit(handleLogin)}>Login</button>
            </form>
        </>
    )
}

export default Login