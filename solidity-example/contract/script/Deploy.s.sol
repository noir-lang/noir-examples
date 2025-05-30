// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Starter} from "../Starter.sol";
import {HonkVerifier} from "../Verifier.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        // Retrieve private key from environment variable
        (address deployer, uint256 privateKey) = deriveRememberKey(vm.envString("MNEMONIC"), 0);
        
        // Start broadcasting transactions
        vm.startBroadcast(deployer);

        // Deploy Verifier first
        HonkVerifier verifier = new HonkVerifier();
        console2.log("Verifier deployed at:", address(verifier));

        // Deploy Starter with Verifier address
        Starter starter = new Starter(verifier);
        console2.log("Starter deployed at:", address(starter));

        vm.stopBroadcast();
    }
} 