// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../Base64Verifier.sol";
import "../Verifier.sol";

contract StarterTest is Test {
    Base64Verifier public starter;
    HonkVerifier public verifier;
    bytes32[] public publicInputs = new bytes32[](16);

    function setUp() public {
        verifier = new HonkVerifier();
        starter = new Base64Verifier(verifier);

        publicInputs[0] = bytes32(uint256(72));
        publicInputs[1] = bytes32(uint256(101));
        publicInputs[2] = bytes32(uint256(108));
        publicInputs[3] = bytes32(uint256(108));
        publicInputs[4] = bytes32(uint256(111));
        publicInputs[5] = bytes32(uint256(32));
        publicInputs[6] = bytes32(uint256(87));
        publicInputs[7] = bytes32(uint256(111));
        publicInputs[8] = bytes32(uint256(114));
        publicInputs[9] = bytes32(uint256(108));
        publicInputs[10] = bytes32(uint256(100));
        publicInputs[11] = bytes32(uint256(33));
        publicInputs[12] = bytes32(uint256(0));
        publicInputs[13] = bytes32(uint256(0));
        publicInputs[14] = bytes32(uint256(0));
        publicInputs[15] = bytes32(uint256(0));
    }

    function testVerifyProof() public {
        bytes memory proof = vm.readFileBinary("../base64_example/target/proof");

        console.log("Proof length:", proof.length);
        bool verified = starter.verifyBase64(proof, publicInputs);
        assertTrue(verified, "Proof verification failed");
    }
}
