var Migrations = artifacts.require("./Migrations.sol");

var Identities = artifacts.require("./Identities.sol");

var Documents = artifacts.require("./Documents.sol");

var ECRecovery = artifacts.require("zeppelin-solidity/contracts/ECRecovery.sol");

var RBAC = artifacts.require("zeppelin-solidity/contracts/ownership/rbac/RBAC.sol");

const fs = require("fs");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Migrations);
  deployer.deploy(ECRecovery);

    deployer.deploy(Identities, {from : accounts[0]}).then(function(){

        deployer.link(ECRecovery, Documents);
        deployer.deploy(Documents, Identities.address, {from : accounts[0]}).then(function(){
        	let addresses = '{"documents": "' + Documents.address + '", "identities": "' + Identities.address + '", "ecrecovery": "' + ECRecovery.address + '"}';
        	fs.writeFile("./src/addresses.json", addresses, (err) =>{
        		if(err) throw err;
        		console.log("Migration successfully written to addresses.json");
        	});
        });

    });
};
