// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IAnonAadhaar {
    function verifyAnonAadhaarProof(
        uint identityNullifier,
        uint userNullifier,
        uint timestamp,
        uint signal,
        uint[8] memory groth16Proof
    ) external view returns (bool);
}

contract OnChainVerifier {
    mapping(uint => bool) public verifiedNullifiers;
    address admin;

    address public anonAadhaarVerifierAddr;
    constructor() {
        anonAadhaarVerifierAddr = 0x0a490C2C99a3002E5cf91caeB8049aE55f8F4EdD;
        admin = msg.sender;
    }

    function verifyIdentity(
        uint identityNullifier,
        uint userNullifier,
        uint timestamp,
        uint signal,
        uint[8] memory groth16Proof
    ) public {
        require(
            IAnonAadhaar(anonAadhaarVerifierAddr).verifyAnonAadhaarProof(
                identityNullifier,
                userNullifier,
                timestamp,
                signal,
                groth16Proof
            ) == true,
            "Proof sent is not valid."
        );
        verifiedNullifiers[userNullifier] = true;
    }

    function changeVerifierAddress(address _newAdd) public {
        require(msg.sender == admin, "Only admin can verify");
        anonAadhaarVerifierAddr = _newAdd;
    }
}
