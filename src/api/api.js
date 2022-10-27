const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/";

export async function fetchPosts() {
    try {
        const response = await fetch(`${BASEURL}posts`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
    }
}

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
