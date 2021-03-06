pragma solidity ^0.4.18;

import "openzeppelin-solidity/contracts/ECRecovery.sol";
import "./SelfSignatureVerifiable.sol";

/**
@title Identity
@author Eldon Hipolito
@dev Identity contract for all users.
Used to be able to identify them and to be able to interact with the system
*/
contract Identity is SelfSignatureVerifiable {

    string public userId;

    string public name;

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
    @dev ctor
    */
    function Identity(string _userId, string _name) public {
        userId = _userId;
        name = _name;
        owner = msg.sender;
    }

    /**
    @dev Acts as the sign-in function for the dapp.
    The user/owner of this contract will have to sign a dummy text using his own private key.
    The resulting signed text will be used by this function to recover the address of the user
    to determine if he is indeed the one interacting with the dapp.
    @param message - text to be signed
    @param sig - The signed text using private key
    @return bool - authenticated or not
    */
    function authenticate(string message, bytes sig) external view onlyOwner returns (bool) {
        return ECRecovery.recover(hashDataForSig(message), sig) == msg.sender;
    }

    function hashDataForSig(string message) internal pure returns (bytes32) {
        return keccak256(keccak256("string message"),keccak256(message));
    }

    /**
        @dev This checks whether the signed text is signed by the owner of this contract
        @param message - The text hashed through keccak256 algorithm.
        @param sig - The signed text using the private key of the owner of this contract.
        @return bool
    */
    function isOwnSignature(string message, bytes sig) external view returns (bool) {
        return ECRecovery.recover(hashDataForSig(message), sig) == owner;
    }


}

