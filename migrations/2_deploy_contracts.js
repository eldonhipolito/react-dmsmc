var Identities = artifacts.require("./Identities.sol");

var Documents = artifacts.require("./Documents.sol");

var ECRecovery = artifacts.require("zeppelin-solidity/contracts/ECRecovery.sol");

var RBAC = artifacts.require("zeppelin-solidity/contracts/ownership/rbac/RBAC.sol");

const fs = require("fs");

module.exports = function(deployer, network, accounts) {
	var docs, idns, ecr;
	
	deployer.then(function(){
		return deployer.deploy(ECRecovery);
	}).then(function(instance){
		ecr = instance;
		deployer.link(ECRecovery, Documents);
		return deployer.deploy(Identities, {from : accounts[0], overwrite : true});
	}).then(function(instance){
		return deployer.deploy(Documents, Identities.address, {from : accounts[0], overwrite: true});
	}).then(function(instance){
		let addresses = '{"documents": "' + Documents.address + '", "identities": "' + Identities.address + '", "ecrecovery": "' + ECRecovery.address + '"}';
					fs.writeFile("./src/addresses.json", addresses, (err) =>{
						console.log('here 4');
						if(err) throw err;
						console.log("Migration successfully written to addresses.json");
					
						});
	});
	
    
};
