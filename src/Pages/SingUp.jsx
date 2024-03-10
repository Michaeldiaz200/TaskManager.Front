import { useForm } from "react-hook-form"
import { singup } from "../Requests/RequestsUser"
import validator from "validator"
import { useNavigate } from "react-router-dom"

function SingUp() {
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
                <div className="flex flex-col">
                    <div className="flex gap-3">
                        <label>Nombre</label>
                        <input {...register("firstName")} type="text" className="border-b border-red-600 outline-none" ></input>
                    </div>
                    <div className="flex gap-3">
                        <label>Apellido</label>
                        <input {...register("lastName")} type="text" className="border-b border-red-600"></input>
                    </div>
                    <div className="flex gap-3">
                        <label>Correo</label>
                        <input {...register("email")} type="email" required className="border-b border-red-600"></input>
                    </div>
                    <div className="flex gap-3">
                        <label>Contraseña</label>
                        <input {...register("pass")} type="password" ></input>
                    </div>
                </div>
                <button type="button" onClick={handleSubmit(handleSing)}>SingUp</button>
            </form>
        </>
    )
}

export default SingUp