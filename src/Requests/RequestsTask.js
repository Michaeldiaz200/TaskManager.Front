import back from "./url_back"
const newTask = async (data)=>{
    try {
        const response = await fetch(`${back}/new-task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return response
    } catch (error) {
        console.log("Entre por aca")
        return error
    }
}

const readTask = async (idUser)=>{
    try {
        const response = await fetch(`${back}/get-Task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: idUser})
        })
        return response
    } catch (error) {
        console.log("Entre por aca")
        return error
    }
}

const updateTask = async (update)=>{
    console.log(update)
    try {
        const response = await fetch(`${back}/update-task`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
        })
        return response
    } catch (error) {
        return error
    }
}

export {
    newTask,
    readTask,
    updateTask
}