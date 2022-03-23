import {getProfile} from '../../requests/get-profile';
import {expect} from 'chai';

require('dotenv').config();

describe('POST /api/user/profile', () => {
    it('gets user porfile with json web token', async () => {        
        let response = await getProfile();

        expect(response.status).to.equal(200);
    });

    it('fails when provided token is invalid', async () => {        
        let response = await getProfile("some text");

        expect(response.status).to.equal(401);
    });
});