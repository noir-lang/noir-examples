// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../Starter.sol";
import "../Verifier.sol";

contract StarterTest is Test {
    Starter public starter;
    HonkVerifier public verifier;
    bytes32[] public publicInputs;

    function setUp() public {
        verifier = new HonkVerifier();
        starter = new Starter(verifier);

        publicInputs.push(bytes32(uint256(3)));  // y = 3
        publicInputs.push(bytes32(uint256(9)));  // expected = 9
    }

    function testVerifyProof() public {
        bytes memory proof = vm.readFileBinary("../circuits/target/proof");

        console.log("Proof length:", proof.length);
        starter.verifyEqual(proof, publicInputs);
    }
  function testRejectsInvalidProof() public {
    // Load a valid proof
    bytes memory proof = vm.readFileBinary("../circuits/target/proof");

    // Load and decode public inputs as bytes32[], avoiding name shadowing
    string memory publicInputsJson = vm.readFile("../circuits/target/public-inputs");
    bytes32[] memory inputs = abi.decode(vm.parseJson(publicInputsJson), (bytes32[]));

    // Corrupt the proof (e.g., flip the last byte)
    proof[proof.length - 1] = bytes1(uint8(proof[proof.length - 1]) ^ 0x01);

    // Expect the verifier to revert due to invalid proof
    vm.expectRevert();
    starter.verifyEqual(proof, inputs);
}

}
