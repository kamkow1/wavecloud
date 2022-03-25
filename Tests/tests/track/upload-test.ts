import {sendFile} from '../../requests/send-file';
import {expect} from 'chai';

require('dotenv').config();

describe('POST /api/track/upload', () => {
    it('uploads file to cloud storage', async () => {        
        let response = await sendFile();

        expect(response.status).to.equal(204);
    });
});