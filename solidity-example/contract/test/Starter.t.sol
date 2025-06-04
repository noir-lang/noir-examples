pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../Starter.sol";
import "../Verifier.sol";

contract StarterTest is Test {
    Starter public starter;
    HonkVerifier public verifier;
    bytes32[] public publicInputs = new bytes32[](1);

    function setUp() public {
        verifier = new HonkVerifier();
        starter = new Starter(verifier);

        publicInputs[0] = bytes32(0x0000000000000000000000000000000000000000000000000000000000000003);
    }

    function testVerifyProof() public {
        bytes memory proof = vm.readFileBinary(
            "../circuits/target/proof"
        );

        console.log("Proof length:", proof.length);
        starter.verifyEqual(proof, publicInputs);
    }
}
