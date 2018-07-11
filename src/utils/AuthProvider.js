import Identities from "./Identities";

export default class AuthProvider {

    constructor(identitiesInstance, identityTemplate, web3Instance) {
        this.identities = new Identities(identitiesInstance, identityTemplate);
        this.identityTemplate = identityTemplate;
        this.web3Instance = web3Instance;
    }

    authenticate(userAddress){
        return new Promise((resolve,reject) => {
            console.log("Here!!!" + userAddress);
            this.identities.lookup(userAddress).then((idn) => {
                if(this.verifiedIdn(idn.roles)) {
                    this.identityTemplate.at(idn.identity).then((idnInstance) => {
                        this.callAuth(idnInstance, userAddress).then((success) => {
                            
                            if(success) {
                                resolve({userId : idn.userId});
                            } else {
                                reject("Authentication failed");
                            }
                        
                        });     
                    });
                } else {
                    reject("Unregistered Identity");
                }

            });
        });
    }


    callAuth(idnInstance, userAddress) {
        return new Promise((resolve,reject) => {
            let web3 = this.web3Instance;
            const timestamp = new Date().getTime() + "\n" + "Sign data for authentication";
            console.log(web3);
            const msg = [
                {
                    type: 'string',
                    name: 'message',
                    value: timestamp
                }
            ];
            web3.currentProvider.sendAsync({
                method: 'eth_signTypedData',
                params: [msg, userAddress],
                from : userAddress,
            }, (err,signed) =>{
                console.log(signed);
                let hashed = web3.sha3(web3.sha3("string message") + web3.sha3(timestamp.length + timestamp));
                console.log("Hashed:"+ hashed);
                idnInstance.authenticate.call(timestamp, signed.result).then((res) => {
                    console.log(res);    
                    resolve(res);
                });
            });
       
        });
    }


    verifiedIdn(roles) {
        for(var i = 0; i < roles.length; i++) {
            if(roles[i].role === "verified" && roles[i].hasRole) {
                return true;
            }
        }

        return false;
    }



}