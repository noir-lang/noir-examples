// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Starter} from "../Starter.sol";

contract VerifyProofScript is Script {
    function setUp() public {}

    function run() public {
        // Retrieve private key from environment variable
        (address deployer, uint256 privateKey) = deriveRememberKey(vm.envString("MNEMONIC"), 0);
        
        // Start broadcasting transactions
        vm.startBroadcast(deployer);

        Starter starter = Starter(vm.envAddress("STARTER_ADDRESS"));
        console2.log("Using starter at:", address(starter));

        bytes memory proof = vm.readFileBinary("./circuits/target/proof-clean");
        bytes32[] memory publicInputs = new bytes32[](1);
        publicInputs[0] = bytes32(0x0000000000000000000000000000000000000000000000000000000000000003);

        starter.verifyEqual(proof, publicInputs);

        vm.stopBroadcast();
    }
}


contract GetVerifiedCount is Script {
    function setUp() public {}

    function run() public {
        Starter starter = Starter(vm.envAddress("STARTER_ADDRESS"));
        console2.log("Using starter at:", address(starter));

        console2.log("verified count", starter.getVerifiedCount());
    }
}
