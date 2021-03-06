pragma solidity ^0.5.7;

import "./IANSStorage.sol";
import "../lib/Ownable.sol";
import "../lib/Utils.sol";

/// @title Address Name Service Storage contract
contract ANSStorage is IANSStorage, Ownable {
    using Utils for string;

    mapping(string => address) private _nameRecords;
    mapping(address => string) private _addressRecords;

    /// @param owner Owner of the contract.
    constructor(address owner) Ownable(owner) public validAddress(owner) {
    }

    /// @dev Note the validation of the name should happen in the library contract.
    ///      Only the owner of this contract can call this.
    /// @param addr Address to set the name for.
    /// @param name Name to add a name record for. 
    /// @return True if the assignment succeeds.
    function assignName(
        address addr,
        string calldata name)
        external 
        onlyOwner 
        validAddress(addr)
        returns (bool success) 
    {
        _nameRecords[name] = addr;
        _addressRecords[addr] = name;

        emit NameAssigned(name, addr);

        return true;
    }

    /// @param name Name to resolve to an address.
    /// @return Resolved address.
    function resolveName(
        string calldata name) 
        external 
        view 
        returns (address resolved) 
    {
        return _nameRecords[name];
    }

    /// @param addr Address to resolve to name.
    /// @return Resolved name.
    function resolveAddress(
        address addr)
        external 
        view 
        returns (string memory resolved) 
    {
        return _addressRecords[addr];
    }

    /// @param name Name to check if assigned.
    /// @return If name has been assigned.
    function isNameAssigned(
        string calldata name)
        external
        view
        returns (bool assigned)
    {
        return _nameRecords[name] != address(0);
    }

    /// @param addr Address to check if assigned.
    /// @return If address has been assigned.
    function isAddressAssigned(
        address addr)
        external
        view
        returns (bool assigned)
    {
        string memory name = _addressRecords[addr];
        bytes memory nameBytes = name.toBytes();
        return nameBytes.length > 0;
    }
}
