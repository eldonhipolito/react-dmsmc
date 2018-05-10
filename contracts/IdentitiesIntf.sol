pragma solidity ^0.4.18;


//Interfaces used by contracts depending on Identities contract
interface IdentitiesIntf {

    function identities(address _address) public view returns (address);

    function verifyIdentity(address user, address identity) public;

    function setRBACAddress(address _rbacAddress) public;

    function hasRole(address addr, string roleName) view public returns (bool);

    function checkRole(address addr, string roleName) view public;

    function checkVerifiedRole(address addr) view public;

    function checkSignerRole(address addr) view public;

    function checkCreatorRole(address addr) view public;

}
