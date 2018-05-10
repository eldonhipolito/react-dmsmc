import getWeb3 from './getWeb3'
import IdentitiesContract from '../../build/contracts/Identities.json'
import DocumentsContract from '../../build/contracts/Documents.json'
import ECRecoveryContract from '../../build/contracts/ECRecovery.json'
import IdentityContract from '../../build/contracts/Identity.json'
import DocumentContract from '../../build/contracts/Document.json'
import Addresses from '../addresses.json'



var truffleContract = require("truffle-contract");

let initContractTemplates = new Promise(function(resolve, reject) {
    var templates = {};
    getWeb3.then(results => {
      
       let web3Instance = results.web3;        
        templates.ECRecovery = truffleContract(ECRecoveryContract);
        templates.ECRecovery.setProvider(web3Instance.currentProvider);
        templates.Identities = truffleContract(IdentitiesContract);
        templates.Identities.setProvider(web3Instance.currentProvider);
        templates.Documents = truffleContract(DocumentsContract);
        templates.Documents.setProvider(web3Instance.currentProvider);
        templates.Identity = truffleContract(IdentityContract);
        templates.Identity.setProvider(web3Instance.currentProvider);
        templates.Document = truffleContract(DocumentContract);
        templates.Document.setProvider(web3Instance.currentProvider);
        templates.web3Instance = web3Instance;

       templates.Identity.detectNetwork().then(function(){
            templates.Identity.link("ECRecovery", Addresses.ecrecovery);
            resolve(templates);
        });
        
    });
});

let initContractInstances = new Promise(function(resolve, reject) {
    var instances = {};
    initContractTemplates.then(results => {
        console.log(results.ECRecovery);
        console.log(Addresses.ecrecovery);
        results.ECRecovery.at(Addresses.ecrecovery).then(function(ecRecoveryInstance) {
            instances.ecrecovery = ecRecoveryInstance;
        
            results.Identities.at(Addresses.identities).then(identitiesInstance => {
                instances.identities = identitiesInstance;
                
                results.Documents.at(Addresses.documents).then(documentsInstance => {
                    instances.documents = documentsInstance;

                    resolve(instances);
                });
                
            });

    });

    });
});

export {initContractTemplates, initContractInstances};
