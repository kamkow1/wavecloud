import axios from "axios";

export async function getJwt() {
    let response = await axios.post('https://localhost:7040/api/user/login', JSON.parse('../test-user-credentials.json'));

    return response;
}