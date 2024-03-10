const back = "https://backtaskmanager.onrender.com"
const singup = async (data) => {
    console.log(data)
    try {
        console.log("No, entre aca")
        const response = await fetch(`${back}/singup`, {
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

const login = async (data)=>{
    console.log(data)
    try {
        console.log("No, entre aca")
        const response = await fetch(`${back}/login`, {
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

const infoUser = async (token)=>{
    try {
        console.log("No, entre aca")
        const response = await fetch(`${back}/infoUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
        })

        return response
    } catch (error) {
        console.log("Entre por aca")
        return error
    }
}

export {
    singup,
    login,
    infoUser
}