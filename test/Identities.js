

var Identities = artifacts.require("./Identities.sol");

var Identity = artifacts.require("./Identity.sol");

var Documents = artifacts.require("./Documents.sol");


var ECRec = artifacts.require("zeppelin-solidity/contracts/ECRecovery.sol");

contract('Identities', async (accounts) => {
    let idn;
    let ecr;
    let idns;
    let docs;

    it("Account[0] should be able to request Self Identity verification", async () => {
        ecr = await ECRec.deployed();
        Documents.link("ECRecovery", ecr.address);
        idns = await Identities.new({from : accounts[0]});
        docs = await Documents.new(idns.address, {from : accounts[0]});
        Identity.link("ECRecovery", ecr.address);
        idn = await Identity.new("eldon123", "Eldon", {from : accounts[0]});

        await idns.reqIdnVerification(idn.address);

        assert.equal(await idns.unverifiedIdentities(accounts[0]), idn.address);

    })

    it("Account[0] should be able to verify self identity", async () => {
      //  console.log(await rb.hasRole(web3.eth.coinbase, "admin"));
        console.log(accounts[0]);
        console.log(await idn.owner());
        console.log(await idn.address);
        await idns.verifyIdentity(accounts[0], idn.address);

        assert.equal(await idns.identities(accounts[0]), idn.address);
    })
     it("Account[0] should have verified role", async () => {
            assert.equal(await idns.hasRole(accounts[0], "verified"), true)
      })

    it("Account[0] should have admin role", async () => {
        assert.equal(await idns.hasRole(accounts[0], "admin"), true)
     })

     it("Account[0] should be owner of Identities", async () => {
       // console.log(await idns.owner())
         assert.equal(await idns.owner(), accounts[0]);
       })

    it("Account[1] should be able to request identity verification", async () => {
        idn = await await Identity.new("account2", "Eldon2", {from : accounts[1]});

        await idns.reqIdnVerification(idn.address, {from : accounts[1]});

        assert.equal(await idns.unverifiedIdentities(accounts[1]), idn.address);

     })

      it("Account[0] should be able to approve identity verification of Account[1]", async () => {
             await idns.verifyIdentity(accounts[1], idn.address, {from : accounts[0]});
             assert.equal(await idns.identities(accounts[1]), idn.address);
       })

          it("Account[1] should have verified role", async () => {
                   assert.equal(await idns.hasRole(accounts[1], "verified"), true)
             })

           it("Account[1] should not have an admin role", async () => {
               assert.equal(await idns.hasRole(accounts[1], "admin"), false)
            })

       it("Account[0] should be able to add creator role to account[1]", async () => {
                assert.equal(await idns.hasRole(accounts[1], "creator"), false);
                    await idns.adminAddRole(accounts[1], "creator", {from : accounts[0]});
                    assert.equal(await idns.hasRole(accounts[1], "creator"), true);
        })

});