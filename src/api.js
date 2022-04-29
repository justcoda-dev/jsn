const URL = "http://localhost:5000/api/superhero"

const request = async (uri, options) => {
    const response = await fetch(`${URL}/${uri ? uri : ""}`, options)
    return response.json()
}

request.get = {
    superHeroes: async () => {
        return await request()
    },
    oneSuperHero: async (id) => {
        return await request(id)
    },
}

request.post = {
    createSuperHero: async (data) => {
        console.log(`API data send`, data)
        return await request("", {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify(data)
        })
    },
}

request.path = {
    updateSuperHero: async (data) => {
        console.log(data)
        return await request("", {
            "method": "PATCH",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify(data)
        })
    },
}

request.delete = {
    deleteSuperHero: async (id) => {
        return await request(id, {
            "method": "DELETE",
        })
    },
    deleteImages: async (pathsArr) => {
        console.log(pathsArr)
        return await request("images", {
            "method": "DELETE",
            body: JSON.stringify(pathsArr)
        })
    }
}

request.upload = {
    uploadSuperHeroImg: async (data) => {
        return await request("image", {
            "method": "POST",
            "body": data
        })
    }
}
export default request;