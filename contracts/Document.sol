pragma solidity ^0.4.18;

import './SignableDocument.sol';

import './CustomOwnership.sol';

import 'openzeppelin-solidity/contracts/ECRecovery.sol';

import './SelfSignatureVerifiable.sol';

import './IdentitiesIntf.sol';


contract Document is CustomOwnership, SignableDocument {

    struct Signatory {
        address signer;
        bytes32 hash;
        bytes signature;
    }


    uint256 public id;

    string public docName;

    bytes32 public checksum;

    address[] public signers;

    Signatory[] public signatures;

    IdentitiesIntf public identitiesAdd;

    event DocumentSigned(address docAddress, address signer, uint totalSigned, uint signersCount);

    event SignerAdded(address docAddress, address owner, address signer, uint signersCount);


    function Document(uint256 _id, string _docName, bytes32 _checksum, address _owner, address _identitiesAdd) public {
        id = _id;
        docName = _docName;
        checksum = _checksum;
        owner = _owner;
        identitiesAdd = IdentitiesIntf(_identitiesAdd);
    }

    function addSigner(address signer) external onlyOwner {
        identitiesAdd.checkVerifiedRole(signer);
        identitiesAdd.checkSignerRole(signer);
        uint length = signers.push(signer);

        SignerAdded(address(this), msg.sender, signer, length);
    }

    function sign(bytes32 hash, bytes sig) external {
        require(isSigner(msg.sender));
        require(!hasSigned(msg.sender));
        require(ECRecovery.recover(hash, sig) == msg.sender);

        uint totalSigned = signatures.push(Signatory(msg.sender, hash, sig));

        DocumentSigned(address(this), msg.sender, totalSigned, signatures.length);
    }

    function isSigner(address signerAddress) internal view returns (bool){
        for (uint i = 0; i < signers.length; i++) {
            if (signers[i] == signerAddress) {
                return true;
            }
        }

        return false;
    }

    function hasSigned(address signerAddress) internal view returns (bool) {
        for (uint i = 0; i < signatures.length; i++) {
            if (signatures[i].signer == signerAddress) {
                return true;
            }
        }

        return false;
    }


}
