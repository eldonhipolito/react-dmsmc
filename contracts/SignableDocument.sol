pragma solidity ^0.4.18;

interface SignableDocument {

    function sign(string message, bytes sig) external;

    function addSigner(address signer) external;

}
