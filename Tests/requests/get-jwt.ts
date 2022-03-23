import axios, { AxiosResponse } from "axios";
import fs from 'fs';

export async function getJwt() {
    let response = await axios.post(
        'https://localhost:7040/api/user/login', 
        JSON.parse(fs.readFileSync('test-user-credentials.json', 'utf-8'))
    );

    return response;
}