import { Deploy } from '../deploy';
import * as assert from 'assert';
import { CallTx } from '@hyperledger/burrow/proto/payload_pb';
import { MarmotCore } from '../contracts/CryptoMarmots';

function generate(): number {
    return parseInt((Math.random()*0xFFFFFF<<0).toString(16), 16);
}

const owner = '6114B452E3243131192DC7B13EB1418D9E10306B';
let contract: MarmotCore.Contract<CallTx>

before(async () => {
    contract = await Deploy(owner);
})

describe('CryptoMarmots', () => {
    it('Should create a new promo marmot', async () => {
        assert.equal(await contract.ceoAddress(), owner);
        assert.equal( await contract.cfoAddress(), owner);

        const genes = generate();
        await contract.createPromoMarmot(genes, owner);

        const tokens = await contract.tokensOfOwner(owner);
        assert.equal(tokens.ownerTokens.length, 1);
        assert.equal(tokens.ownerTokens[0], 1);

        const kitty = await contract.getMarmot(1);
        assert.equal(kitty.genes, genes);
    }).timeout(10000);

    it('Should birth a new marmot', async () => {
        await contract.createPromoMarmot(generate(), owner);
        await contract.createPromoMarmot(generate(), owner);
        await contract.setAutoBirthFee(0);
        assert.equal((await contract.canBreedWith(2, 3))[0], true);
        await contract.breedWithAuto(2, 3);
        
        assert.equal((await contract.isPregnant(2))[0], true);
        const child = (await contract.giveBirth(2))[0];
        assert.equal(child, 4);
    }).timeout(10000);
});