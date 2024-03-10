import { useEffect, useState } from 'react'
import NewTask from './NewTask'
import { readTask} from '../Requests/RequestsTask'
import { infoUser } from '../Requests/RequestsUser'
import { differenceInDays, differenceInHours } from 'date-fns';

function Task() {
    const [tasks, setTasks] = useState([])
    const [validateNewTask, setValidateNewTask] = useState(false)
    const [stateTask, setStateTask] = useState(["Completada", "En Progreso", "Pendiente"])

    useEffect(() => {
        infoUser(localStorage.getItem("token"))
            .then(res => res.json())
            .then(dataUser => {
                readTask(dataUser.user.id)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setTasks(data.task)
                    })
                    .catch(err => console.log(err))
            })
            .catch()
    }, [])

    console.log(tasks)
    const handleDisplay = (disp) => {
        setValidateNewTask(disp)
        document.body.style.overflow = "auto"
    }
    const handleNewTask = () => {
        setValidateNewTask(true)
        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "visible"
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
                                <div className='w-full flex flex-wrap flex-grow-0 gap-5 justify-center py-5'>
                                    {
                                        tasks.map((task, index) => {
                                            if (task.state === "Pendiente") {
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
                                                                    <span className='text-red-500'>vence en: <br></br>{
                                                                        task?.dateEnd ? (
                                                                            `${differenceInDays(new Date(task?.dateEnd), new Date())} dias y ${differenceInHours(new Date(task?.dateEnd), new Date()) % 24} horas`
                                                                        ) : (
                                                                            "Sin fecha"
                                                                        )
                                                                    } </span>
                                                                </div>
                                                                <div>
                                                                    <select>
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
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col items-center border-x border-black'>
                                <h3 className='border border-yellow-500 rounded-lg w-1/2 text-center'>En progreso</h3>
                                <div className='w-full flex flex-wrap flex-grow-0 gap-5 justify-center py-5'>
                                    {
                                        tasks.map((task, index) => {
                                            if (task.state === "Pendiente") {
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
                                                                    <span className='text-red-500'>vence en: <br></br>{
                                                                        task?.dateEnd ? (
                                                                            `${differenceInDays(new Date(task?.dateEnd), new Date())} dias y ${differenceInHours(new Date(task?.dateEnd), new Date()) % 24} horas`
                                                                        ) : (
                                                                            "Sin fecha"
                                                                        )
                                                                    } </span>
                                                                </div>
                                                                <div>
                                                                    <select>
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
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col items-center border-x border-black'>
                                <h3 className='border border-green-600 rounded-lg w-1/2 text-center'>Completada</h3>
                                <div className='w-full flex flex-wrap flex-grow-0 gap-5 justify-center py-5'>
                                    {
                                        tasks.map((task, index) => {
                                            if (task.state === "Pendiente") {
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
                                                                    <span className='text-red-500'>vence en: <br></br>{
                                                                        task?.dateEnd ? (
                                                                            `${differenceInDays(new Date(task?.dateEnd), new Date())} dias y ${differenceInHours(new Date(task?.dateEnd), new Date()) % 24} horas`
                                                                        ) : (
                                                                            "Sin fecha"
                                                                        )
                                                                    }
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <select>
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
                                            }
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
