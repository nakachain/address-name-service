pragma solidity ^0.5.7;

/// @title Address Name Service Storage interface
contract IANSStorage {
    event NameAssigned(string indexed name, address indexed addr);

    function assignName(address addr, string calldata name) external returns (bool success);
    function resolveName(string calldata name) external view returns (address resolved);
    function isAddressAssigned(address addr) external view returns (bool assigned);
    function resolveAddress(address addr) public view returns (string memory resolved);
    function transferOwnership(address newOwner) public;
    function renounceOwnership() public;
}
