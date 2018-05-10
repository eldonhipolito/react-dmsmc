pragma solidity ^0.4.18;

interface SelfSignatureVerifiable {

    function isOwnSignature(bytes32 hash, bytes sig) external view returns (bool);

}
