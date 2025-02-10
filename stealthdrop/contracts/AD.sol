pragma solidity ^0.8.0;

import { ERC20 } from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '../noir/target/stealthdrop.sol';
import 'hardhat/console.sol';

error DoubleClaim();

contract AD is ERC20 {
    bytes32 public signThis;
    bytes32 public merkleRoot;
    HonkVerifier public verifier;

    uint256 public airdropAmount;

    mapping(bytes32 => bool) public nullifiers; // Keep track of claimed Merkle roots
    event TokensAirdropped(address indexed recipient, uint256 amount);

    modifier noDoubleClaim(bytes32 nullifier) {
        require(!nullifiers[nullifier], DoubleClaim());
        _;
    }

    constructor(
        bytes32 _merkleRoot,
        bytes32 _signThis,
        HonkVerifier _verifier,
        uint256 _airdropAmount
    ) ERC20('Airdrop', 'ADRP') {
        merkleRoot = _merkleRoot;
        signThis = _signThis;
        verifier = _verifier;

        airdropAmount = _airdropAmount;
        _mint(address(this), airdropAmount);
    }

    function preparePublicInputs(
        bytes32[] memory _publicInputs,
        bytes32 publicInput,
        uint256 offset
    ) private pure returns (bytes32[] memory) {
        for (uint256 i = 0; i < 32; i++) {
            _publicInputs[i + offset] = (publicInput >> ((31 - i) * 8)) & bytes32(uint256(0xFF));
        }
        return _publicInputs;
    }

    function claim(bytes calldata proof, bytes32 nullifier) external {
        bytes32[] memory _publicInputs = new bytes32[](35);
        _publicInputs = preparePublicInputs(_publicInputs, signThis, 0);
        _publicInputs[32] = nullifier;
        _publicInputs[33] = merkleRoot;
        _publicInputs[34] = bytes32(uint256(uint160(msg.sender)));
        console.logBytes32(_publicInputs[0]);
        console.logBytes32(_publicInputs[1]);
        console.logBytes32(_publicInputs[32]);
        console.logBytes32(_publicInputs[33]);
        console.logBytes32(_publicInputs[34]);

        verifier.verify(proof, _publicInputs);

        _transfer(address(this), msg.sender, 1);
        emit TokensAirdropped(msg.sender, 1);
        nullifiers[nullifier] = true;
    }

    function getRoot() public view returns (bytes32) {
        return merkleRoot;
    }

    function getMessage() public view returns (bytes32) {
        return signThis;
    }
}
