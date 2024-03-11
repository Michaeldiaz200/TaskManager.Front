import { useEffect, useState } from 'react'
import NewTask from './NewTask'
import { readTask, updateTask } from '../Requests/RequestsTask'
import { infoUser } from '../Requests/RequestsUser'
import { differenceInDays, differenceInHours } from 'date-fns';
import { readTag } from '../Requests/RequestsTag';

function Task() {
    const [validateNewTask, setValidateNewTask] = useState(false)
    const [stateTask,] = useState(["Completada", "En Progreso", "Pendiente"])
    const [tags, setTags] = useState([])
    const [tagPendiente, setTagPendiente] = useState([])
    const [tagEnProgreso, setTagEnProgreso] = useState([])
    const [tagCompletada, setTagCompletada] = useState([])
    const [taskPendiente, setTaskPendiente] = useState([])
    const [taskEnProgreso, setTaskEnProgreso] = useState([])
    const [taskCompleta, setTaskCompleta] = useState([])

    useEffect(() => {
        infoUser(localStorage.getItem("token"))
            .then(res => res.json())
            .then(dataUser => {
                readTag({ userId: dataUser.user.id })
                    .then(res => res.json())
                    .then(dataTags => {
                        setTags(dataTags.tag)
                        console.log(dataTags)
                    })
                    .catch(err => console.log(err))

                readTask(dataUser.user.id)
                    .then(res => res.json())
                    .then(data => {
                        data.task.map(task => {
                            if (task.state === "Pendiente") {
                                setTaskPendiente(prev => {
                                    if (!prev.some(prevTask => prevTask.id === task.id)) {
                                        return [...prev, task];
                                    }
                                    return prev
                                })
                            } else {
                                if (task.state === "En Progreso") {
                                    setTaskEnProgreso(prev => {
                                        if (!prev.some(prevTask => prevTask.id === task.id)) {
                                            return [...prev, task];
                                        }
                                        return prev
                                    })
                                } else {
                                    if (task.state === "Completada") {
                                        setTaskCompleta(prev => {
                                            if (!prev.some(prevTask => prevTask.id === task.id)) {
                                                return [...prev, task];
                                            }
                                            return prev
                                        })
                                    }
                                }
                            }
                        })
                        data.task.map(task => {
                            if (task.state === "Pendiente") {
                                setTagPendiente(prev => {
                                    if (!prev.some(prevTask => prevTask.id === task.id)) {
                                        return [...prev, task];
                                    }
                                    return prev
                                })
                            } else {
                                if (task.state === "En Progreso") {
                                    setTagEnProgreso(prev => {
                                        if (!prev.some(prevTask => prevTask.id === task.id)) {
                                            return [...prev, task];
                                        }
                                        return prev
                                    })
                                } else {
                                    if (task.state === "Completada") {
                                        setTagCompletada(prev => {
                                            if (!prev.some(prevTask => prevTask.id === task.id)) {
                                                return [...prev, task];
                                            }
                                            return prev
                                        })
                                    }
                                }
                            }
                        })
                    })
                    .catch(err => console.log(err))
            })
            .catch()
    }, [])

    const handleDisplay = (disp) => {
        setValidateNewTask(disp)
        document.body.style.overflow = "auto"
        window.location.reload()
    }
    const handleNewTask = () => {
        setValidateNewTask(true)
        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "visible"
    }

    const handleStateTask = (event, remove) => {
        const option = event.target.options[event.target.selectedIndex]
        var set
        if (option.value === "Pendiente") {
            set = setTagPendiente
        } else {
            if (option.value === "En Progreso") {
                set = setTagEnProgreso
            } else {
                if (option.value === "Completada") {
                    set = setTagCompletada
                }
            }
        }
        updateTask({ id: option.id, state: option.value })
            .then(res => res.json())
            .then(dataUpdate => {
                if (dataUpdate.message === "ok") {
                    const elem = remove.filter(obj => obj.id === option.id)
                    elem[0].state = option.value
                    console.log(elem)
                    set(prev => [...prev, elem])
                    window.location.reload()
                }
            })
            .catch(err => console.log(err))
    }

    const handleFilterTag = (event) => {
        const option = event.target.options[event.target.selectedIndex]
        if (event.target.id === "selPendiente") {
            setTagPendiente(option.id === "opPendiente" ? (taskPendiente) : (taskPendiente.filter(task => task.TagId === option.id)))
        } else {
            if (event.target.id === "selEnProgreso") {
                setTagEnProgreso(option.id === "opEnProgreso" ? (taskEnProgreso) : (taskEnProgreso.filter(task => task.TagId === option.id)))
            } else {
                if (event.target.id === "selCompletada") {
                    setTagCompletada(option.id === "opCompletada" ? (taskCompleta) : (taskCompleta.filter(task => task.TagId === option.id)))
                }
            }
        }
    }
    return (
        <>
            <section className='pt-2 px-2 flex flex-col justify-center items-center gap-5 relative'>
                <div className='w-full flex justify-center items-center z-20 bg-white'>
                    <div className='w-full flex justify-center items-center'>
                        <button className='py-1 w-1/5 px-3 rounded-full bg-purple-700 text-white' onClick={handleNewTask}>Nueva Tarea</button>
                    </div>
                </div>
                <div className='w-full h-full flex flex-grow-0 justify-center relative'>
                    {
                        validateNewTask ? (<>
                            <div className='fixed w-full h-full bg-gray-200 opacity-60'></div>
                            <NewTask display={(disp) => { handleDisplay(disp) }} />
                        </>) : (<></>)
                    }
                    <div className='flex flex-grow-0 py-5 w-full justify-center overflow-y-visible'>
                        <div className='w-full flex justify-evenly'>
                            <div className='w-1/3 flex flex-col items-center border-x border-black'>
                                <h3 className='border border-purple-700 rounded-lg w-1/2 text-center'>Pendiente</h3>
                                <div>
                                    <select id='selPendiente' onChange={handleFilterTag}>
                                        <option id='opPendiente' selected>Categoria</option>
                                        {
                                            tags.map((tag, index) => {
                                                return (<option key={index} id={`${tag.id}`}>{tag.nameTag}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='w-full flex flex-wrap flex-grow-0 gap-5 justify-center py-5'>
                                    {

                                        tagPendiente.map((task, index) => {
                                            return (
                                                <>
                                                    <div key={index} className=' p-2 border border-gray-300 flex flex-col gap-2 justify-between w-[45%] h-44 rounded-lg'>
                                                        <div>
                                                            <h2 className='text-base font-semibold'>{task?.title}</h2>
                                                        </div>
                                                        <div className='flex items-start h-full'>
                                                            <p>{task?.description}</p>
                                                        </div>
                                                        <div className='flex flex-col justify-between items-center'>
                                                            <div>
                                                                <span className='text-red-500 flex gap-2'><img src='./images/expire.png' />{
                                                                    task?.dateEnd ? (
                                                                        `${differenceInDays(new Date(task?.dateEnd), new Date())} dias y ${differenceInHours(new Date(task?.dateEnd), new Date()) % 24} horas`
                                                                    ) : (
                                                                        "Sin fecha"
                                                                    )
                                                                } </span>
                                                            </div>
                                                            <div>
                                                                <select onChange={(e) => handleStateTask(e, tagPendiente)}>
                                                                    <option>{task?.state}</option>
                                                                    {
                                                                        stateTask.map((statetask, index) => {
                                                                            if (statetask !== task.state) {
                                                                                return (<option key={index} id={`${task?.id}`}>{statetask}</option>)
                                                                            }
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col items-center border-x border-black'>
                                <h3 className='border border-yellow-500 rounded-lg w-1/2 text-center'>En progreso</h3>
                                <div>
                                    <select id='selEnProgreso' onChange={handleFilterTag}>
                                        <option id='opEnProgreso' selected>Categoria</option>
                                        {
                                            tags.map((tag, index) => {
                                                return (<option key={index} id={`${tag.id}`}>{tag.nameTag}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='w-full flex flex-wrap flex-grow-0 gap-5 justify-center py-5'>
                                    {
                                        tagEnProgreso.map((task, index) => {

                                            return (
                                                <>
                                                    <div key={index} className=' p-2 border border-gray-300 flex flex-col gap-2 justify-between w-[45%] h-44 rounded-lg'>
                                                        <div>
                                                            <h2 className='text-base font-semibold'>{task?.title}</h2>
                                                        </div>
                                                        <div className='flex items-start h-full'>
                                                            <p>{task?.description}</p>
                                                        </div>
                                                        <div className='flex flex-col justify-between items-center'>
                                                            <div>
                                                                <span className='text-red-500 flex gap-2'><img src='./images/expire.png' />{
                                                                    task?.dateEnd ? (
                                                                        `${differenceInDays(new Date(task?.dateEnd), new Date())} dias y ${differenceInHours(new Date(task?.dateEnd), new Date()) % 24} horas`
                                                                    ) : (
                                                                        "Sin fecha"
                                                                    )
                                                                } </span>
                                                            </div>
                                                            <div>
                                                                <select onChange={(e) => handleStateTask(e, tagEnProgreso)}>
                                                                    <option>{task?.state}</option>
                                                                    {
                                                                        stateTask.map((statetask, index) => {
                                                                            if (statetask !== task.state) {
                                                                                return (<option key={index} id={`${task?.id}`}>{statetask}</option>)
                                                                            }
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col items-center border-x border-black'>
                                <h3 className='border border-green-600 rounded-lg w-1/2 text-center'>Completada</h3>
                                <div>
                                    <select id='selCompletada' onChange={handleFilterTag}>
                                        <option id='opCompletada' selected>Categoria</option>
                                        {
                                            tags.map((tag, index) => {
                                                return (<option key={index} id={`${tag.id}`}>{tag.nameTag}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='w-full flex flex-wrap flex-grow-0 gap-5 justify-center py-5'>
                                    {
                                        tagCompletada.map((task, index) => {
                                            return (
                                                <>
                                                    <div key={index} className=' p-2 border border-gray-300 flex flex-col gap-2 justify-between w-[45%] h-44 rounded-lg'>
                                                        <div>
                                                            <h2 className='text-base font-semibold'>{task?.title}</h2>
                                                        </div>
                                                        <div className='flex items-start h-full'>
                                                            <p>{task?.description}</p>
                                                        </div>
                                                        <div className='flex flex-col justify-between items-center'>
                                                            <div>
                                                                <span className='text-red-500 flex gap-2'><img src='./images/expire.png' />{
                                                                    task?.dateEnd ? (
                                                                        `${differenceInDays(new Date(task?.dateEnd), new Date())} dias y ${differenceInHours(new Date(task?.dateEnd), new Date()) % 24} horas`
                                                                    ) : (
                                                                        "Sin fecha"
                                                                    )
                                                                }
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <select onChange={(e) => handleStateTask(e, tagCompletada)}>
                                                                    <option>{task?.state}</option>
                                                                    {
                                                                        stateTask.map((statetask, index) => {
                                                                            if (statetask !== task.state) {
                                                                                return (<option key={index} id={`${task?.id}`}>{statetask}</option>)
                                                                            }
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Task
