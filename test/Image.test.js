const Image = artifacts.require('./Image.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Image', (accounts) => {
    let contract;

    beforeEach(async() => {
        contract = await Image.deployed();
    });

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = contract.address;
            expect(address).to.not.eql(0x0);
            expect(address).to.not.be.empty;
            expect(address).to.not.be.null;
            expect(address).to.not.be.undefined;
        })

        it('has a name', async() => {
            const name = await contract.name();
            expect(name).to.eql('Image');
        });

        it('has a symbol', async() => {
            const symbol = await contract.symbol();
            expect(symbol).to.eql('IMG');
        });
    })

    describe('minting', async() => {
        const name = 'my name';
        const desc = 'my desc';
        const imgUri = 'www.com';
        it('creates a new token successfully', async() => {
            const result = await contract.mint(name, desc, imgUri);
            const totalSupply = await contract.totalSupply();
            const event = result.logs[0].args
            
            assert.equal(totalSupply, 1);
            assert.equal(event.tokenId.toNumber(), 0, 'id is correct');
            assert.equal(event.from, 0x0000000000000000000000000000000000000000, '`from` is correct');
            assert.equal(event.to, accounts[0], '`to` is correct');
        });

        it('reads the new token', async() => {
            const newImage = await contract.imageIdToImageData(0);
            assert.equal(newImage['name'], name);
            assert.equal(newImage['description'], desc);
            assert.equal(newImage['image_uri'], imgUri);
        });

        it('gets the owner of the new token', async() => {
            const owner = await contract.imageIdToOwner(0);
            assert.equal(owner, accounts[0], 'owner is incorrect');
        });
    })
})