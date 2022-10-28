const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/";

/*  Function calling all the posts available    */

export async function fetchPosts() {
    try {
        const response = await fetch(`${BASEURL}posts`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
    }
}

/*  Function defining a user registering for an account    */

export const registerUser = async (username, password) => {
    try {
        const response = await fetch(`${BASEURL}users/register`, {
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
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

/*  Function defining what user is currently logged in    */

export async function getUser(token) {
    try {
        const response = await fetch(`${BASEURL}users/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function createPost() {}

export async function deletePost() {}

/*  Function defining sending messages on a post    */

export async function sendMessage(postID, comment, token) {
    try {
        const response = await fetch(`${BASEURL}POSTS/${postID}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                message: {
                    content: comment,
                },
            }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

/*  Function defining a user logging in    */

export const userLogin = async (username, password) => {
    try {
        const response = await fetch(`${BASEURL}users/login`, {
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
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};
