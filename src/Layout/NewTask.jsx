import { useState } from 'react'
import { useForm } from "react-hook-form"
import { newTask } from '../Requests/RequestsTask'
import { infoUser } from '../Requests/RequestsUser'

function NewTask({ display }) {

  const [disableDate, setDisableDate] = useState("pointer-events-none opacity-50")
  const [disableTag, setDisableTag] = useState("pointer-events-none opacity-50")
  const [tag, setTag] = useState([])

  const {
    register,
    handleSubmit,
    formState: {
      isValid
    },
    setValue
  } = useForm({
    defaultValues: {
      id: "",
      title: "",
      description: "",
      dateEnd: null,
      state: "Pendiente"
    }
  })

  const handleTask = (data) => {
    if (display === "") {
      setValue('dateEnd', new Date(data.dateEnd).toISOString())
      if (new Date(data.dateEnd).getTime() < new Date().getTime()) {
        alert("La fecha no puede ser menor a la del dia de hoy")
      } else {
        infoUser(localStorage.getItem("token"))
          .then(res => res.json())
          .then(dataUser => {
            if (dataUser.message === "OK") {
              console.log(dataUser)
              setValue('id', dataUser.user.id)
              newTask(data)
                .then(res => res.json())
                .then(dataTask => console.log(dataTask))
                .catch(err => console.log(err))

            } else {
              console.log(dataUser)
              alert(dataUser.message)
            }
          })
          .catch()
      }
    } else {
      infoUser(localStorage.getItem("token"))
        .then(res => res.json())
        .then(dataUser => {
          if (dataUser.message === "OK") {
            data.id = dataUser.user.id
            newTask(data)
              .then(res => res.json())
              .then(dataTask => console.log(dataTask))
              .catch(err => console.log(err))

          } else {
            console.log(dataUser)
            alert(dataUser.message)
          }
        })
        .catch()
    }
  }

  const handleClose = () => {
    display(false)
  }
  const handleDateEnd = (event) => {
    if (event.target.checked) {
      setDisableDate("")
    } else {
      setDisableDate("pointer-events-none opacity-50")
    }
  }

  const handleKey = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value
      setTag((prev) => [...prev, value])
      event.target.value = ""
    }
  }

  const handleDeleteTag = (event) => {
    const container = event.target.parentElement.parentElement
    const parent = event.target.parentElement
    const index = Number(event.target.parentElement.getAttribute("data-id"))
    tag.splice(index, 1)
    container.removeChild(parent)
  }

  const handleTag = (event)=>{
    if (event.target.checked) {
      setDisableTag("")
    } else {
      setDisableTag("pointer-events-none opacity-50")
    }
  }
  return (
    <>
      <section className='w-full flex py-5 justify-center items-center absolute z-10'>
        <form className='w-full flex justify-center items-center '>
          <div className='py-3 px-5 gap-3 w-3/6 flex flex-col justify-center items-center border border-black rounded-lg bg-white'>
            <div className='flex flex-col w-full'>
              <div className='w-full flex justify-end'>
                <button type='button' onClick={handleClose}>X</button>
              </div>
              <div className='w-full flex justify-center'>
                <div>Nueva Tarea</div>
              </div>
            </div>
            <div className='flex flex-col w-full gap-3'>
              <input placeholder='Titulo' {...register('title')} className='outline-none'></input>
              <div className=''>
                <textarea {...register('description')} placeholder='Descipcion' className='resize-none w-full h-28 overflow-y-visible outline-none'></textarea>
              </div>
            </div>
            <hr className='w-full'></hr>
            <div className='w-full flex justify-evenly'>
              <div>
                <div className='flex gap-2'>
                  <input type='checkbox' onChange={handleDateEnd}></input>
                  <label>Fecha de venciomiento</label>
                </div>
                <div className={`${disableDate}`}>
                  <input type='datetime-local' {...register('dateEnd')}></input>
                </div>
              </div>
              <div>
                <div>
                  <input type='checkbox' onChange={handleTag}></input>
                  <label>Añadir Categorias</label>
                </div>
                <div className={`flex flex-col gap-1 ${disableTag}`}>
                  <div className='flex items-center gap-2'>
                    <label>Categoria</label>
                    <input type='text' className='border-b border-black outline-none px-1' onKeyDown={handleKey}></input>
                  </div>
                  <div>
                    <p className='text-xs'>Precione &quot;Enter&quot; para agregar otra Categoria </p>
                  </div>
                  <div className='w-full h-20 overflow-hidden overflow-y-scroll p-2 flex flex-wrap gap-2 border border-black mt-3 rounded-lg'>
                    {
                      tag.map((elemen, index) => {
                        return (<p data-id={index} key={index} className='text-sm px-1 h-6 bg-blue-200 border border-blue-800 rounded-lg'>{elemen} <button type='button' onClick={handleDeleteTag} className='rounded-full text-xs h-5 w-5'>X</button></p>)
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            <button type='button' className='border border-gray-300 p-2 rounded-lg' onClick={handleSubmit(handleTask)}>Crear Tarea</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTask