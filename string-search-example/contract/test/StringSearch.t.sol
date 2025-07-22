// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../StringSearchVerifier.sol";
import "../Verifier.sol";

contract StarterTest is Test {
    StringSearchVerifier public starter;
    HonkVerifier public verifier;
    bytes32[] public publicInputs = new bytes32[](2);

    function setUp() public {
        verifier = new HonkVerifier();
        starter = new StringSearchVerifier(verifier);

       publicInputs[0] = bytes32(0x0000000000000000000000000000000000000000000000000000000000000001);
       publicInputs[1] = bytes32(0x0000000000000000000000000000000000000000000000000000000000000006);
    }

    function testVerifyProof() public {
        bytes memory proof = vm.readFileBinary("../circuits/target/proof");

        console.log("Proof length:", proof.length);
        bool verified = starter.verifyStringSearch(proof, publicInputs);
        assertTrue(verified, "Proof verification failed");
    }
}