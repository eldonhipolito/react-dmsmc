pragma solidity ^0.4.18;

//Interfaces used by contracts depending on Documents contract
contract DocumentsIntf {


    function ownedDocCount() external view returns(uint);

    function ownedDocument(uint256 ndx) external view returns(address);

    function registerSignerToDoc(address signerAddress, uint256 docId) external;

    function signerDocId(uint256 ndx) public view returns(uint);

    function removeSignerToDoc(address signerAddress, uint256 ndx) external;


}
