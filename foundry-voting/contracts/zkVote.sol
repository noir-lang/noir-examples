// https://gist.github.com/Turupawn/6a4391fb54d09aae7a091ad2478c1f62#file-zkvoting-sol

//SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import {UltraVerifier} from "../circuits/contract/foundry_voting/plonk_vk.sol";

contract zkVote {
    UltraVerifier verifier;

    struct Proposal {
        string description;
        uint256 deadline;
        uint256 forVotes;
        uint256 againstVotes;
    }

    bytes32 merkleRoot;
    uint256 proposalCount;
    mapping(uint256 proposalId => Proposal) public proposals;
    mapping(bytes32 hash => bool isNullified) nullifiers;

    constructor(bytes32 _merkleRoot, address _verifier) {
        merkleRoot = _merkleRoot;
        verifier = UltraVerifier(_verifier);
    }

    function propose(string memory description, uint256 deadline) public returns (uint256) {
        proposals[proposalCount] = Proposal(description, deadline, 0, 0);
        proposalCount += 1;
        return proposalCount;
    }

    /// @param vote - Must be "1" to count as a forVote
    function castVote(bytes calldata proof, uint256 proposalId, uint256 vote, bytes32 nullifierHash)
        public
        returns (bool)
    {
        require(!nullifiers[nullifierHash], "Proof has been already submitted");
        require(block.timestamp < proposals[proposalId].deadline, "Voting period is over.");
        nullifiers[nullifierHash] = true;

        bytes32[] memory publicInputs = new bytes32[](4);
        publicInputs[0] = merkleRoot;
        publicInputs[1] = bytes32(proposalId);
        publicInputs[2] = bytes32(vote);
        publicInputs[3] = nullifierHash;
        require(verifier.verify(proof, publicInputs), "Invalid proof");

        if (vote == 1) {
            proposals[proposalId].forVotes += 1;
        } // vote = 0
        else {
            proposals[proposalId].againstVotes += 1;
        }

        return true;
    }
}
