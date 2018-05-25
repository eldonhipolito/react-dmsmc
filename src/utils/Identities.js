const ROLE_ADMIN = "admin";

const ROLE_VERIFIED = "verified";

const ROLE_DOC_CREATOR = "creator";

const ROLE_DOC_SIGNER = "signer";

class Identities {

    constructor(identitiesInstance, identityTemplate) {
        this.identitiesInstance = identitiesInstance;
        this.identityTemplate = identityTemplate;
    }

 
    lookup(userAddress){
        return new Promise((resolve, reject) => {
            this.identitiesInstance.identities.call(userAddress).then((idn) => {
                this.idnUsingAddress(idn).then((res) => {
                    resolve(res);
                });                
            });

        });
    }


    listUnverified() {
        return new Promise((resolve, reject) => {
            this.identitiesInstance.requestsCount.call().then((rqCount) => {
                var list = [];
                const promises = [];
                for(let ndx = 0; ndx < rqCount; ndx++) {
                promises.push(this.getIdentity(list, ndx, rqCount));
                }
                Promise.all(promises).then((results) => {
                    resolve(results);
                });
                
            });
        
        });
    }

    listVerified(){
        return new Promise((resolve, reject) => {
           this.identitiesInstance.registeredIdentitiesCount.call().then((regCount) => {
            let idnPromises = [];
               for(let ndx = 0; ndx < regCount; ndx++) {
                    idnPromises.push(this.idn(ndx));        
               }
               Promise.all(idnPromises).then((results) => {
                    resolve(results);
                });   
           });
           
        });
    }

    idn(ndx){
        return new Promise((resolve, reject) => {
            this.identitiesInstance.registeredIdentities.call(ndx).then((userAddress) => {
                this.identitiesInstance.identities.call(userAddress).then((identity) =>{
                this.idnUsingAddress(identity).then((res) => {
                    resolve(res);
                });
            });
         });
        });
    }

    idnUsingAddress(idnAddress) {
        return new Promise((resolve, reject) => {
        this.identityTemplate.at(idnAddress).then((inst) =>{
            inst.userId.call().then((userId) => {
                inst.name.call().then((name) => {
                    inst.owner.call().then((userAddress) => {
                        this.getIdnRoles(userAddress).then((roles) =>{
                            resolve({userId : userId, name : name, identity : idnAddress, userAddress : userAddress, roles : roles});
                        });  
                    });             
                });
            });
        });
    });

    }

    getIdnRoles(userAddress) {
        return new Promise((resolve, reject) => {

            let rolePromises = [this.createRolePromise(userAddress, ROLE_ADMIN), this.createRolePromise(userAddress, ROLE_VERIFIED),
            this.createRolePromise(userAddress, ROLE_DOC_CREATOR), this.createRolePromise(userAddress, ROLE_DOC_SIGNER)];

            Promise.all(rolePromises).then((results) => {
                resolve(results);
            });
        });
    }

    createRolePromise(userAddress, roleName) {
        return new Promise((resolve, reject) => {
            this.identitiesInstance.hasRole.call(userAddress, roleName).then((res) => {
                resolve({role : roleName, hasRole : res});
            });
        });
    }

    getIdentity(list, ndx, rqCount) {
        return new Promise((resolve, reject) => {
            this.identitiesInstance.singleVerRequest.call(ndx).then((res) => {
                let userAddress = res[0];
                let identity = res[1];
                let timestamp = res[2];
           this.identityTemplate.at(identity).then((inst) =>{
                inst.userId.call().then((userId) => {
                    inst.name.call().then((name) => {                     
                        resolve({userId : userId, name : name, identity : identity, userAddress : userAddress, timestamp : new Date(timestamp.c * 1000)});
                    });
                });
           });
          });

        });
    }

}

export default Identities;