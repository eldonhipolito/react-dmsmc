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
        
       
        templates.Identity.detectNetwork().then(function(){
            templates.Identity.link("ECRecovery", Addresses.ecrecovery);
            //templates.Identity.defaults({from : web3Instance.eth.accounts[0]});
            setFromDefaults(templates,web3Instance);
            templates.web3Instance = web3Instance;
            resolve(templates);
        });
        
        
    });
});

let initContractInstances = new Promise(function(resolve, reject) {
    var contracts = {
        templates : {},
        instances : {}
    };
    initContractTemplates.then(results => {
        results.ECRecovery.at(Addresses.ecrecovery).then(function(ecRecoveryInstance) {
            contracts.instances.ecrecovery = ecRecoveryInstance;
        
            results.Identities.at(Addresses.identities).then(identitiesInstance => {
                contracts.instances.identities = identitiesInstance;
                
                results.Documents.at(Addresses.documents).then(documentsInstance => {
                    contracts.instances.documents = documentsInstance;
                    contracts.templates = results;
                    resolve(contracts);
                });
                
            });

    });

    });
});

function setFromDefaults(contrs, web3) {
    Object.values(contrs).map((con) => {
        con.defaults({from : web3.eth.accounts[0]});
    })
}

export {initContractTemplates, initContractInstances};
