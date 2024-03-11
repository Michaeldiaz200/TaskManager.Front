import back from "./url_back"

const createTag = async (data)=>{
    try {
        const response = await fetch(`${back}/create-tag`, {
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

const readTag = async (userId)=>{
    console.log(userId)
    try {
        const response = await fetch(`${back}/read-tag`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userId)
        })
        return response
    } catch (error) {
        console.log("Entre por aca")
        return error
    }
}

export {
    createTag,
    readTag
}