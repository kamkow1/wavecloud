import axios from "axios";
import { getJwt } from "./get-jwt";
import FormData from "form-data";
import fs from 'fs'

export async function sendFile() {
    let jwtResult = await getJwt();
    let token = jwtResult.data.token;

    var data = new FormData();
    data.append('file', fs.createReadStream(`${__dirname}/test-files/audio.mp3`));

    let response = await axios({
        method: 'post',
        url: 'https://localhost:7040/api/track/upload?fileName=test title&userId=1',
        headers: { 
          'Authorization': 'Bearer ' + token, 
          ...data.getHeaders()
        },
        data : data
      });

    return response;
}