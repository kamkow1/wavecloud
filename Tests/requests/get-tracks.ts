import axios from "axios";
import { getJwt } from "./get-jwt";

export async function getTracks() {
    let jwtResult = await getJwt();
    let token = jwtResult.data.token;

    let response = await axios({
        method: 'get',
        url: 'https://localhost:7040/api/user/tracks?userId=1',
        headers: {
            Authorization: 'Bearer ' + token
        },
        validateStatus: () => true
    });

    return response;
}