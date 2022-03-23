import axios from "axios";
import { getJwt } from "./get-jwt";
import fs from 'fs';

export async function getProfile(errorTrigger: string = "") {
    let jwtResult = await getJwt();
    let token = jwtResult.data.token;

    let response = await axios({
        method: 'POST',
        url: 'https://localhost:7040/api/user/profile',
        data: {
            username: JSON.parse(fs.readFileSync('test-user-credentials.json', 'utf-8')).username
        },
        headers: { Authorization: 'Bearer ' + token + errorTrigger },
        validateStatus: () => true
    });

    return response;
}