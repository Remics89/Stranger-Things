const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/";

export async function fetchPosts() {
    try {
        const response = await fetch(`${BASEURL}posts`);
        const data = await response.json();
        console.log("🚀 ~ fetchPosts ~ data", data)
        
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function registerUser(username, password) {
    await fetch(`${BASEURL}users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: {
                username,
                password,
            },
        }),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log("🚀 ~ .then ~ result", result)
            return result;
        })
        .catch(console.error);
}

export async function createPost () {

}

export async function deletePost () {

}

export async function userLogin (username, password) {
    await fetch(`${BASEURL}users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user:{
                username,
                password
            }
        })
    }).then(response => response.json())
    .then(result => {
        console.log("🚀 ~ userLogin ~ result", result)
        return result;
    })
    .catch(console.error);
}