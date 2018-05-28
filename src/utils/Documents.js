class Documents {

    constructor(documentsInstance, documentTemplate) {
        this.documentsInstance = documentsInstance;
        this.documentTemplate = documentTemplate;
    }

    create(label, checksum) {
        return new Promise((resolve, reject) => {
            this.documentsInstance.createDocument(label, checksum).then((res) => {
                for(var i in res.logs) {
                    if(res.logs[i].event === "DocumentCreated") {
                        resolve({id : res.logs[i].args.id, document : res.logs[i].args.document});
                    }
                }
            }).catch((err) => {console.log(err);});
        });
    }

    allDocAddress(){
        return new Promise((resolve, reject) => {
            return this.documentsInstance.count.call().then((docCount) =>{
                let documentsPromises = [];
                for (var ndx = 0; ndx < docCount.c[0] ; ndx++){
                    documentsPromises.push(this.documentsInstance.documents.call(ndx + 1));
                }

                Promise.all(documentsPromises).then((documentAddresses) => {
                    resolve(documentAddresses);
                  })
                
            }).catch((err) => {console.log(err)});

        });

    }

    allDocument(){
        return new Promise((resolve, reject) => {
            this.allDocAddress().then((docAddresses) => {
                let documentPromises = [];
                docAddresses.map((s) => {
                    documentPromises.push(this.documentTemplate.at(s));
                });
                
                Promise.all(documentPromises).then((docInstances) => {
                    resolve(docInstances);
                }); 
            });
        });
    }

    documentSignerCount(){
        return new Promise((resolve,reject) => {
            this.allDocument().then((documents) => {
                let promises = [];
                documents.map((s) => {
                    promises.push(
                        s.signersCount.call().then((count) => {
                            return {
                                document : s,
                                signerCount : count,
                            }
                        })
                    );
                });

                Promise.all(promises).then((result) => {
                    resolve(result);
                });
            });
        });
    }

    loadPendingDocs(document, signerCount, userAddress){
        return new Promise((resolve, reject) => {
            let promises = [];
            for(var ndx = 0; ndx < signerCount; ndx++){
                promises.push(
                    document.signers.call(ndx).then((signer) => {
                       if(signer == userAddress){
                           return document.address;
                       }
                    })
                );
            }

            Promise.all(promises).then((result) => {
                console.log("loob ad " + result);
                resolve(result);
            });
        });

    }

    loadPendingDetailedDocs(userAddress){
        return new Promise((resolve, reject) => {
            this.documentSignerCount().then((docSignerDetails) => {
                let signerPromises = [];
                docSignerDetails.map((docSignerDetail) => {
                    signerPromises.push(
                        this.loadPendingDocs(docSignerDetail.document, docSignerDetail.signerCount, userAddress)
                    );
                });

                Promise.all(signerPromises).then((addresses) =>{
                    let promises = [];
                    addresses.map((address) => {
                        promises.push(this.loadDocDetails(address));
                    });

                    Promise.all(promises).then((res) => {
                        console.log(res);
                        resolve(res)
                    });
                });                
            });
        });
    }

    loadOwnedDetailedDocs(){
        return new Promise((resolve, reject) => {        
            this.documentsInstance.ownedDocCount().then((count) => {
                let docPromises = [];
                for(var ndx = 0; ndx < count; ndx++){
                    docPromises.push(this.documentsInstance.ownedDocument(ndx));
                }

                Promise.all(docPromises).then((docAddresses) => {
                    let docDetailPromises = [];
                    docAddresses.map((address) => {
                        console.log(address);
                        docDetailPromises.push(this.loadDocDetails(address));
                    });

                    Promise.all(docDetailPromises).then((res) => {
                        resolve(res);
                    });

                });
            });
        });
    }

    loadDocDetails(address){
        return new Promise((resolve, reject) => {
            this.documentTemplate.at(address).then((instance) => {
                return instance.docName.call().then((docName) =>{
                    return instance.checksum.call().then((checksum) => {
                        return instance.id.call().then((id) => {
                            resolve({
        /*haadouuukenn*/       id : id,
        /*soorryuuuken*/       docName : docName,
        /*tatatatuken*/        checksum : checksum,
                            });
                        });
                    });
                });
            })
        });
    }


}

export default Documents;