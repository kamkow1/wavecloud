import { expect } from "chai";
import { downloadFile } from "../../requests/download-file";
import fs from 'fs';

describe('GET /api/track/download', () => {
    it('downloads a track from api', async () => {
        let response = await downloadFile();

        expect(response.status).to.eq(200);
    });
});