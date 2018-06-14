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

    loadSignedDocuments(userAddress){
        //signatures
        return new Promise((resolve, reject) => {
            this.loadDocsForSigner().then((addresses) => {
                let docPromises = [];
                addresses.map((address) => {
                    docPromises.push(
                        this.documentTemplate.at(address).then((instance) => {
                            return instance.hasSigned(userAddress).then((result) => {
                                if(!result) {
                                    return address;
                                }
                            });
                        })
                    );
                });

                Promise.all(docPromises).then((result) => {
                    resolve(result)
                });

            });

        });
    }

    loadOwnedDocDetails(){
        return new Promise((resolve, reject) => {        
            this.documentsInstance.ownedDocCount().then((count) => {
                let docPromises = [];
                for(var ndx = 0; ndx < count; ndx++){
                    docPromises.push(this.documentsInstance.ownedDocument(ndx));
                }

                Promise.all(docPromises).then((docAddresses) => {
                    let docDetailPromises = [];
                    docAddresses.map((address) => {
                        docDetailPromises.push(this.loadDocDetails(address));
                    });

                    Promise.all(docDetailPromises).then((res) => {
                        resolve(res);
                    });

                });
            });
        }).catch((err) => {console.log(err);});
    }

    loadSignedDocumentDetails(userAddress){
        return new Promise((resolve, reject) => {
            this.loadSignedDocuments(userAddress).then((addresses) => {
                let promises = [];
                addresses.map((address) => {
                    promises.push(this.loadDocDetails(address));
                })

                Promise.all(promises).then((result) => {
                    resolve(result);
                })

            });

        }).catch((err) => {console.log(err);});
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