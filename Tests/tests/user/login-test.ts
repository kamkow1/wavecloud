import {getJwt} from '../../requests/get-jwt';
import {expect} from 'chai';

require('dotenv').config();

describe('POST /api/user/login', () => {
    it('sends user credentials and logs into an account', async () => {        
        let response = await getJwt();
        let token = response.data.token;

        expect(response.status).to.equal(200);
        expect(token.length).to.greaterThan(0);
    });
});