class Documents {

    constructor(documentsInstance) {
        this.documentsInstance = documentsInstance;
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

    

}

export default Documents;