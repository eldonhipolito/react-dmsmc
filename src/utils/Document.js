class Document {

    constructor(documentTemplate, docAddress) {
        this.documentInstance = documentTemplate.at(docAddress);
    }


    signers() {
        return this.promiseWrapper((docInstance) => {
            
                docInstance.signersCount.call().then((c) => {
                    let signersPromises = [];
                    for(let ndx = 0; ndx < c; ndx++) {
                        signersPromises.push(docInstance.signers.call(ndx));
                    }
                    Promise.all(signersPromises).then((signersResult) => {
                        return signersResult;
                    });
                });
            
        });
    }


    val() {
       return this.promiseWrapper((docInstance) => {
        let promises = [];
        promises.push(docInstance.id.call());
        
        promises.push(docInstance.docName.call());

        promises.push(docInstance.checksum.call());
        

        promises.push(
           this.signers()
        );

        promises.push(
            new Promise((resolve, reject) => {
                docInstance.signatureCount.call().then((c) => {
                    let signaturePromises = [];
                    for(let ndx = 0; ndx < c; ndx++) {
                        signaturePromises.push(docInstance.singleSignatory.call(ndx));
                    }
                    Promise.all(signaturePromises).then((signatureResult) => {
                        resolve(signatureResult);
                    });
                });
            })
        );
        
        Promise.all(promises).then((res) => {
            let resolution = {};

            resolution.id = res[0];
            resolution.docName = res[1];
            resolution.checksum = res[2];
            resolution.signers = res[3];
            resolution.signatures = res[4];
            return resolution;
        });

       });
    }

    addSigner(signer){
        return this.promiseWrapper((instance) => {
            instance.addSigner(signer).then((res) => {
                for(var i in res.logs) {
                    if(res.logs[i].event === "SignerAdded") {
                        return {txHash : res.tx, totalSigners : res.logs[i].args.signersCount};
                    }
                }
            }).catch((err) => {console.log(err);});
        });
    }

    promiseWrapper(action) {
        return new Promise((resolve, reject) => {

            this.documentInstance.then((instance) => {
                resolve(action(instance));
            });
        });
    }
    

}

export default Document;