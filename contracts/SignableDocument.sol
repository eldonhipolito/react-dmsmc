pragma solidity ^0.4.18;

interface SignableDocument {

    function sign(bytes32 hash, bytes sig) external;

    function addSigner(address signer) external;

}
