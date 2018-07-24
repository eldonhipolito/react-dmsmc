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

    loadDocsForSigner(){
        return new Promise((resolve, reject) => {
            this.documentsInstance.signerDocumentCount().then((count) => {
                let docPromises = [];

                for(var i = 0; i < count; i++){
                    docPromises.push(this.documentsInstance.signerDocId(i));
                }

                Promise.all(docPromises).then((ndcs) => {
                    let promises = [];
                    ndcs.map((ndx) => {
                        promises.push(this.documentsInstance.documents.call(ndx));
                    });

                    Promise.all(promises).then((result) => {
                        resolve(result);
                    });
                    
                });

            });

        });
    }

    loadDocForSigning(userAddress){
        return new Promise((resolve, reject) => {
            this.loadDocsForSigner().then((addresses) => {
                let promises = [];
                addresses.map((address) => {
                    promises.push(this.documentTemplate.at(address).then((instance) => {
                        return instance.hasSigned(userAddress).then((result) => {
                            return({
                                address : address,
                                signed  : result
                            });
                        });
                    }))
                });

                Promise.all(promises).then((res) => {
                    resolve(res);
                });

            });
            
        });
    }

    loadOwnedDoc(){
        return new Promise((resolve, reject) => {        
            this.documentsInstance.ownedDocCount().then((count) => {
                let docPromises = [];
                for(var ndx = 0; ndx < count; ndx++){
                    docPromises.push(this.documentsInstance.ownedDocument(ndx));
                }

                Promise.all(docPromises).then((docAddresses) => {
                    resolve(docAddresses);
                });
            });
        }).catch((err) => {console.log(err);});
    }

    loadDocDetails(address){
        return new Promise((resolve, reject) => {
            this.documentTemplate.at(address).then((instance) => {
                let promises = [];
                promises.push(instance.docName.call());
                promises.push(instance.checksum.call());
                promises.push(instance.id.call());

                Promise.all(promises).then((res) => {
                    resolve({
                            docName : res[0],
                            checksum : res[1],
                            id : res[2],
                            address  : address,
                    });
                });
            })
        });
    }


}

export default Documents;