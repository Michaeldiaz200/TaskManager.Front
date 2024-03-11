import { useForm } from "react-hook-form"
import { singup } from "../Requests/RequestsUser"
import validator from "validator"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function SingUp() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(()=>{
        if(token){
            navigate("/dashboard")
        }
    })
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
            firstName: "",
            lastName: "",
        }
    })

    const handleSing = (data) => {
        if (validator.isEmail(data.email)) {
            if (data.pass !== "" && data.pass.length >= 8) {
                if (data.firstName.length >= 3 && data.lastName.length >= 3) {
                    singup(data)
                        .then(res => res.json())
                        .then(dataSing => {
                            if (dataSing.token) {
                                localStorage.setItem("token", dataSing.token)
                                navigate("/dashboard")
                            } else {
                                alert("ha ocurrido un error inesperado")
                            }
                        })
                        .catch(err => alert("error: ", err))
                } else {
                    alert("Debe Proporcionar un nombre y apellido correcto")
                }
            } else {
                alert("Contraseña demasiado corta")
            }
        } else {
            alert("Formato del correo incorrecto")
        }

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
                                <label className="text-white">Nombre</label>
                                <input {...register("firstName")} type="text" className="border border-black rounded-lg h-8 p-1"></input>
                            </div>
                            <div className="flex flex-col w-3/5">
                                <label className="text-white">Apellido</label>
                                <input {...register("lastName")} type="text" className="border border-black rounded-lg h-8 p-1"></input>
                            </div>
                            <div className="flex flex-col w-3/5">
                                <label className="text-white">Correo</label>
                                <input {...register("email")} type="email" required className="border border-black rounded-lg h-8 p-1"></input>
                            </div>
                            <div className="flex flex-col w-3/5">
                                <label className="text-white">Contraseña</label>
                                <input {...register("pass")} type="password" className="border border-black rounded-lg h-8 p-1"></input>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <button type="button" onClick={handleSubmit(handleSing)} className="border border-yellow-800 rounded-xl w-24 py-2 bg-yellow-500">SingUp</button>
                                <a href="/login" className="text-yellow-300">Login</a>
                            </div>
                        </div>
                    </div>
                </div>

                
            </form>
        </>
    )
}

export default SingUp