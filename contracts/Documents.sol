pragma solidity ^0.4.18;

import './Document.sol';

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

import './IdentitiesIntf.sol';


import './OwnableIntf.sol';


contract Documents is Ownable {


    mapping(uint256 => address) public documents;

    mapping(address => uint256[]) public documentOwnership;

    uint256 public count;

    IdentitiesIntf public identitiesAdd;

    event DocumentCreated(uint256 id, address document, address creator);

    event DocumentOwnershipTransferred(uint256 documentId, address previousOwner, address newOwner);

    function Documents(address _identitiesAdd) public {
        identitiesAdd = IdentitiesIntf(_identitiesAdd);
    }

    function createDocument(string _docName, bytes32 _checksum) external {
        identitiesAdd.checkCreatorRole(msg.sender);
        count++;
        address doc = new Document(count, _docName, _checksum, msg.sender, address(identitiesAdd));
        documents[count] = doc;
        documentOwnership[msg.sender].push(count);

        DocumentCreated(count, doc, msg.sender);
    }

    function transferDocumentOwnership(uint256 documentId, address newOwner) external {
        require(documents[documentId] != address(0));
        int ownedNdx = ownedDocIndex(documentId, msg.sender);
        require(ownedNdx != -1);
        // Ensures that address of new owner has the rights to own the document
        identitiesAdd.checkCreatorRole(newOwner);

        removeDocOwnership(uint(ownedNdx));
        OwnableIntf(documents[documentId]).transferOwnership(newOwner);

        DocumentOwnershipTransferred(documentId, msg.sender, newOwner);


    }

    function ownedDocIndex(uint256 docId, address addr) internal view returns (int) {
        uint256[] memory owned = documentOwnership[addr];

        for(uint i = 0; i < owned.length; i++) {
            if(owned[i] == docId) {
                return int(i);
            }
        }

        return -1;
    }

    function removeDocOwnership(uint ownedNdx) internal {
        uint256[] storage docs = documentOwnership[msg.sender];


        //Delete element
        delete docs[ownedNdx];

        //Move last element to deleted spot
        docs[ownedNdx] = docs[docs.length - 1];

        //Reduce array size
        docs.length--;

    }

    function setRolesDefAdd(address _identitiesAdd) public onlyOwner {
        identitiesAdd = IdentitiesIntf(_identitiesAdd);
    }




}
