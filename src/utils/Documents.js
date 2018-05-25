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
                console.log(docCount.c[0]);
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

    listOwnedDocsNdx(userAddress){
        return new Promise((resolve,reject) => {
            this.allDocument().then((documents) => {
                let promises = [];
                documents.map((s) => {
                    promises.push(s.owner.call());
                });

                Promise.all(promises).then((owners) => {
                    let ownedDocNdx = [];
                    let ndx = 1;
 
                    owners.map((result) => {
                        if(result === userAddress){
                            ownedDocNdx.push(ndx);
                        }
                        ndx++;
                    });
                    console.log(ownedDocNdx);
                    resolve(ownedDocNdx);
                });
            });
        });
    }

    listOwnedDoc(ndx){
        return new Promise((resolve, reject) => {
            return this.documentsInstance.documents.call(ndx).then((address) => {
                return this.documentTemplate.at(address).then((document) => {
                    document.docName.call().then((docName) => {
                        resolve(docName);
                    });
                });
            });

        });
    }


}

export default Documents;