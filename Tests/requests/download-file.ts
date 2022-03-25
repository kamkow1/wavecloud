import axios from "axios";
import { getJwt } from "./get-jwt";
import fs from 'fs';

export async function downloadFile() {
    let jwtResult = await getJwt();
    let token = jwtResult.data.token;
      
    let response = await axios({
        method: 'get',
        url: 'https://localhost:7040/api/track/download?trackId=3',
        headers: { 
        'Authorization': 'Bearer ' + token
        }
    });

    fs.writeFileSync(`${__dirname}/test-files/download.mp3`, response.data);

    return response;
}