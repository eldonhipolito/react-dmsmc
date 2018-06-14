pragma solidity ^0.4.18;

import "./SignableDocument.sol";

import "./CustomOwnership.sol";

import "openzeppelin-solidity/contracts/ECRecovery.sol";

import "./SelfSignatureVerifiable.sol";

import "./IdentitiesIntf.sol";

import "./DocumentsIntf.sol";


/**
@title Document
@author Eldon Hipolito
@dev The document contract
*/
contract Document is CustomOwnership, SignableDocument {

    struct Signatory {
        address signer;
        bytes32 data;
        bytes signature;
    }

    uint256 public id;

    string public docName;

    bytes32 public checksum;

    address[] public signers;

    Signatory[] public signatures;

    IdentitiesIntf public identitiesAdd;
    
    DocumentsIntf public documentsAdd;

    event DocumentSigned(address docAddress, address signer, uint totalSigned, uint signersCount);

    event SignerAdded(address docAddress, address owner, address signer, uint signersCount);

    /**
    @dev - ctor
     */
    function Document(uint256 _id, string _docName, bytes32 _checksum, address _owner, address _identitiesAdd, address _documentsIntf) public {
        id = _id;
        docName = _docName;
        checksum = _checksum;
        owner = _owner;
        identitiesAdd = IdentitiesIntf(_identitiesAdd);
        documentsAdd = DocumentsIntf(_documentsIntf);
    }
    /**
    @dev - Add signer
    @param signer - address of the signer
    */
    function addSigner(address signer) external onlyOwner {
        identitiesAdd.checkVerifiedRole(signer);
        identitiesAdd.checkSignerRole(signer);
        uint length = signers.push(signer);

        documentsAdd.registerSignerToDoc(signer, id);
        emit SignerAdded(address(this), msg.sender, signer, length);
    }
    /**
    @dev - Sign function for signers
    @param data - keccak256 representation of the data signed.
    @param sig - data signed with the private key of the signer using ECDSA algorithm provided in web3
    */
    function sign(bytes32 data, bytes sig) external {
        require(isSigner(msg.sender));
        require(!hasSigned(msg.sender));
        require(ECRecovery.recover(data, sig) == msg.sender);

        uint totalSigned = signatures.push(Signatory(msg.sender, data, sig));

        emit DocumentSigned(address(this), msg.sender, totalSigned, signatures.length);
    }

    function isSigner(address signerAddress) internal view returns (bool){
        for (uint i = 0; i < signers.length; i++) {
            if (signers[i] == signerAddress) {
                return true;
            }
        }

        return false;
    }

    function hasSigned(address signerAddress) public view returns (bool) {
        require(isSigner(signerAddress));
        for (uint i = 0; i < signatures.length; i++) {
            if (signatures[i].signer == signerAddress) {
                return true;
            }
        }

        return false;
    }

    function singleSignatory(uint ndx) external view returns (address, bytes32, bytes) {
        return (signatures[ndx].signer, signatures[ndx].data, signatures[ndx].signature);
    }

    function signatureCount() external view returns(uint) {
        return signatures.length;
    }

    function signersCount() external view returns(uint) {
        return signers.length;
    }




}
