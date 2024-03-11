import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { infoUser, updateUser } from '../Requests/RequestsUser'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({})

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }else{
            infoUser(localStorage.getItem("token"))
            .then(res => res.json())
            .then(dataUser => setUser(dataUser.user))
            .catch(err => console.log(err))
        }
    }, [])
    const {
        register,
        handleSubmit,
        formState: {
            isValid
        }
    } = useForm({
        defaultValues: {
            email: user.email,
            pass: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
        }
    })

    const handleUpdateUser = (data) => {
        data.id = user.id
        for (const key in data) {
            if (data[key] === "") {
                data[key] = user[key]
            }
        }
        updateUser(data)
            .then(res => res.json())
            .then(dataUser => {
                console.log(dataUser.user)
                if (dataUser.user[0] === 1) {
                    alert("Datos Acualizados Correctamente")
                } else {
                    alert("ha ocurrido un erro")
                }
                console.log(dataUser)
            })
    }
    return (
        <>
            <div className='w-full h-full flex justify-center items-center'>
                <div className='w-4/5 h-3/4 border border-black gap-3 p-3 flex flex-col justify-center items-center'>
                    <div>
                        <h3>Datos Actuales</h3>
                    </div>
                    <div className="flex flex-col w-2/5">
                        <label>Nombre</label>
                        <input type="text" value={`${user.firstName}`} className="border border-black rounded-lg h-8 p-1"></input>
                    </div>
                    <div className="flex flex-col w-2/5">
                        <label>Apellido</label>
                        <input type="text" value={`${user.lastName}`} className="border border-black rounded-lg h-8 p-1"></input>
                    </div>
                    <div className="flex flex-col w-2/5">
                        <label>Correo</label>
                        <input type="text" value={`${user.email}`} className="border border-black rounded-lg h-8 p-1"></input>
                    </div>
                </div>
                <div className='w-4/5 border h-3/4 border-black gap-3 p-3 flex flex-col justify-center items-center'>
                    <div>
                        <h3 className='font-semibold'>Nuevos Datos</h3>
                    </div>
                    <div className="flex flex-col w-2/5">
                        <label>Nombre</label>
                        <input type="text" {...register('firstName')} className="border border-black rounded-lg h-8 p-1"></input>
                    </div>
                    <div className="flex flex-col w-2/5">
                        <label>Apellido</label>
                        <input type="text" {...register('lastName')} className="border border-black rounded-lg h-8 p-1"></input>
                    </div>
                    <div className="flex flex-col w-2/5">
                        <label>Correo</label>
                        <input type="text" {...register('email')} className="border border-black rounded-lg h-8 p-1"></input>
                    </div>
                    <div className="flex flex-col w-2/5">
                        <label>Nueva Contraseña</label>
                        <input type="text" {...register('pass')} className="border border-black rounded-lg h-8 p-1"></input>
                    </div>
                    <div>
                        <button onClick={handleSubmit(handleUpdateUser)} className='border border-black rounded-lg py-2 px-2'>Actualizar informacion</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile