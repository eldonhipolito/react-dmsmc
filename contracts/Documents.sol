pragma solidity ^0.4.18;

import "./Document.sol";

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "./IdentitiesIntf.sol";


import "./OwnableIntf.sol";


/**
@title Documents
@author Eldon Hipolito
@dev Documents contract.
Registry for documents
*/
contract Documents is Ownable {


    mapping(uint256 => address) public documents;

    mapping(address => uint256[]) public documentOwnership;

    mapping(address => uint256[]) public signerDocuments;

    uint256 public count;

    IdentitiesIntf public identitiesAdd;

    event DocumentCreated(uint256 id, address document, address creator);

    event DocumentOwnershipTransferred(uint256 documentId, address previousOwner, address newOwner);

    function ownedDocCount() external view returns(uint){
        return documentOwnership[msg.sender].length;
    }

    function ownedDocument(uint256 ndx) external view returns(address){
        uint256[] memory owned = documentOwnership[msg.sender];
        return documents[owned[ndx]];
    }

    /**
    @dev ctor
    */
    function Documents(address _identitiesAdd) public {
        identitiesAdd = IdentitiesIntf(_identitiesAdd);
    }

    /**
    @dev Creates document
    The creation of documents is delegated to this function since it is needed to store it on the
    registry after doc creation.
    @param _docName - Doc label
    @param _checksum - SHA256 checksum of the doc
    */
    function createDocument(string _docName, bytes32 _checksum) external {
        identitiesAdd.checkCreatorRole(msg.sender);
        count++;
        address doc = new Document(count, _docName, _checksum, msg.sender, address(identitiesAdd), address(this));
        documents[count] = doc;
        documentOwnership[msg.sender].push(count);

        emit DocumentCreated(count, doc, msg.sender);
    }

    /**
    @dev Transfer doc ownership
    @param documentId - Generated document ID 
    @param newOwner - address of the newOwner(must have the corresponding role), 
    */
    function transferDocumentOwnership(uint256 documentId, address newOwner) external {
        require(documents[documentId] != address(0));
        int ownedNdx = ownedDocIndex(documentId, msg.sender);
        require(ownedNdx != -1);
        // Ensures that address of new owner has the rights to own the document
        identitiesAdd.checkCreatorRole(newOwner);

        removeDocOwnership(uint(ownedNdx));
        OwnableIntf(documents[documentId]).transferOwnership(newOwner);

        emit DocumentOwnershipTransferred(documentId, msg.sender, newOwner);

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
    /**
    @dev To ensure flexibility of contract change, a setter has been provided such that
    it will be possible to change the identities dependency of this contract.
    @param _identitiesAdd - the new address of identities  
     */
    function setIdentitiesAdd(address _identitiesAdd) public onlyOwner {
        identitiesAdd = IdentitiesIntf(_identitiesAdd);
    }

    /**
        @dev Register signer - doc relationship for easy access
        @param signerAddress - wallet address of the signer
        @param docId - document id 
     */
    function registerSignerToDoc(address signerAddress, uint256 docId) external {
        require(documents[docId] != address(0));
        uint256[] storage docNdcs = signerDocuments[signerAddress];
        uint256 count = docNdcs.length++;
        docNdcs[count] = docId;
    }


    function signerDocId(uint256 ndx) public view returns(uint) {
        uint256[] storage docNdcs = signerDocuments[msg.sender];
        require(docNdcs.length != 0);

        return docNdcs[ndx];

    }

    /**
        @dev Remove signer - doc relationship
        @param signerAddress - wallet address of the signer
        @param ndx - ndx of document 
     */
    function removeSignerToDoc(address signerAddress, uint256 ndx) external {
        uint256[] storage docNdcs = signerDocuments[signerAddress];

        require(docNdcs[ndx] < 0);

        delete docNdcs[ndx];

        //Move last element to deleted spot
        docNdcs[ndx] = docNdcs[docNdcs.length - 1];

        //Reduce array size
        docNdcs.length--;

    }

    function signerDocumentCount() public view returns(uint) {
        return signerDocuments[msg.sender].length;
    }


}
