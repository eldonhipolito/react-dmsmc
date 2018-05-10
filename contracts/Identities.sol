pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

import 'zeppelin-solidity/contracts/ownership/rbac/RBAC.sol';

/**
@title Identities
@author Eldon Hipolito
@dev This contract is used as a registry for identities, and acts as the role based access control.
*/
contract Identities is Ownable, RBAC {


    struct VerificationData {
        address user;
        address identity;
        uint256 blockTimestamp;
    }

    // Mapping of user address to identity
    mapping(address => address) public identities;

    // Mapping of user address to identity
    mapping(address => address) public unverifiedIdentities;

    // Requests for verification
    VerificationData[] public requests;

    string constant ROLE_VERIFIED_IDENTITY = "verified";

    string constant ROLE_DOCUMENT_SIGNER = "signer";

    string constant ROLE_DOCUMENT_CREATOR = "creator";

    /**
    @dev ctor
    */
    function Identities() public {

    }

    event IdentityVerified(address verifier, address user, address identity);

    event IdentityVerificationRequested(address sender, address identity);

    event RoleAdded(address admin, address user, string role);

    event RoleRemoved(address admin, address user, string role);


    /**
        @dev Verifies an identity. Only accessible by an admin
        @param user - address of the user
        @param identity - identity of the user
    */
    function verifyIdentity(address user, address identity) public onlyAdmin {
        require(Ownable(identity).owner() == user);
        require(identities[user] == address(0));

        identities[user] = identity;
        unverifiedIdentities[user] = address(0);
        rmvUnverifiedIdn(user);
        adminAddRole(user, ROLE_VERIFIED_IDENTITY);
        IdentityVerified(msg.sender, user, identity);
    }

    /**
        @dev Removes the unverified identity from the requests.
        @param user - address of the user
    */
    function rmvUnverifiedIdn(address user) internal {
        for(uint i = 0; i < requests.length; i++) {
            if(requests[i].user == user) {
                delete requests[i];
                requests[i] = requests[requests.length - 1];
                requests.length--;
                return;
            }
        }
        //Should not reach here...
        assert(false);
    }

    /**
        @dev Requests identity verification.
        @param identity - identity of the user
    */
    function reqIdnVerification(address identity) external {
        require(identities[msg.sender] == address(0));
        require(unverifiedIdentities[msg.sender] == address(0));
        require(Ownable(identity).owner() == msg.sender);

        requests.push(VerificationData(msg.sender, identity, block.timestamp));
        unverifiedIdentities[msg.sender] = identity;

        IdentityVerificationRequested(msg.sender, identity);
    }

    function singleVerRequest(uint ndx) external view returns(address, address, uint256) {
        return (requests[ndx].user, requests[ndx].identity, requests[ndx].blockTimestamp);
    }

    function requestsCount() external view returns(uint) {
        return requests.length;
    }


    /**
    @dev Will check if addr has verified role. Throws when false
    @param addr - address of the user
    */
    function checkVerifiedRole(address addr) view public {
        checkRole(addr, ROLE_VERIFIED_IDENTITY);
    }
    /**
    @dev Will check if addr has signer role. Throws when false
    @param addr - address of the user
    */
    function checkSignerRole(address addr) view public {
        checkRole(addr, ROLE_DOCUMENT_SIGNER);
    }
    /**
    @dev Will check if addr has creator role. Throws when false
    @param addr - address of the user
    */
    function checkCreatorRole(address addr) view public {
        checkRole(addr, ROLE_DOCUMENT_CREATOR);
    }


}

