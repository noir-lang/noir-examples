// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Verifier.sol"; // This should be your Noir/Barretenberg-generated verifier

contract Base64Verifier {
    HonkVerifier public verifier;
    uint256 public verifiedCount;

    event ProofVerified(address indexed sender);

    constructor(HonkVerifier _verifier) {
        verifier = _verifier;
    }

    function getVerifiedCount() public view returns (uint256) {
        return verifiedCount;
    }

    function verifyBase64(bytes calldata proof, bytes32[] calldata publicInputs) public returns (bool) {
        bool proofResult = verifier.verify(proof, publicInputs);
        require(proofResult, "Proof is not valid");
        verifiedCount++;
        emit ProofVerified(msg.sender);
        return proofResult;
    }
}
