
var Identities = artifacts.require("./Identities.sol");

var Identity = artifacts.require("./Identity.sol");

var Documents = artifacts.require("./Documents.sol");

var Document = artifacts.require("./Document.sol");


var ECRec = artifacts.require("zeppelin-solidity/contracts/ECRecovery.sol");

contract('Documents', async (accounts) => {
    let ecr;
    let idns;
    let docs;
    let admin = accounts[0];



    it("Should be able to create document with creator as actor", async () => {
        ecr = await ECRec.deployed();
        Identity.link("ECRecovery", ecr.address);
        Document.link("ECRecovery", ecr.address);
        Documents.link("ECRecovery", ecr.address);
        idns = await Identities.new({from : admin});
        docs = await Documents.new(idns.address, {from : admin});


        // Assign wallet for new user
        let activeWallet = admin;

        // Create Identity
        let dickson = await Identity.new("Dickson", "Richard", {from : activeWallet});

        // Request identity verification
        await idns.reqIdnVerification(dickson.address, {from : activeWallet})

        // Verify Identity
        await idns.verifyIdentity(activeWallet, dickson.address, {from : admin});

        // Add creator role for account identity
        await idns.adminAddRole(activeWallet, "creator", {from : admin});

        // Create document
        await docs.createDocument("asd", web3.sha3("asd"), {from : activeWallet});

        var estimatedGas = await docs.createDocument.estimateGas("asd", web3.sha3("asd"), {from : activeWallet});
        console.log(estimatedGas);

        // Check the first document
        assert.isNotNull(await Document.at(await docs.documents(1)));

    })

    it("Should own one document", async () => {
        var ownedDocCount = await docs.ownedDocCount();
        assert.isAbove(ownedDocCount.c[0], 0, 'No owned document');
    });

    it("Should be owned by the creator after creation", async () => {
        // Check document owner
        assert.equal(await Document.at(await docs.ownedDocument(0)).owner(), admin);
        //assert.equal( await Document.at(await docs.documents(1)).owner(), admin);
    })

    it("Should be transferable", async () => {

        // Assign wallet for new user
        let activeWallet = accounts[1];

        // Create Identity
        let bob = await Identity.new("Bob", "Robert", {from : activeWallet});

        // Request identity verification
        await idns.reqIdnVerification(bob.address, {from : activeWallet});

        // Verify Identity
        await idns.verifyIdentity(activeWallet, bob.address, {from : admin});

        // Add creator role for account identity
        await idns.adminAddRole(activeWallet, "creator", {from : admin});

        // Transfer document ownership to bob
        await docs.transferDocumentOwnership(1, activeWallet, {from : admin});

        // Check the owner
        assert.equal( await Document.at(await docs.documents(1)).owner(), activeWallet);

    })

    it("Produced document should be able to add signatories", async () => {
        let activeWallet = accounts[2];
        let docOwner = accounts[1];

        let kuya = await Identity.new("Kuya", "Ferris", {from : activeWallet});

        // Request identity verification
        await idns.reqIdnVerification(kuya.address, {from : activeWallet});

        // Verify Identity
        await idns.verifyIdentity(activeWallet, kuya.address, {from : admin});

        // Add signer role for account identity
        await idns.adminAddRole(activeWallet, "signer", {from : admin});

        // Access the document
        let doc = await Document.at(await docs.documents(1));

        // Add signer
        await doc.addSigner(activeWallet, {from : docOwner});

        // Check if there is a signer
        assert.equal(await doc.signers(0), activeWallet);
    })

    it("Produced document can be signed", async () => {
        let activeWallet = accounts[2];
        let doc = await Document.at(await docs.documents(1));

        // Sign document
        await doc.sign(web3.sha3("\x19Ethereum Signed Message:\n3jid"),
            web3.eth.sign(activeWallet, web3.toHex('jid')), {from : activeWallet});

        let docSignature = await doc.signatures(0);

        assert.equal(docSignature[0], activeWallet);
     })
});

