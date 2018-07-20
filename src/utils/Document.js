class Document {

    constructor(documentTemplate, docAddress, web3Instance) {
        this.documentInstance = documentTemplate.at(docAddress);
        this.web3Instance = web3Instance;        
    }
    

    loadDoc(documentTemplate, docAddress){
        this.documentInstance = documentTemplate.at(docAddress);
    }


    checksum(){
        return this.promiseWrapper((docInstance) => {
            return {
                action : docInstance.checksum.call(),
                callback : (result) => {
                    return result;
                }
            }
        });
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

    callSign(userAddress, docInstance){
        return new Promise((resolve, reject) => {
        
            this.checksum().then((data) => {
                let web3 = this.web3Instance;
                const msg = [
                    {
                        type: 'string',
                        name: 'message',
                        value: data
                    }
                ];
                web3.currentProvider.sendAsync({
                    method: 'eth_signTypedData',
                    params: [msg, userAddress],
                    from : userAddress,
                }, (err,signed) =>{
                    docInstance.sign(data, signed.result).then((signResult) => {
                        resolve(signResult);
                    });
                });

            });

        });
    }

    sign(userAddress){
        return this.promiseWrapper((docInstance) => {
            return {
                action : this.callSign(userAddress, docInstance),
                callback : (res) => {
                    for(var i in res.logs) {
                        if(res.logs[i].event === "DocumentSigned") {
                            return {txHash : res.tx, totalSigners : res.logs[i].args.signersCount, totalSigned : res.logs[i].args.totalSigned};
                        }
                    }
                }
            };
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
       return this.promisesWrapper((docInstance) => {
            let promises = [];
            promises.push(docInstance.id.call());
            promises.push(docInstance.docName.call());
            promises.push(docInstance.checksum.call());
            promises.push(docInstance.signersCount.call());
            promises.push(docInstance.signatureCount.call());
            
            return {
                actions : promises,
                callback : (res) => {
                    return {
                        id : res[0],
                        docName : res[1],
                        checksum : res[2],
                        signers : res[3],
                        signatures : res[4],
                    }
                }
            };

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