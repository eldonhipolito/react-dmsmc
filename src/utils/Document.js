class Document {

    constructor(documentTemplate, docAddress) {
        this.documentInstance = documentTemplate.at(docAddress);
    }


    signers(count) {
        return this.promisesWrapper((docInstance) => {
            //return new Promise((resolve, reject) => {          
                let signersPromises = [];
                for(let ndx = 0; ndx < count; ndx++) {
                    signersPromises.push(docInstance.signers.call(ndx));
                }
                
                return {
                    actions : signersPromises,
                    callback : (result) => {
                        return result;
                    }
                };
            //});
        });
    }

    signerCount(){
        return this.promiseWrapper((docInstance) => {
            return {
                action : docInstance.signersCount.call(),
                callback : (result) => {
                    return result.c[0];
                }
            }
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
           return {
                action : instance.addSigner(signer),
                callback : (res) => {
                    for(var i in res.logs) {
                        if(res.logs[i].event === "SignerAdded") {
                            return {txHash : res.tx, totalSigners : res.logs[i].args.signersCount};
                        }
                    }
                }
            };
        });
    }

    promiseWrapper(action) {
        return new Promise((resolve, reject) => {

            this.documentInstance.then((instance) => {
                let me = action(instance);
                me.action.then((res) => {
                    resolve(me.callback(res));
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    promisesWrapper(actions, requiredPromise) {
        return new Promise((resolve, reject) => {
                this.documentInstance.then((instance) => {
                    let me = actions(instance);

                    Promise.all(me.actions).then((res) => {
                        resolve(me.callback(res));
                    });
                }).catch((err) => {
                        reject(err);
                });
        });
    }
    

}

export default Document;