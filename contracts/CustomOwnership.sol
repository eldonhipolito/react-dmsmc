pragma solidity ^0.4.0;

contract CustomOwnership{

    address public owner;

    address public registry;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    event RegistrySwitch(address indexed previousRepo, address indexed newRepo);

    /**
     * @dev The RepositoryOwned constructor sets the original `repository` of the contract to the sender
     * account.
     */

    function CustomOwnership() public {
        registry = msg.sender;
    }

    /**
     * @dev Throws if called by any account other than the registry.
     */
    modifier registryOnly() {
        require(msg.sender == registry);
        _;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public registryOnly {
        require(newOwner != address(0));
        OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newRegistry.
     * @param newRegistry The address to transfer ownership to.
     */

    function switchRegistry(address newRegistry) public registryOnly {
        require(newRegistry != address(0));
        RegistrySwitch(registry, newRegistry);
        registry = newRegistry;
    }

}

