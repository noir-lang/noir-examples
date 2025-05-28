pragma solidity ^0.8.17;

import "./Verifier.sol";

contract Starter {
    HonkVerifier public verifier;

    uint256 public verifiedCount;

    constructor(HonkVerifier _verifier) {
        verifier = _verifier;
    }

    function getVerifiedCount() public view returns (uint256) {
        return verifiedCount;
    }

    function verifyEqual(bytes calldata proof, bytes32[] calldata y) public returns (bool) {
        bool proofResult = verifier.verify(proof, y);
        require(proofResult, "Proof is not valid");
        verifiedCount++;
        return proofResult;
    }
}
