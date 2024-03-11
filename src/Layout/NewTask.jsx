import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { newTask } from '../Requests/RequestsTask'
import { infoUser } from '../Requests/RequestsUser'
import { createTag, readTag } from '../Requests/RequestsTag'

function NewTask({ display }) {

  const [disableDate, setDisableDate] = useState("pointer-events-none opacity-50")
  const [disableSelTag, setDisableSelTag] = useState("pointer-events-none opacity-50")
  const [disableAddTag, setDisableAddTag] = useState("pointer-events-none opacity-50 flex")
  const [tag, setTag] = useState({})
  const [tags, setTags] = useState([])

  useEffect(() => {
    infoUser(localStorage.getItem("token"))
      .then(res => res.json())
      .then(dataUser => {
        readTag({ userId: dataUser.user.id })
          .then(res => res.json())
          .then(dataTask => {
            setTags(dataTask.tag)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [])

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
    if (disableDate === "") {
      setValue('dateEnd', new Date(data.dateEnd).toISOString())
      if (new Date(data.dateEnd).getTime() < new Date().getTime()) {
        alert("La fecha no puede ser menor a la del dia de hoy")
      } else {
        infoUser(localStorage.getItem("token"))
          .then(res => res.json())
          .then(dataUser => {
            if (dataUser.message === "OK") {
              console.log(dataUser)
              data.id = dataUser.user.id
              if (tag.id) {
                data.tagId = tag.id
                newTask(data)
                  .then(res => res.json())
                  .then(dataTask => console.log(dataTask))
                  .catch(err => console.log(err))
              } else {
                createTag({ userId: dataUser.user.id, name: tag.name })
                  .then(res => res.json())
                  .then(dataTag => {
                    data.tagId = dataTag.tag.id
                    newTask(data)
                      .then(res => res.json())
                      .then(dataTask => console.log(dataTask))
                      .catch(err => console.log(err))
                  })
                  .catch(err => console.log(err))
              }
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
            if (tag.id) {
              data.tagId = tag.id
              newTask(data)
                .then(res => res.json())
                .then(dataTask => console.log(dataTask))
                .catch(err => console.log(err))
            } else {
              createTag({ userId: dataUser.user.id, name: tag.name })
                .then(res => res.json())
                .then(dataTag => {
                  data.tagId = dataTag.tag.id
                  newTask(data)
                    .then(res => res.json())
                    .then(dataTask => console.log(dataTask))
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            }

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

  const handleSelTag = (event) => {
    if (event.target.checked) {
      setTag({})
      setDisableSelTag("")
    } else {
      setTag({})
      setDisableSelTag("pointer-events-none opacity-50")
    }
  }

  const handleAddTag = (event) => {
    if (event.target.checked) {
      setTag({})
      setDisableAddTag("flex")
    } else {
      setTag({})
      setDisableAddTag("pointer-events-none opacity-50")
    }
  }

  const handleTag = (event) => {

    if (event.target.tagName === "SELECT") {
      const option = event.target.options[event.target.selectedIndex]
      if (option.id !== "option-sel") {
        setTag({ id: option.id })
      }
    } else {
      setTag({
        ...tag,
        [event.target.id]: event.target.value
      })
    }
    console.log()
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
              <div className='flex flex-col gap-5'>
                <div>
                  <div>
                    <input type='checkbox' onChange={handleSelTag}></input>
                    <label>Seleccionar Categoria</label>
                  </div>
                  <div className={`${disableSelTag}`}>
                    <select onChange={handleTag}>
                      <option id='option-sel' selected>Seleccione La Categoria</option>
                      {
                        tags.map((element,index) =>{
                          return(<option key={index} id={`${element.id}`}>{element.nameTag}</option>)
                        })
                      }
                    </select>
                  </div>
                </div>
                <div>
                  <div>
                    <input type='checkbox' onChange={handleAddTag}></input>
                    <label>Añadir Categoria</label>
                  </div>
                  <div className={`${disableAddTag}`}>
                    <label>Categoria</label>
                    <input type='text' id='name' className='border-b border-black outline-none px-1' onChange={handleTag}></input>
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