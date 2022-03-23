import axios from "axios";
import { getJwt } from "./get-jwt";
import fs from 'fs';

export async function getProfile() {
    let jwtResult = await getJwt();
    let token = jwtResult.data.token;

    let response = await axios.post('https://localhost:7040/api/user/profile', {
        username: JSON.parse(fs.readFileSync('test-user-credentials.json', 'utf-8')).username
    }, { 
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    return response;
}