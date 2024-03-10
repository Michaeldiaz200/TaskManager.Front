const singup = async (data) => {
    console.log(data)
    try {
        console.log("No, entre aca")
        const response = await fetch("http://localhost:4000/singup", {
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
        const response = await fetch("http://localhost:4000/login", {
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
        const response = await fetch("http://localhost:4000/infoUser", {
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