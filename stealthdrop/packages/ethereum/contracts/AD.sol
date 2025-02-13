pragma solidity ^0.8.0;

import { ERC20 } from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '../../noir/target/stealthdrop.sol';
import 'hardhat/console.sol';

error DoubleClaim();

contract AD is ERC20 {
    bytes8 public signThis;
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
        bytes8 _signThis,
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
        uint256 offset,
        uint256 length
    ) private pure returns (bytes32[] memory) {
        for (uint256 i = 0; i < length; i++) {
            _publicInputs[i + offset] = (publicInput >> ((31 - i) * 8)) & bytes32(uint256(0xFF));
        }
        return _publicInputs;
    }

    function concatenateNullifier(bytes32 x, bytes32 y) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(x, y));
    }

    function claim(bytes calldata proof, bytes32 nullifier_x, bytes32 nullifier_y) external noDoubleClaim(concatenateNullifier(nullifier_x, nullifier_y)) {
        bytes32[] memory _publicInputs = new bytes32[](74);
        _publicInputs = preparePublicInputs(_publicInputs, signThis, 0, 8);
        _publicInputs = preparePublicInputs(_publicInputs, nullifier_x, 8, 32);
        _publicInputs = preparePublicInputs(_publicInputs, nullifier_y, 40, 32);
        _publicInputs[72] = merkleRoot;
        _publicInputs[73] = bytes32(uint256(uint160(msg.sender)));

        verifier.verify(proof, _publicInputs);

        _transfer(address(this), msg.sender, 3500000000000000000);
        emit TokensAirdropped(msg.sender, 3500000000000000000);
        nullifiers[concatenateNullifier(nullifier_x, nullifier_y)] = true;
    }

    function getRoot() public view returns (bytes32) {
        return merkleRoot;
    }

    function getMessage() public view returns (bytes32) {
        return signThis;
    }
}
