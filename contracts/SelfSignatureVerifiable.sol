pragma solidity ^0.4.18;

interface SelfSignatureVerifiable {

    function isOwnSignature(string message, bytes sig) external view returns (bool);

}
