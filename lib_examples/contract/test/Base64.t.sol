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

        publicInputs[0] = bytes32(uint256(83));
        publicInputs[1] = bytes32(uint256(71));
        publicInputs[2] = bytes32(uint256(86));
        publicInputs[3] = bytes32(uint256(115));
        publicInputs[4] = bytes32(uint256(98));
        publicInputs[5] = bytes32(uint256(71));
        publicInputs[6] = bytes32(uint256(56));
        publicInputs[7] = bytes32(uint256(103));
        publicInputs[8] = bytes32(uint256(86));
        publicInputs[9] = bytes32(uint256(50));
        publicInputs[10] = bytes32(uint256(57));
        publicInputs[11] = bytes32(uint256(121));
        publicInputs[12] = bytes32(uint256(98));
        publicInputs[13] = bytes32(uint256(71));
        publicInputs[14] = bytes32(uint256(81));
        publicInputs[15] = bytes32(uint256(104));
    }

    function testVerifyProof() public {
        bytes memory proof = vm.readFileBinary(
            "../base64_example/target/proof"
        );

        console.log("Proof length:", proof.length);
        bool verified = starter.verifyBase64(proof, publicInputs);
        assertTrue(verified, "Proof verification failed");
    }
}