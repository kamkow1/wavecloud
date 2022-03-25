import { expect } from "chai";
import { getTracks } from "../../requests/get-tracks";

describe('GET /api/user/tracks', () => {
    it('gets a list of tracks for specific user', async () => {
        let response = await getTracks();
        let tracks = response.data;

        expect(response.status).to.equal(200);
    });
});