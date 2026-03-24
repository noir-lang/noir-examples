// SPDX-License-Identifier: Apache-2.0
// Copyright 2022 Aztec
pragma solidity >=0.8.21;

uint256 constant N = 64;
uint256 constant LOG_N = 6;
uint256 constant NUMBER_OF_PUBLIC_INPUTS = 9;
uint256 constant VK_HASH = 0x26e82c286bffd6a555f72eb511dce129570d5652e49c2742ffdbc6b4cb1c7e52;
library HonkVerificationKey {
    function loadVerificationKey() internal pure returns (Honk.VerificationKey memory) {
        Honk.VerificationKey memory vk = Honk.VerificationKey({
            circuitSize: uint256(64),
            logCircuitSize: uint256(6),
            publicInputsSize: uint256(9),
            ql: Honk.G1Point({ 
               x: uint256(0x204d07cb1b7952ff60e258ea8baa7334a7f84f64493adaf385d76a5a9f130084),
               y: uint256(0x130a05fd110bff20b20cffc4dfb8f44b77a8dc57c9ecf9cf510506a9e551b32f)
            }),
            qr: Honk.G1Point({ 
               x: uint256(0x09a3146efd7c9a42a9cf92e5869243c7fed0b9c6ea29c82366c80aaaef7eb187),
               y: uint256(0x07ad437ebad3b7c87e07e39c7d114c351728a95c9059d1acb0a487d7a2b3ade4)
            }),
            qo: Honk.G1Point({ 
               x: uint256(0x1a39e9e8ab6f3381263341031034b62dc993f0538d07d1544b9ae9503775bd2f),
               y: uint256(0x05d7163a792eb98926decafe95906a21c7a2d33dd2b734f0f4babcd499e6c9fc)
            }),
            q4: Honk.G1Point({ 
               x: uint256(0x2c2b05a49b25c71848061f721b0e52bb0e4ad8256760164511649027827b2468),
               y: uint256(0x177cfc8a9f03ba7a0fdf0b99899778d2e0cfa24df62aeb0b250c6b8ce4bce249)
            }),
            qm: Honk.G1Point({ 
               x: uint256(0x22eeeba10d2242b6acaa62a08b7472d17d465e1e7994040c4c60491f7e6e1a8f),
               y: uint256(0x249edb4bfd190775cfc40e2c44ef0e080ce7efdfa755ff14da11d9e4294548ae)
            }),
            qc: Honk.G1Point({ 
               x: uint256(0x2069d403d1c6d8248818769168e51677601b939069f1ef07f84aab816f0bfa15),
               y: uint256(0x134dc5175f8d39aabc2a8dc5e94a2fb72c6c6809bbe44c6666fbe4006eb3807b)
            }),
            qLookup: Honk.G1Point({ 
               x: uint256(0x22011c91613251ef53fd12a397e4bd6165b1ed309dcd94b33ac4226d34b68889),
               y: uint256(0x1fb02875a3542a3a6f4426ad912b70cf32b444a8e439701da6e8e7b30029cfc7)
            }),
            qArith: Honk.G1Point({ 
               x: uint256(0x1b75189030b0a9239deb5e7ff892437009f496fce6d38cce49b6d02ff51e850f),
               y: uint256(0x19164ec687c3884d9141b7302d8dd7d6bbfb7fc8a938b52dea0bcfc83461fab0)
            }),
            qDeltaRange: Honk.G1Point({ 
               x: uint256(0x2531a51ad54f124d58094b219818d2c9f189f2a91aeb664ce376d8b157ba98f8),
               y: uint256(0x272da4396fb2a7ee0638b9140e523def1e6db71809307f677677e62b4163f556)
            }),
            qElliptic: Honk.G1Point({ 
               x: uint256(0x07db77b3e04b7eba9643da57cbbe4d2e54c0244a7732c87bc4712a76dd8c83fb),
               y: uint256(0x0466fa9b57ec4664abd1505b490862e0dfe1ddd7f74ae0d636c910c3e85830d8)
            }),
            qMemory: Honk.G1Point({ 
               x: uint256(0x236e982930a9984fd08a3edddf25a1677bd789aa094b735f2abf3d9cfd032188),
               y: uint256(0x2ddf6475059b2e9451db5b8d857bffc07a966aebd836d8a800f54b1c3bb5c36f)
            }),
            qNnf: Honk.G1Point({ 
               x: uint256(0x140b0936c323fd2471155617b6af56ee40d90bea71fba7a412dd61fcf34e8ceb),
               y: uint256(0x2b6c10790a5f6631c87d652e059df42b90071823185c5ff8e440fd3d73b6fefc)
            }),
            qPoseidon2External: Honk.G1Point({ 
               x: uint256(0x1f497cbf5284ff29a2d336e599199929a17181c7934fc3fdbd352eac5cb521b9),
               y: uint256(0x13ea38a0bd2aa751a490a724fac818072bd9c0c6beda1fdee6d4ff0432ba9e1b)
            }),
            qPoseidon2Internal: Honk.G1Point({ 
               x: uint256(0x0384638dd92e0abd1d0455ad4b429bee5960e2f4e0eef28e946561e55a4d9807),
               y: uint256(0x0edd0d417777cdfe14def171f26ffd8849f800a9aa2563c403966bb405f3a5d3)
            }),
            s1: Honk.G1Point({ 
               x: uint256(0x12f8e35d13fd26c43665bbebeade1a7cc2514d64f5e92f023b78339032c12cde),
               y: uint256(0x1935d9696bd9dede03462aec467d1fbe4d7c31f6e071cd09a0826246162a4df7)
            }),
            s2: Honk.G1Point({ 
               x: uint256(0x25638c194723ebd738e691c9f70cfb0873796af23607223284d01f1f35b812dd),
               y: uint256(0x169b174a385a350f6f94438678e92801e2280483b1d4147fdf4b610bee160415)
            }),
            s3: Honk.G1Point({ 
               x: uint256(0x26fb68efea879621ff36fb6f10deae1b079f524cfa81c5dbea792531eef68ecb),
               y: uint256(0x19ea37d7e31fb3ae63bfaac93b278128106567dd88afbcd31be9fc9466e821a2)
            }),
            s4: Honk.G1Point({ 
               x: uint256(0x07c6228bbb9a1f08a2e139689b74f07270951a151fb60c024e6ac66bb4e3608b),
               y: uint256(0x11d31b34d8c6e5b72d14ffa572e97e8fa44f9235a9f0823bba513e52bf4d3c4d)
            }),
            t1: Honk.G1Point({ 
               x: uint256(0x099e3bd5a0a00ab7fe18040105b9b395b5d8b7b4a63b05df652b0d10ef146d26),
               y: uint256(0x0015b8d2515d76e2ccec99dcd194592129af3a637f5a622a32440f860d1e2a7f)
            }),
            t2: Honk.G1Point({ 
               x: uint256(0x1b917517920bad3d8bc01c9595092a222b888108dc25d1aa450e0b4bc212c37e),
               y: uint256(0x305e8992b148eedb22e6e992077a84482141c7ebe42000a1d58ccb74381f6d19)
            }),
            t3: Honk.G1Point({ 
               x: uint256(0x16465a5ccbb550cd2c63bd58116fe47c86847618681dc29d8a9363ab7c40e1c3),
               y: uint256(0x2e24d420fbf9508ed31de692db477b439973ac12d7ca796d6fe98ca40e6ca6b7)
            }),
            t4: Honk.G1Point({ 
               x: uint256(0x043d063b130adfb37342af45d0155a28edd1a7e46c840d9c943fdf45521c64ce),
               y: uint256(0x261522c4089330646aff96736194949330952ae74c573d1686d9cb4a00733854)
            }),
            id1: Honk.G1Point({ 
               x: uint256(0x219b27e976091b06e9ba0f40861225d2f7ca4fc91a64ebfc84dcbb49600fb9ba),
               y: uint256(0x06417e7983c058add2429be318adbb55e11e20c106e220f37bd946729b93d3f4)
            }),
            id2: Honk.G1Point({ 
               x: uint256(0x110156928406e75f352e4afcb09743fa72bb6bfa039f5e6d48c74cee42ff3281),
               y: uint256(0x2a28fc7d540b672b77937e407a0d1d19c8731dc5f6a9809bb1d746360e4dce26)
            }),
            id3: Honk.G1Point({ 
               x: uint256(0x129aacb1261a6b8c3d9ca8949afb664cf7bbb1b54d0e7c02385f93ea70a7dcb4),
               y: uint256(0x10cfa8dee03ee0a89f71b575046b1e9592d1a4ab61c824a8bfd2e2167244682e)
            }),
            id4: Honk.G1Point({ 
               x: uint256(0x1f625ebf60099c5fa2b625e345bdd93391e0d6eb04c2f4784b55ee21c85de19a),
               y: uint256(0x168c220f16c06df63220aca80e682ab3451697afbc7179e0443b11a43b0bf4e0)
            }),
            lagrangeFirst: Honk.G1Point({ 
               x: uint256(0x0000000000000000000000000000000000000000000000000000000000000001),
               y: uint256(0x0000000000000000000000000000000000000000000000000000000000000002)
            }),
            lagrangeLast: Honk.G1Point({ 
               x: uint256(0x1a81d9ac52aa2a7fde7ee8b78f3606a35a8758e8de801673cea21e9a03b7ff4a),
               y: uint256(0x1d22d13122365e7ce6b1015f81eb2ba0e7fc566a64737406aeeabe279ece22ba)
            })
        });
        return vk;
    }
}

pragma solidity ^0.8.27;

interface IVerifier {
    function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool);
}

/**
 * @notice  Library of error codes
 * @dev     You can run `forge inspect Errors errors` to get the selectors for the optimised verifier
 */
library Errors {
    error ValueGeLimbMax();
    error ValueGeGroupOrder();
    error ValueGeFieldOrder();

    error InvertOfZero();
    error NotPowerOfTwo();
    error ModExpFailed();

    error ProofLengthWrong();
    error ProofLengthWrongWithLogN(uint256 logN, uint256 actualLength, uint256 expectedLength);
    error PublicInputsLengthWrong();
    error SumcheckFailed();
    error ShpleminiFailed();

    error PointAtInfinity();

    error ConsistencyCheckFailed();
    error GeminiChallengeInSubgroup();
}

type Fr is uint256;

using {add as +} for Fr global;
using {sub as -} for Fr global;
using {mul as *} for Fr global;

using {notEqual as !=} for Fr global;
using {equal as ==} for Fr global;

uint256 constant SUBGROUP_SIZE = 256;
uint256 constant MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617; // Prime field order
uint256 constant P = MODULUS;
Fr constant SUBGROUP_GENERATOR = Fr.wrap(0x07b0c561a6148404f086204a9f36ffb0617942546750f230c893619174a57a76);
Fr constant SUBGROUP_GENERATOR_INVERSE = Fr.wrap(0x204bd3277422fad364751ad938e2b5e6a54cf8c68712848a692c553d0329f5d6);
Fr constant MINUS_ONE = Fr.wrap(MODULUS - 1);
Fr constant ONE = Fr.wrap(1);
Fr constant ZERO = Fr.wrap(0);
// Instantiation

library FrLib {
    bytes4 internal constant FRLIB_MODEXP_FAILED_SELECTOR = 0xf8d61709;

    function invert(Fr value) internal view returns (Fr) {
        uint256 v = Fr.unwrap(value);
        require(v != 0, Errors.InvertOfZero());

        uint256 result;

        // Call the modexp precompile to invert in the field
        assembly {
            let free := mload(0x40)
            mstore(free, 0x20)
            mstore(add(free, 0x20), 0x20)
            mstore(add(free, 0x40), 0x20)
            mstore(add(free, 0x60), v)
            mstore(add(free, 0x80), sub(MODULUS, 2)) 
            mstore(add(free, 0xa0), MODULUS)
            let success := staticcall(gas(), 0x05, free, 0xc0, 0x00, 0x20)
            if iszero(success) {
                mstore(0x00, FRLIB_MODEXP_FAILED_SELECTOR)
                revert(0, 0x04)
            }
            result := mload(0x00)
            mstore(0x40, add(free, 0xc0))
        }

        return Fr.wrap(result);
    }

    function pow(Fr base, uint256 v) internal view returns (Fr) {
        uint256 b = Fr.unwrap(base);
        // Only works for power of 2
        require(v > 0 && (v & (v - 1)) == 0, Errors.NotPowerOfTwo());
        uint256 result;

        // Call the modexp precompile to invert in the field
        assembly {
            let free := mload(0x40)
            mstore(free, 0x20)
            mstore(add(free, 0x20), 0x20)
            mstore(add(free, 0x40), 0x20)
            mstore(add(free, 0x60), b)
            mstore(add(free, 0x80), v) 
            mstore(add(free, 0xa0), MODULUS)
            let success := staticcall(gas(), 0x05, free, 0xc0, 0x00, 0x20)
            if iszero(success) {
                mstore(0x00, FRLIB_MODEXP_FAILED_SELECTOR)
                revert(0, 0x04)
            }
            result := mload(0x00)
            mstore(0x40, add(free, 0xc0))
        }

        return Fr.wrap(result);
    }

    function div(Fr numerator, Fr denominator) internal view returns (Fr) {
        unchecked {
            return numerator * invert(denominator);
        }
    }

    function sqr(Fr value) internal pure returns (Fr) {
        unchecked {
            return value * value;
        }
    }

    function unwrap(Fr value) internal pure returns (uint256) {
        unchecked {
            return Fr.unwrap(value);
        }
    }

    function neg(Fr value) internal pure returns (Fr) {
        unchecked {
            return Fr.wrap(MODULUS - Fr.unwrap(value));
        }
    }

    function from(uint256 value) internal pure returns (Fr) {
        unchecked {
            require(value < MODULUS, Errors.ValueGeFieldOrder());
            return Fr.wrap(value);
        }
    }

    function fromBytes32(bytes32 value) internal pure returns (Fr) {
        unchecked {
            uint256 v = uint256(value);
            require(v < MODULUS, Errors.ValueGeFieldOrder());
            return Fr.wrap(v);
        }
    }

    function toBytes32(Fr value) internal pure returns (bytes32) {
        unchecked {
            return bytes32(Fr.unwrap(value));
        }
    }
}

// Free functions
function add(Fr a, Fr b) pure returns (Fr) {
    unchecked {
        return Fr.wrap(addmod(Fr.unwrap(a), Fr.unwrap(b), MODULUS));
    }
}

function mul(Fr a, Fr b) pure returns (Fr) {
    unchecked {
        return Fr.wrap(mulmod(Fr.unwrap(a), Fr.unwrap(b), MODULUS));
    }
}

function sub(Fr a, Fr b) pure returns (Fr) {
    unchecked {
        return Fr.wrap(addmod(Fr.unwrap(a), MODULUS - Fr.unwrap(b), MODULUS));
    }
}

function notEqual(Fr a, Fr b) pure returns (bool) {
    unchecked {
        return Fr.unwrap(a) != Fr.unwrap(b);
    }
}

function equal(Fr a, Fr b) pure returns (bool) {
    unchecked {
        return Fr.unwrap(a) == Fr.unwrap(b);
    }
}

uint256 constant CONST_PROOF_SIZE_LOG_N = 28;

uint256 constant NUMBER_OF_SUBRELATIONS = 28;
uint256 constant BATCHED_RELATION_PARTIAL_LENGTH = 8;
uint256 constant ZK_BATCHED_RELATION_PARTIAL_LENGTH = 9;
uint256 constant NUMBER_OF_ENTITIES = 41;
// The number of entities added for ZK (gemini_masking_poly)
uint256 constant NUM_MASKING_POLYNOMIALS = 1;
uint256 constant NUMBER_OF_ENTITIES_ZK = NUMBER_OF_ENTITIES + NUM_MASKING_POLYNOMIALS;
uint256 constant NUMBER_UNSHIFTED = 36;
uint256 constant NUMBER_UNSHIFTED_ZK = NUMBER_UNSHIFTED + NUM_MASKING_POLYNOMIALS;
uint256 constant NUMBER_TO_BE_SHIFTED = 5;
uint256 constant PAIRING_POINTS_SIZE = 8;

uint256 constant FIELD_ELEMENT_SIZE = 0x20;
uint256 constant GROUP_ELEMENT_SIZE = 0x40;

// Powers of alpha used to batch subrelations (alpha, alpha^2, ..., alpha^(NUM_SUBRELATIONS-1))
uint256 constant NUMBER_OF_ALPHAS = NUMBER_OF_SUBRELATIONS - 1;

// ENUM FOR WIRES
enum WIRE {
    Q_M,
    Q_C,
    Q_L,
    Q_R,
    Q_O,
    Q_4,
    Q_LOOKUP,
    Q_ARITH,
    Q_RANGE,
    Q_ELLIPTIC,
    Q_MEMORY,
    Q_NNF,
    Q_POSEIDON2_EXTERNAL,
    Q_POSEIDON2_INTERNAL,
    SIGMA_1,
    SIGMA_2,
    SIGMA_3,
    SIGMA_4,
    ID_1,
    ID_2,
    ID_3,
    ID_4,
    TABLE_1,
    TABLE_2,
    TABLE_3,
    TABLE_4,
    LAGRANGE_FIRST,
    LAGRANGE_LAST,
    W_L,
    W_R,
    W_O,
    W_4,
    Z_PERM,
    LOOKUP_INVERSES,
    LOOKUP_READ_COUNTS,
    LOOKUP_READ_TAGS,
    W_L_SHIFT,
    W_R_SHIFT,
    W_O_SHIFT,
    W_4_SHIFT,
    Z_PERM_SHIFT
}

library Honk {
    struct G1Point {
        uint256 x;
        uint256 y;
    }

    struct VerificationKey {
        // Misc Params
        uint256 circuitSize;
        uint256 logCircuitSize;
        uint256 publicInputsSize;
        // Selectors
        G1Point qm;
        G1Point qc;
        G1Point ql;
        G1Point qr;
        G1Point qo;
        G1Point q4;
        G1Point qLookup; // Lookup
        G1Point qArith; // Arithmetic widget
        G1Point qDeltaRange; // Delta Range sort
        G1Point qMemory; // Memory
        G1Point qNnf; // Non-native Field
        G1Point qElliptic; // Auxillary
        G1Point qPoseidon2External;
        G1Point qPoseidon2Internal;
        // Copy constraints
        G1Point s1;
        G1Point s2;
        G1Point s3;
        G1Point s4;
        // Copy identity
        G1Point id1;
        G1Point id2;
        G1Point id3;
        G1Point id4;
        // Precomputed lookup table
        G1Point t1;
        G1Point t2;
        G1Point t3;
        G1Point t4;
        // Fixed first and last
        G1Point lagrangeFirst;
        G1Point lagrangeLast;
    }

    struct RelationParameters {
        // challenges
        Fr eta;
        Fr beta;
        Fr gamma;
        // derived
        Fr publicInputsDelta;
    }

    struct Proof {
        // Pairing point object
        Fr[PAIRING_POINTS_SIZE] pairingPointObject;
        // Free wires
        G1Point w1;
        G1Point w2;
        G1Point w3;
        G1Point w4;
        // Lookup helpers - Permutations
        G1Point zPerm;
        // Lookup helpers - logup
        G1Point lookupReadCounts;
        G1Point lookupReadTags;
        G1Point lookupInverses;
        // Sumcheck
        Fr[BATCHED_RELATION_PARTIAL_LENGTH][CONST_PROOF_SIZE_LOG_N] sumcheckUnivariates;
        Fr[NUMBER_OF_ENTITIES] sumcheckEvaluations;
        // Shplemini
        G1Point[CONST_PROOF_SIZE_LOG_N - 1] geminiFoldComms;
        Fr[CONST_PROOF_SIZE_LOG_N] geminiAEvaluations;
        G1Point shplonkQ;
        G1Point kzgQuotient;
    }

    /// forge-lint: disable-next-item(pascal-case-struct)
    struct ZKProof {
        // Pairing point object
        Fr[PAIRING_POINTS_SIZE] pairingPointObject;
        // ZK: Gemini masking polynomial commitment (sent first, right after public inputs)
        G1Point geminiMaskingPoly;
        // Commitments to wire polynomials
        G1Point w1;
        G1Point w2;
        G1Point w3;
        G1Point w4;
        // Commitments to logup witness polynomials
        G1Point lookupReadCounts;
        G1Point lookupReadTags;
        G1Point lookupInverses;
        // Commitment to grand permutation polynomial
        G1Point zPerm;
        G1Point[3] libraCommitments;
        // Sumcheck
        Fr libraSum;
        Fr[ZK_BATCHED_RELATION_PARTIAL_LENGTH][CONST_PROOF_SIZE_LOG_N] sumcheckUnivariates;
        Fr libraEvaluation;
        Fr[NUMBER_OF_ENTITIES_ZK] sumcheckEvaluations; // Includes gemini_masking_poly eval at index 0 (first position)
        // Shplemini
        G1Point[CONST_PROOF_SIZE_LOG_N - 1] geminiFoldComms;
        Fr[CONST_PROOF_SIZE_LOG_N] geminiAEvaluations;
        Fr[4] libraPolyEvals;
        G1Point shplonkQ;
        G1Point kzgQuotient;
    }
}

// ZKTranscript library to generate fiat shamir challenges, the ZK transcript only differest
/// forge-lint: disable-next-item(pascal-case-struct)
struct ZKTranscript {
    // Oink
    Honk.RelationParameters relationParameters;
    Fr[NUMBER_OF_ALPHAS] alphas; // Powers of alpha: [alpha, alpha^2, ..., alpha^(NUM_SUBRELATIONS-1)]
    Fr[CONST_PROOF_SIZE_LOG_N] gateChallenges;
    // Sumcheck
    Fr libraChallenge;
    Fr[CONST_PROOF_SIZE_LOG_N] sumCheckUChallenges;
    // Shplemini
    Fr rho;
    Fr geminiR;
    Fr shplonkNu;
    Fr shplonkZ;
    // Derived
    Fr publicInputsDelta;
}

library ZKTranscriptLib {
    function generateTranscript(
        Honk.ZKProof memory proof,
        bytes32[] calldata publicInputs,
        uint256 vkHash,
        uint256 publicInputsSize,
        uint256 logN
    ) external pure returns (ZKTranscript memory t) {
        Fr previousChallenge;
        (t.relationParameters, previousChallenge) =
            generateRelationParametersChallenges(proof, publicInputs, vkHash, publicInputsSize, previousChallenge);

        (t.alphas, previousChallenge) = generateAlphaChallenges(previousChallenge, proof);

        (t.gateChallenges, previousChallenge) = generateGateChallenges(previousChallenge, logN);
        (t.libraChallenge, previousChallenge) = generateLibraChallenge(previousChallenge, proof);
        (t.sumCheckUChallenges, previousChallenge) = generateSumcheckChallenges(proof, previousChallenge, logN);

        (t.rho, previousChallenge) = generateRhoChallenge(proof, previousChallenge);

        (t.geminiR, previousChallenge) = generateGeminiRChallenge(proof, previousChallenge, logN);

        (t.shplonkNu, previousChallenge) = generateShplonkNuChallenge(proof, previousChallenge, logN);

        (t.shplonkZ, previousChallenge) = generateShplonkZChallenge(proof, previousChallenge);
        return t;
    }

    function splitChallenge(Fr challenge) internal pure returns (Fr first, Fr second) {
        uint256 challengeU256 = uint256(Fr.unwrap(challenge));
        // Split into two equal 127-bit chunks (254/2)
        uint256 lo = challengeU256 & 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF; // 127 bits
        uint256 hi = challengeU256 >> 127;
        first = FrLib.from(lo);
        second = FrLib.from(hi);
    }

    function generateRelationParametersChallenges(
        Honk.ZKProof memory proof,
        bytes32[] calldata publicInputs,
        uint256 vkHash,
        uint256 publicInputsSize,
        Fr previousChallenge
    ) internal pure returns (Honk.RelationParameters memory rp, Fr nextPreviousChallenge) {
        (rp.eta, previousChallenge) = generateEtaChallenge(proof, publicInputs, vkHash, publicInputsSize);

        (rp.beta, rp.gamma, nextPreviousChallenge) = generateBetaGammaChallenges(previousChallenge, proof);
    }

    function generateEtaChallenge(
        Honk.ZKProof memory proof,
        bytes32[] calldata publicInputs,
        uint256 vkHash,
        uint256 publicInputsSize
    ) internal pure returns (Fr eta, Fr previousChallenge) {
        // Size: 1 (vkHash) + publicInputsSize + 8 (geminiMask(2) + 3 wires(6))
        bytes32[] memory round0 = new bytes32[](1 + publicInputsSize + 8);
        round0[0] = bytes32(vkHash);

        for (uint256 i = 0; i < publicInputsSize - PAIRING_POINTS_SIZE; i++) {
            require(uint256(publicInputs[i]) < P, Errors.ValueGeFieldOrder());
            round0[1 + i] = publicInputs[i];
        }
        for (uint256 i = 0; i < PAIRING_POINTS_SIZE; i++) {
            round0[1 + publicInputsSize - PAIRING_POINTS_SIZE + i] = FrLib.toBytes32(proof.pairingPointObject[i]);
        }

        // For ZK flavors: hash the gemini masking poly commitment (sent right after public inputs)
        round0[1 + publicInputsSize] = bytes32(proof.geminiMaskingPoly.x);
        round0[1 + publicInputsSize + 1] = bytes32(proof.geminiMaskingPoly.y);

        // Create the first challenge
        // Note: w4 is added to the challenge later on
        round0[1 + publicInputsSize + 2] = bytes32(proof.w1.x);
        round0[1 + publicInputsSize + 3] = bytes32(proof.w1.y);
        round0[1 + publicInputsSize + 4] = bytes32(proof.w2.x);
        round0[1 + publicInputsSize + 5] = bytes32(proof.w2.y);
        round0[1 + publicInputsSize + 6] = bytes32(proof.w3.x);
        round0[1 + publicInputsSize + 7] = bytes32(proof.w3.y);

        previousChallenge = FrLib.from(uint256(keccak256(abi.encodePacked(round0))) % P);
        (eta,) = splitChallenge(previousChallenge);
    }

    function generateBetaGammaChallenges(Fr previousChallenge, Honk.ZKProof memory proof)
        internal
        pure
        returns (Fr beta, Fr gamma, Fr nextPreviousChallenge)
    {
        bytes32[7] memory round1;
        round1[0] = FrLib.toBytes32(previousChallenge);
        round1[1] = bytes32(proof.lookupReadCounts.x);
        round1[2] = bytes32(proof.lookupReadCounts.y);
        round1[3] = bytes32(proof.lookupReadTags.x);
        round1[4] = bytes32(proof.lookupReadTags.y);
        round1[5] = bytes32(proof.w4.x);
        round1[6] = bytes32(proof.w4.y);

        nextPreviousChallenge = FrLib.from(uint256(keccak256(abi.encodePacked(round1))) % P);
        (beta, gamma) = splitChallenge(nextPreviousChallenge);
    }

    // Alpha challenges non-linearise the gate contributions
    function generateAlphaChallenges(Fr previousChallenge, Honk.ZKProof memory proof)
        internal
        pure
        returns (Fr[NUMBER_OF_ALPHAS] memory alphas, Fr nextPreviousChallenge)
    {
        // Generate the original sumcheck alpha 0 by hashing zPerm and zLookup
        uint256[5] memory alpha0;
        alpha0[0] = Fr.unwrap(previousChallenge);
        alpha0[1] = proof.lookupInverses.x;
        alpha0[2] = proof.lookupInverses.y;
        alpha0[3] = proof.zPerm.x;
        alpha0[4] = proof.zPerm.y;

        nextPreviousChallenge = FrLib.from(uint256(keccak256(abi.encodePacked(alpha0))) % P);
        Fr alpha;
        (alpha,) = splitChallenge(nextPreviousChallenge);

        // Compute powers of alpha for batching subrelations
        alphas[0] = alpha;
        for (uint256 i = 1; i < NUMBER_OF_ALPHAS; i++) {
            alphas[i] = alphas[i - 1] * alpha;
        }
    }

    function generateGateChallenges(Fr previousChallenge, uint256 logN)
        internal
        pure
        returns (Fr[CONST_PROOF_SIZE_LOG_N] memory gateChallenges, Fr nextPreviousChallenge)
    {
        previousChallenge = FrLib.from(uint256(keccak256(abi.encodePacked(Fr.unwrap(previousChallenge)))) % P);
        (gateChallenges[0],) = splitChallenge(previousChallenge);
        for (uint256 i = 1; i < logN; i++) {
            gateChallenges[i] = gateChallenges[i - 1] * gateChallenges[i - 1];
        }
        nextPreviousChallenge = previousChallenge;
    }

    function generateLibraChallenge(Fr previousChallenge, Honk.ZKProof memory proof)
        internal
        pure
        returns (Fr libraChallenge, Fr nextPreviousChallenge)
    {
        // 2 comm, 1 sum, 1 challenge
        uint256[4] memory challengeData;
        challengeData[0] = Fr.unwrap(previousChallenge);
        challengeData[1] = proof.libraCommitments[0].x;
        challengeData[2] = proof.libraCommitments[0].y;
        challengeData[3] = Fr.unwrap(proof.libraSum);
        nextPreviousChallenge = FrLib.from(uint256(keccak256(abi.encodePacked(challengeData))) % P);
        (libraChallenge,) = splitChallenge(nextPreviousChallenge);
    }

    function generateSumcheckChallenges(Honk.ZKProof memory proof, Fr prevChallenge, uint256 logN)
        internal
        pure
        returns (Fr[CONST_PROOF_SIZE_LOG_N] memory sumcheckChallenges, Fr nextPreviousChallenge)
    {
        for (uint256 i = 0; i < logN; i++) {
            Fr[ZK_BATCHED_RELATION_PARTIAL_LENGTH + 1] memory univariateChal;
            univariateChal[0] = prevChallenge;

            for (uint256 j = 0; j < ZK_BATCHED_RELATION_PARTIAL_LENGTH; j++) {
                univariateChal[j + 1] = proof.sumcheckUnivariates[i][j];
            }
            prevChallenge = FrLib.from(uint256(keccak256(abi.encodePacked(univariateChal))) % P);

            (sumcheckChallenges[i],) = splitChallenge(prevChallenge);
        }
        nextPreviousChallenge = prevChallenge;
    }

    // We add Libra claimed eval + 2 libra commitments (grand_sum, quotient)
    function generateRhoChallenge(Honk.ZKProof memory proof, Fr prevChallenge)
        internal
        pure
        returns (Fr rho, Fr nextPreviousChallenge)
    {
        uint256[NUMBER_OF_ENTITIES_ZK + 6] memory rhoChallengeElements;
        rhoChallengeElements[0] = Fr.unwrap(prevChallenge);
        uint256 i;
        for (i = 1; i <= NUMBER_OF_ENTITIES_ZK; i++) {
            rhoChallengeElements[i] = Fr.unwrap(proof.sumcheckEvaluations[i - 1]);
        }
        rhoChallengeElements[i] = Fr.unwrap(proof.libraEvaluation);
        i += 1;
        rhoChallengeElements[i] = proof.libraCommitments[1].x;
        rhoChallengeElements[i + 1] = proof.libraCommitments[1].y;
        i += 2;
        rhoChallengeElements[i] = proof.libraCommitments[2].x;
        rhoChallengeElements[i + 1] = proof.libraCommitments[2].y;

        nextPreviousChallenge = FrLib.from(uint256(keccak256(abi.encodePacked(rhoChallengeElements))) % P);
        (rho,) = splitChallenge(nextPreviousChallenge);
    }

    function generateGeminiRChallenge(Honk.ZKProof memory proof, Fr prevChallenge, uint256 logN)
        internal
        pure
        returns (Fr geminiR, Fr nextPreviousChallenge)
    {
        uint256[] memory gR = new uint256[]((logN - 1) * 2 + 1);
        gR[0] = Fr.unwrap(prevChallenge);

        for (uint256 i = 0; i < logN - 1; i++) {
            gR[1 + i * 2] = proof.geminiFoldComms[i].x;
            gR[2 + i * 2] = proof.geminiFoldComms[i].y;
        }

        nextPreviousChallenge = FrLib.from(uint256(keccak256(abi.encodePacked(gR))) % P);

        (geminiR,) = splitChallenge(nextPreviousChallenge);
    }

    function generateShplonkNuChallenge(Honk.ZKProof memory proof, Fr prevChallenge, uint256 logN)
        internal
        pure
        returns (Fr shplonkNu, Fr nextPreviousChallenge)
    {
        uint256[] memory shplonkNuChallengeElements = new uint256[](logN + 1 + 4);
        shplonkNuChallengeElements[0] = Fr.unwrap(prevChallenge);

        for (uint256 i = 1; i <= logN; i++) {
            shplonkNuChallengeElements[i] = Fr.unwrap(proof.geminiAEvaluations[i - 1]);
        }

        uint256 libraIdx = 0;
        for (uint256 i = logN + 1; i <= logN + 4; i++) {
            shplonkNuChallengeElements[i] = Fr.unwrap(proof.libraPolyEvals[libraIdx]);
            libraIdx++;
        }

        nextPreviousChallenge = FrLib.from(uint256(keccak256(abi.encodePacked(shplonkNuChallengeElements))) % P);
        (shplonkNu,) = splitChallenge(nextPreviousChallenge);
    }

    function generateShplonkZChallenge(Honk.ZKProof memory proof, Fr prevChallenge)
        internal
        pure
        returns (Fr shplonkZ, Fr nextPreviousChallenge)
    {
        uint256[3] memory shplonkZChallengeElements;
        shplonkZChallengeElements[0] = Fr.unwrap(prevChallenge);

        shplonkZChallengeElements[1] = proof.shplonkQ.x;
        shplonkZChallengeElements[2] = proof.shplonkQ.y;

        nextPreviousChallenge = FrLib.from(uint256(keccak256(abi.encodePacked(shplonkZChallengeElements))) % P);
        (shplonkZ,) = splitChallenge(nextPreviousChallenge);
    }

    function loadProof(bytes calldata proof, uint256 logN) internal pure returns (Honk.ZKProof memory p) {
        uint256 boundary = 0x0;

        // Pairing point object
        for (uint256 i = 0; i < PAIRING_POINTS_SIZE; i++) {
            uint256 limb = uint256(bytes32(proof[boundary:boundary + FIELD_ELEMENT_SIZE]));
            // lo limbs (even index) < 2^136, hi limbs (odd index) < 2^120
            require(limb < 2 ** (i % 2 == 0 ? 136 : 120), Errors.ValueGeLimbMax());
            p.pairingPointObject[i] = FrLib.from(limb);
            boundary += FIELD_ELEMENT_SIZE;
        }

        // Gemini masking polynomial commitment (sent first in ZK flavors, right after pairing points)
        p.geminiMaskingPoly = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;

        // Commitments
        p.w1 = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;
        p.w2 = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;
        p.w3 = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;

        // Lookup / Permutation Helper Commitments
        p.lookupReadCounts = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;
        p.lookupReadTags = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;
        p.w4 = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;
        p.lookupInverses = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;
        p.zPerm = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;
        p.libraCommitments[0] = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;

        p.libraSum = bytesToFr(proof[boundary:boundary + FIELD_ELEMENT_SIZE]);
        boundary += FIELD_ELEMENT_SIZE;
        // Sumcheck univariates
        for (uint256 i = 0; i < logN; i++) {
            for (uint256 j = 0; j < ZK_BATCHED_RELATION_PARTIAL_LENGTH; j++) {
                p.sumcheckUnivariates[i][j] = bytesToFr(proof[boundary:boundary + FIELD_ELEMENT_SIZE]);
                boundary += FIELD_ELEMENT_SIZE;
            }
        }

        // Sumcheck evaluations (includes gemini_masking_poly eval at index 0 for ZK flavors)
        for (uint256 i = 0; i < NUMBER_OF_ENTITIES_ZK; i++) {
            p.sumcheckEvaluations[i] = bytesToFr(proof[boundary:boundary + FIELD_ELEMENT_SIZE]);
            boundary += FIELD_ELEMENT_SIZE;
        }

        p.libraEvaluation = bytesToFr(proof[boundary:boundary + FIELD_ELEMENT_SIZE]);
        boundary += FIELD_ELEMENT_SIZE;

        p.libraCommitments[1] = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;
        p.libraCommitments[2] = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;

        // Gemini
        // Read gemini fold univariates
        for (uint256 i = 0; i < logN - 1; i++) {
            p.geminiFoldComms[i] = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
            boundary += GROUP_ELEMENT_SIZE;
        }

        // Read gemini a evaluations
        for (uint256 i = 0; i < logN; i++) {
            p.geminiAEvaluations[i] = bytesToFr(proof[boundary:boundary + FIELD_ELEMENT_SIZE]);
            boundary += FIELD_ELEMENT_SIZE;
        }

        for (uint256 i = 0; i < 4; i++) {
            p.libraPolyEvals[i] = bytesToFr(proof[boundary:boundary + FIELD_ELEMENT_SIZE]);
            boundary += FIELD_ELEMENT_SIZE;
        }

        // Shplonk
        p.shplonkQ = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
        boundary += GROUP_ELEMENT_SIZE;
        // KZG
        p.kzgQuotient = bytesToG1Point(proof[boundary:boundary + GROUP_ELEMENT_SIZE]);
    }
}

library RelationsLib {
    struct EllipticParams {
        // Points
        Fr x_1;
        Fr y_1;
        Fr x_2;
        Fr y_2;
        Fr y_3;
        Fr x_3;
        // push accumulators into memory
        Fr x_double_identity;
    }

    // Parameters used within the Memory Relation
    // A struct is used to work around stack too deep. This relation has alot of variables
    struct MemParams {
        Fr memory_record_check;
        Fr partial_record_check;
        Fr next_gate_access_type;
        Fr record_delta;
        Fr index_delta;
        Fr adjacent_values_match_if_adjacent_indices_match;
        Fr adjacent_values_match_if_adjacent_indices_match_and_next_access_is_a_read_operation;
        Fr access_check;
        Fr next_gate_access_type_is_boolean;
        Fr ROM_consistency_check_identity;
        Fr RAM_consistency_check_identity;
        Fr timestamp_delta;
        Fr RAM_timestamp_check_identity;
        Fr memory_identity;
        Fr index_is_monotonically_increasing;
    }

    // Parameters used within the Non-Native Field Relation
    // A struct is used to work around stack too deep. This relation has alot of variables
    struct NnfParams {
        Fr limb_subproduct;
        Fr non_native_field_gate_1;
        Fr non_native_field_gate_2;
        Fr non_native_field_gate_3;
        Fr limb_accumulator_1;
        Fr limb_accumulator_2;
        Fr nnf_identity;
    }

    struct PoseidonExternalParams {
        Fr s1;
        Fr s2;
        Fr s3;
        Fr s4;
        Fr u1;
        Fr u2;
        Fr u3;
        Fr u4;
        Fr t0;
        Fr t1;
        Fr t2;
        Fr t3;
        Fr v1;
        Fr v2;
        Fr v3;
        Fr v4;
        Fr q_pos_by_scaling;
    }

    struct PoseidonInternalParams {
        Fr u1;
        Fr u2;
        Fr u3;
        Fr u4;
        Fr u_sum;
        Fr v1;
        Fr v2;
        Fr v3;
        Fr v4;
        Fr s1;
        Fr q_pos_by_scaling;
    }

    Fr internal constant GRUMPKIN_CURVE_B_PARAMETER_NEGATED = Fr.wrap(17); // -(-17)
    uint256 internal constant NEG_HALF_MODULO_P = 0x183227397098d014dc2822db40c0ac2e9419f4243cdcb848a1f0fac9f8000000;

    // Constants for the Non-native Field relation
    Fr internal constant LIMB_SIZE = Fr.wrap(uint256(1) << 68);
    Fr internal constant SUBLIMB_SHIFT = Fr.wrap(uint256(1) << 14);

    function accumulateRelationEvaluations(
        Fr[NUMBER_OF_ENTITIES] memory purportedEvaluations,
        Honk.RelationParameters memory rp,
        Fr[NUMBER_OF_ALPHAS] memory subrelationChallenges,
        Fr powPartialEval
    ) internal pure returns (Fr accumulator) {
        Fr[NUMBER_OF_SUBRELATIONS] memory evaluations;

        // Accumulate all relations in Ultra Honk - each with varying number of subrelations
        accumulateArithmeticRelation(purportedEvaluations, evaluations, powPartialEval);
        accumulatePermutationRelation(purportedEvaluations, rp, evaluations, powPartialEval);
        accumulateLogDerivativeLookupRelation(purportedEvaluations, rp, evaluations, powPartialEval);
        accumulateDeltaRangeRelation(purportedEvaluations, evaluations, powPartialEval);
        accumulateEllipticRelation(purportedEvaluations, evaluations, powPartialEval);
        accumulateMemoryRelation(purportedEvaluations, rp, evaluations, powPartialEval);
        accumulateNnfRelation(purportedEvaluations, evaluations, powPartialEval);
        accumulatePoseidonExternalRelation(purportedEvaluations, evaluations, powPartialEval);
        accumulatePoseidonInternalRelation(purportedEvaluations, evaluations, powPartialEval);

        // batch the subrelations with the precomputed alpha powers to obtain the full honk relation
        accumulator = scaleAndBatchSubrelations(evaluations, subrelationChallenges);
    }

    /**
     * Aesthetic helper function that is used to index by enum into proof.sumcheckEvaluations, it avoids
     * the relation checking code being cluttered with uint256 type casting, which is often a different colour in code
     * editors, and thus is noisy.
     */
    function wire(Fr[NUMBER_OF_ENTITIES] memory p, WIRE _wire) internal pure returns (Fr) {
        return p[uint256(_wire)];
    }

    /**
     * Ultra Arithmetic Relation
     *
     */
    function accumulateArithmeticRelation(
        Fr[NUMBER_OF_ENTITIES] memory p,
        Fr[NUMBER_OF_SUBRELATIONS] memory evals,
        Fr domainSep
    ) internal pure {
        // Relation 0
        Fr q_arith = wire(p, WIRE.Q_ARITH);
        {
            Fr neg_half = Fr.wrap(NEG_HALF_MODULO_P);

            Fr accum = (q_arith - Fr.wrap(3)) * (wire(p, WIRE.Q_M) * wire(p, WIRE.W_R) * wire(p, WIRE.W_L)) * neg_half;
            accum = accum + (wire(p, WIRE.Q_L) * wire(p, WIRE.W_L)) + (wire(p, WIRE.Q_R) * wire(p, WIRE.W_R))
                + (wire(p, WIRE.Q_O) * wire(p, WIRE.W_O)) + (wire(p, WIRE.Q_4) * wire(p, WIRE.W_4)) + wire(p, WIRE.Q_C);
            accum = accum + (q_arith - ONE) * wire(p, WIRE.W_4_SHIFT);
            accum = accum * q_arith;
            accum = accum * domainSep;
            evals[0] = accum;
        }

        // Relation 1
        {
            Fr accum = wire(p, WIRE.W_L) + wire(p, WIRE.W_4) - wire(p, WIRE.W_L_SHIFT) + wire(p, WIRE.Q_M);
            accum = accum * (q_arith - Fr.wrap(2));
            accum = accum * (q_arith - ONE);
            accum = accum * q_arith;
            accum = accum * domainSep;
            evals[1] = accum;
        }
    }

    function accumulatePermutationRelation(
        Fr[NUMBER_OF_ENTITIES] memory p,
        Honk.RelationParameters memory rp,
        Fr[NUMBER_OF_SUBRELATIONS] memory evals,
        Fr domainSep
    ) internal pure {
        Fr grand_product_numerator;
        Fr grand_product_denominator;

        {
            Fr num = wire(p, WIRE.W_L) + wire(p, WIRE.ID_1) * rp.beta + rp.gamma;
            num = num * (wire(p, WIRE.W_R) + wire(p, WIRE.ID_2) * rp.beta + rp.gamma);
            num = num * (wire(p, WIRE.W_O) + wire(p, WIRE.ID_3) * rp.beta + rp.gamma);
            num = num * (wire(p, WIRE.W_4) + wire(p, WIRE.ID_4) * rp.beta + rp.gamma);

            grand_product_numerator = num;
        }
        {
            Fr den = wire(p, WIRE.W_L) + wire(p, WIRE.SIGMA_1) * rp.beta + rp.gamma;
            den = den * (wire(p, WIRE.W_R) + wire(p, WIRE.SIGMA_2) * rp.beta + rp.gamma);
            den = den * (wire(p, WIRE.W_O) + wire(p, WIRE.SIGMA_3) * rp.beta + rp.gamma);
            den = den * (wire(p, WIRE.W_4) + wire(p, WIRE.SIGMA_4) * rp.beta + rp.gamma);

            grand_product_denominator = den;
        }

        // Contribution 2
        {
            Fr acc = (wire(p, WIRE.Z_PERM) + wire(p, WIRE.LAGRANGE_FIRST)) * grand_product_numerator;

            acc = acc
                - ((wire(p, WIRE.Z_PERM_SHIFT) + (wire(p, WIRE.LAGRANGE_LAST) * rp.publicInputsDelta))
                    * grand_product_denominator);
            acc = acc * domainSep;
            evals[2] = acc;
        }

        // Contribution 3
        {
            Fr acc = (wire(p, WIRE.LAGRANGE_LAST) * wire(p, WIRE.Z_PERM_SHIFT)) * domainSep;
            evals[3] = acc;
        }
    }

    function accumulateLogDerivativeLookupRelation(
        Fr[NUMBER_OF_ENTITIES] memory p,
        Honk.RelationParameters memory rp,
        Fr[NUMBER_OF_SUBRELATIONS] memory evals,
        Fr domainSep
    ) internal pure {
        Fr table_term;
        Fr lookup_term;

        // Calculate the write term (the table accumulation)
        // table_term = table_1 + γ + table_2 * β + table_3 * β² + table_4 * β³
        {
            Fr beta_sqr = rp.beta * rp.beta;
            table_term = wire(p, WIRE.TABLE_1) + rp.gamma + (wire(p, WIRE.TABLE_2) * rp.beta)
                + (wire(p, WIRE.TABLE_3) * beta_sqr) + (wire(p, WIRE.TABLE_4) * beta_sqr * rp.beta);
        }

        // Calculate the read term
        // lookup_term = derived_entry_1 + γ + derived_entry_2 * β + derived_entry_3 * β² + q_index * β³
        {
            Fr beta_sqr = rp.beta * rp.beta;
            Fr derived_entry_1 = wire(p, WIRE.W_L) + rp.gamma + (wire(p, WIRE.Q_R) * wire(p, WIRE.W_L_SHIFT));
            Fr derived_entry_2 = wire(p, WIRE.W_R) + wire(p, WIRE.Q_M) * wire(p, WIRE.W_R_SHIFT);
            Fr derived_entry_3 = wire(p, WIRE.W_O) + wire(p, WIRE.Q_C) * wire(p, WIRE.W_O_SHIFT);

            lookup_term = derived_entry_1 + (derived_entry_2 * rp.beta) + (derived_entry_3 * beta_sqr)
                + (wire(p, WIRE.Q_O) * beta_sqr * rp.beta);
        }

        Fr lookup_inverse = wire(p, WIRE.LOOKUP_INVERSES) * table_term;
        Fr table_inverse = wire(p, WIRE.LOOKUP_INVERSES) * lookup_term;

        Fr inverse_exists_xor =
        wire(p, WIRE.LOOKUP_READ_TAGS) + wire(p, WIRE.Q_LOOKUP)
            - (wire(p, WIRE.LOOKUP_READ_TAGS) * wire(p, WIRE.Q_LOOKUP));

        // Inverse calculated correctly relation
        Fr accumulatorNone = lookup_term * table_term * wire(p, WIRE.LOOKUP_INVERSES) - inverse_exists_xor;
        accumulatorNone = accumulatorNone * domainSep;

        // Inverse
        Fr accumulatorOne = wire(p, WIRE.Q_LOOKUP) * lookup_inverse - wire(p, WIRE.LOOKUP_READ_COUNTS) * table_inverse;

        Fr read_tag = wire(p, WIRE.LOOKUP_READ_TAGS);

        Fr read_tag_boolean_relation = read_tag * read_tag - read_tag;

        evals[4] = accumulatorNone;
        evals[5] = accumulatorOne;
        evals[6] = read_tag_boolean_relation * domainSep;
    }

    function accumulateDeltaRangeRelation(
        Fr[NUMBER_OF_ENTITIES] memory p,
        Fr[NUMBER_OF_SUBRELATIONS] memory evals,
        Fr domainSep
    ) internal pure {
        Fr minus_one = ZERO - ONE;
        Fr minus_two = ZERO - Fr.wrap(2);
        Fr minus_three = ZERO - Fr.wrap(3);

        // Compute wire differences
        Fr delta_1 = wire(p, WIRE.W_R) - wire(p, WIRE.W_L);
        Fr delta_2 = wire(p, WIRE.W_O) - wire(p, WIRE.W_R);
        Fr delta_3 = wire(p, WIRE.W_4) - wire(p, WIRE.W_O);
        Fr delta_4 = wire(p, WIRE.W_L_SHIFT) - wire(p, WIRE.W_4);

        // Contribution 6
        {
            Fr acc = delta_1;
            acc = acc * (delta_1 + minus_one);
            acc = acc * (delta_1 + minus_two);
            acc = acc * (delta_1 + minus_three);
            acc = acc * wire(p, WIRE.Q_RANGE);
            acc = acc * domainSep;
            evals[7] = acc;
        }

        // Contribution 7
        {
            Fr acc = delta_2;
            acc = acc * (delta_2 + minus_one);
            acc = acc * (delta_2 + minus_two);
            acc = acc * (delta_2 + minus_three);
            acc = acc * wire(p, WIRE.Q_RANGE);
            acc = acc * domainSep;
            evals[8] = acc;
        }

        // Contribution 8
        {
            Fr acc = delta_3;
            acc = acc * (delta_3 + minus_one);
            acc = acc * (delta_3 + minus_two);
            acc = acc * (delta_3 + minus_three);
            acc = acc * wire(p, WIRE.Q_RANGE);
            acc = acc * domainSep;
            evals[9] = acc;
        }

        // Contribution 9
        {
            Fr acc = delta_4;
            acc = acc * (delta_4 + minus_one);
            acc = acc * (delta_4 + minus_two);
            acc = acc * (delta_4 + minus_three);
            acc = acc * wire(p, WIRE.Q_RANGE);
            acc = acc * domainSep;
            evals[10] = acc;
        }
    }

    function accumulateEllipticRelation(
        Fr[NUMBER_OF_ENTITIES] memory p,
        Fr[NUMBER_OF_SUBRELATIONS] memory evals,
        Fr domainSep
    ) internal pure {
        EllipticParams memory ep;
        ep.x_1 = wire(p, WIRE.W_R);
        ep.y_1 = wire(p, WIRE.W_O);

        ep.x_2 = wire(p, WIRE.W_L_SHIFT);
        ep.y_2 = wire(p, WIRE.W_4_SHIFT);
        ep.y_3 = wire(p, WIRE.W_O_SHIFT);
        ep.x_3 = wire(p, WIRE.W_R_SHIFT);

        Fr q_sign = wire(p, WIRE.Q_L);
        Fr q_is_double = wire(p, WIRE.Q_M);

        // Contribution 10 point addition, x-coordinate check
        // q_elliptic * (x3 + x2 + x1)(x2 - x1)(x2 - x1) - y2^2 - y1^2 + 2(y2y1)*q_sign = 0
        Fr x_diff = (ep.x_2 - ep.x_1);
        Fr y1_sqr = (ep.y_1 * ep.y_1);
        {
            // Move to top
            Fr partialEval = domainSep;

            Fr y2_sqr = (ep.y_2 * ep.y_2);
            Fr y1y2 = ep.y_1 * ep.y_2 * q_sign;
            Fr x_add_identity = (ep.x_3 + ep.x_2 + ep.x_1);
            x_add_identity = x_add_identity * x_diff * x_diff;
            x_add_identity = x_add_identity - y2_sqr - y1_sqr + y1y2 + y1y2;

            evals[11] = x_add_identity * partialEval * wire(p, WIRE.Q_ELLIPTIC) * (ONE - q_is_double);
        }

        // Contribution 11 point addition, x-coordinate check
        // q_elliptic * (q_sign * y1 + y3)(x2 - x1) + (x3 - x1)(y2 - q_sign * y1) = 0
        {
            Fr y1_plus_y3 = ep.y_1 + ep.y_3;
            Fr y_diff = ep.y_2 * q_sign - ep.y_1;
            Fr y_add_identity = y1_plus_y3 * x_diff + (ep.x_3 - ep.x_1) * y_diff;
            evals[12] = y_add_identity * domainSep * wire(p, WIRE.Q_ELLIPTIC) * (ONE - q_is_double);
        }

        // Contribution 10 point doubling, x-coordinate check
        // (x3 + x1 + x1) (4y1*y1) - 9 * x1 * x1 * x1 * x1 = 0
        // N.B. we're using the equivalence x1*x1*x1 === y1*y1 - curve_b to reduce degree by 1
        {
            Fr x_pow_4 = (y1_sqr + GRUMPKIN_CURVE_B_PARAMETER_NEGATED) * ep.x_1;
            Fr y1_sqr_mul_4 = y1_sqr + y1_sqr;
            y1_sqr_mul_4 = y1_sqr_mul_4 + y1_sqr_mul_4;
            Fr x1_pow_4_mul_9 = x_pow_4 * Fr.wrap(9);

            // NOTE: pushed into memory (stack >:'( )
            ep.x_double_identity = (ep.x_3 + ep.x_1 + ep.x_1) * y1_sqr_mul_4 - x1_pow_4_mul_9;

            Fr acc = ep.x_double_identity * domainSep * wire(p, WIRE.Q_ELLIPTIC) * q_is_double;
            evals[11] = evals[11] + acc;
        }

        // Contribution 11 point doubling, y-coordinate check
        // (y1 + y1) (2y1) - (3 * x1 * x1)(x1 - x3) = 0
        {
            Fr x1_sqr_mul_3 = (ep.x_1 + ep.x_1 + ep.x_1) * ep.x_1;
            Fr y_double_identity = x1_sqr_mul_3 * (ep.x_1 - ep.x_3) - (ep.y_1 + ep.y_1) * (ep.y_1 + ep.y_3);
            evals[12] = evals[12] + y_double_identity * domainSep * wire(p, WIRE.Q_ELLIPTIC) * q_is_double;
        }
    }

    function accumulateMemoryRelation(
        Fr[NUMBER_OF_ENTITIES] memory p,
        Honk.RelationParameters memory rp,
        Fr[NUMBER_OF_SUBRELATIONS] memory evals,
        Fr domainSep
    ) internal pure {
        MemParams memory ap;

        // Compute eta powers locally
        Fr eta_two = rp.eta * rp.eta;
        Fr eta_three = eta_two * rp.eta;

        /**
         * MEMORY
         *
         * A RAM memory record contains a tuple of the following fields:
         *  * i: `index` of memory cell being accessed
         *  * t: `timestamp` of memory cell being accessed (used for RAM, set to 0 for ROM)
         *  * v: `value` of memory cell being accessed
         *  * a: `access` type of record. read: 0 = read, 1 = write
         *  * r: `record` of memory cell. record = access + index * eta + timestamp * eta_two + value * eta_three
         *
         * A ROM memory record contains a tuple of the following fields:
         *  * i: `index` of memory cell being accessed
         *  * v: `value1` of memory cell being accessed (ROM tables can store up to 2 values per index)
         *  * v2:`value2` of memory cell being accessed (ROM tables can store up to 2 values per index)
         *  * r: `record` of memory cell. record = index * eta + value2 * eta_two + value1 * eta_three
         *
         *  When performing a read/write access, the values of i, t, v, v2, a, r are stored in the following wires +
         * selectors, depending on whether the gate is a RAM read/write or a ROM read
         *
         *  | gate type | i  | v2/t  |  v | a  | r  |
         *  | --------- | -- | ----- | -- | -- | -- |
         *  | ROM       | w1 | w2    | w3 | -- | w4 |
         *  | RAM       | w1 | w2    | w3 | qc | w4 |
         *
         * (for accesses where `index` is a circuit constant, it is assumed the circuit will apply a copy constraint on
         * `w2` to fix its value)
         *
         *
         */

        /**
         * Memory Record Check
         * Partial degree: 1
         * Total degree: 4
         *
         * A ROM/ROM access gate can be evaluated with the identity:
         *
         * qc + w1 \eta + w2 \eta_two + w3 \eta_three - w4 = 0
         *
         * For ROM gates, qc = 0
         */
        ap.memory_record_check = wire(p, WIRE.W_O) * eta_three;
        ap.memory_record_check = ap.memory_record_check + (wire(p, WIRE.W_R) * eta_two);
        ap.memory_record_check = ap.memory_record_check + (wire(p, WIRE.W_L) * rp.eta);
        ap.memory_record_check = ap.memory_record_check + wire(p, WIRE.Q_C);
        ap.partial_record_check = ap.memory_record_check; // used in RAM consistency check; deg 1 or 4
        ap.memory_record_check = ap.memory_record_check - wire(p, WIRE.W_4);

        /**
         * Contribution 13 & 14
         * ROM Consistency Check
         * Partial degree: 1
         * Total degree: 4
         *
         * For every ROM read, a set equivalence check is applied between the record witnesses, and a second set of
         * records that are sorted.
         *
         * We apply the following checks for the sorted records:
         *
         * 1. w1, w2, w3 correctly map to 'index', 'v1, 'v2' for a given record value at w4
         * 2. index values for adjacent records are monotonically increasing
         * 3. if, at gate i, index_i == index_{i + 1}, then value1_i == value1_{i + 1} and value2_i == value2_{i + 1}
         *
         */
        ap.index_delta = wire(p, WIRE.W_L_SHIFT) - wire(p, WIRE.W_L);
        ap.record_delta = wire(p, WIRE.W_4_SHIFT) - wire(p, WIRE.W_4);

        ap.index_is_monotonically_increasing = ap.index_delta * (ap.index_delta - Fr.wrap(1)); // deg 2

        ap.adjacent_values_match_if_adjacent_indices_match = (ap.index_delta * MINUS_ONE + ONE) * ap.record_delta; // deg 2

        evals[14] = ap.adjacent_values_match_if_adjacent_indices_match * (wire(p, WIRE.Q_L) * wire(p, WIRE.Q_R))
            * (wire(p, WIRE.Q_MEMORY) * domainSep); // deg 5
        evals[15] = ap.index_is_monotonically_increasing * (wire(p, WIRE.Q_L) * wire(p, WIRE.Q_R))
            * (wire(p, WIRE.Q_MEMORY) * domainSep); // deg 5

        ap.ROM_consistency_check_identity = ap.memory_record_check * (wire(p, WIRE.Q_L) * wire(p, WIRE.Q_R)); // deg 3 or 7

        /**
         * Contributions 15,16,17
         * RAM Consistency Check
         *
         * The 'access' type of the record is extracted with the expression `w_4 - ap.partial_record_check`
         * (i.e. for an honest Prover `w1 * eta + w2 * eta^2 + w3 * eta^3 - w4 = access`.
         * This is validated by requiring `access` to be boolean
         *
         * For two adjacent entries in the sorted list if _both_
         *  A) index values match
         *  B) adjacent access value is 0 (i.e. next gate is a READ)
         * then
         *  C) both values must match.
         * The gate boolean check is
         * (A && B) => C  === !(A && B) || C ===  !A || !B || C
         *
         * N.B. it is the responsibility of the circuit writer to ensure that every RAM cell is initialized
         * with a WRITE operation.
         */
        Fr access_type = (wire(p, WIRE.W_4) - ap.partial_record_check); // will be 0 or 1 for honest Prover; deg 1 or 4
        ap.access_check = access_type * (access_type - Fr.wrap(1)); // check value is 0 or 1; deg 2 or 8

        // reverse order we could re-use `ap.partial_record_check`  1 -  ((w3' * eta + w2') * eta + w1') * eta
        // deg 1 or 4
        ap.next_gate_access_type = wire(p, WIRE.W_O_SHIFT) * eta_three;
        ap.next_gate_access_type = ap.next_gate_access_type + (wire(p, WIRE.W_R_SHIFT) * eta_two);
        ap.next_gate_access_type = ap.next_gate_access_type + (wire(p, WIRE.W_L_SHIFT) * rp.eta);
        ap.next_gate_access_type = wire(p, WIRE.W_4_SHIFT) - ap.next_gate_access_type;

        Fr value_delta = wire(p, WIRE.W_O_SHIFT) - wire(p, WIRE.W_O);
        ap.adjacent_values_match_if_adjacent_indices_match_and_next_access_is_a_read_operation =
            (ap.index_delta * MINUS_ONE + ONE) * value_delta * (ap.next_gate_access_type * MINUS_ONE + ONE); // deg 3 or 6

        // We can't apply the RAM consistency check identity on the final entry in the sorted list (the wires in the
        // next gate would make the identity fail).  We need to validate that its 'access type' bool is correct. Can't
        // do  with an arithmetic gate because of the  `eta` factors. We need to check that the *next* gate's access
        // type is  correct, to cover this edge case
        // deg 2 or 4
        ap.next_gate_access_type_is_boolean =
            ap.next_gate_access_type * ap.next_gate_access_type - ap.next_gate_access_type;

        // Putting it all together...
        evals[16] = ap.adjacent_values_match_if_adjacent_indices_match_and_next_access_is_a_read_operation
            * (wire(p, WIRE.Q_O)) * (wire(p, WIRE.Q_MEMORY) * domainSep); // deg 5 or 8
        evals[17] = ap.index_is_monotonically_increasing * (wire(p, WIRE.Q_O)) * (wire(p, WIRE.Q_MEMORY) * domainSep); // deg 4
        evals[18] = ap.next_gate_access_type_is_boolean * (wire(p, WIRE.Q_O)) * (wire(p, WIRE.Q_MEMORY) * domainSep); // deg 4 or 6

        ap.RAM_consistency_check_identity = ap.access_check * (wire(p, WIRE.Q_O)); // deg 3 or 9

        /**
         * RAM Timestamp Consistency Check
         *
         * | w1 | w2 | w3 | w4 |
         * | index | timestamp | timestamp_check | -- |
         *
         * Let delta_index = index_{i + 1} - index_{i}
         *
         * Iff delta_index == 0, timestamp_check = timestamp_{i + 1} - timestamp_i
         * Else timestamp_check = 0
         */
        ap.timestamp_delta = wire(p, WIRE.W_R_SHIFT) - wire(p, WIRE.W_R);
        ap.RAM_timestamp_check_identity = (ap.index_delta * MINUS_ONE + ONE) * ap.timestamp_delta - wire(p, WIRE.W_O); // deg 3

        /**
         * Complete Contribution 12
         * The complete RAM/ROM memory identity
         * Partial degree:
         */
        ap.memory_identity = ap.ROM_consistency_check_identity; // deg 3 or 6
        ap.memory_identity =
            ap.memory_identity + ap.RAM_timestamp_check_identity * (wire(p, WIRE.Q_4) * wire(p, WIRE.Q_L)); // deg 4
        ap.memory_identity = ap.memory_identity + ap.memory_record_check * (wire(p, WIRE.Q_M) * wire(p, WIRE.Q_L)); // deg 3 or 6
        ap.memory_identity = ap.memory_identity + ap.RAM_consistency_check_identity; // deg 3 or 9

        // (deg 3 or 9) + (deg 4) + (deg 3)
        ap.memory_identity = ap.memory_identity * (wire(p, WIRE.Q_MEMORY) * domainSep); // deg 4 or 10
        evals[13] = ap.memory_identity;
    }

    function accumulateNnfRelation(
        Fr[NUMBER_OF_ENTITIES] memory p,
        Fr[NUMBER_OF_SUBRELATIONS] memory evals,
        Fr domainSep
    ) internal pure {
        NnfParams memory ap;

        /**
         * Contribution 12
         * Non native field arithmetic gate 2
         * deg 4
         *
         *             _                                                                               _
         *            /   _                   _                               _       14                \
         * q_2 . q_4 |   (w_1 . w_2) + (w_1 . w_2) + (w_1 . w_4 + w_2 . w_3 - w_3) . 2    - w_3 - w_4   |
         *            \_                                                                               _/
         *
         *
         */
        ap.limb_subproduct = wire(p, WIRE.W_L) * wire(p, WIRE.W_R_SHIFT) + wire(p, WIRE.W_L_SHIFT) * wire(p, WIRE.W_R);
        ap.non_native_field_gate_2 =
            (wire(p, WIRE.W_L) * wire(p, WIRE.W_4) + wire(p, WIRE.W_R) * wire(p, WIRE.W_O) - wire(p, WIRE.W_O_SHIFT));
        ap.non_native_field_gate_2 = ap.non_native_field_gate_2 * LIMB_SIZE;
        ap.non_native_field_gate_2 = ap.non_native_field_gate_2 - wire(p, WIRE.W_4_SHIFT);
        ap.non_native_field_gate_2 = ap.non_native_field_gate_2 + ap.limb_subproduct;
        ap.non_native_field_gate_2 = ap.non_native_field_gate_2 * wire(p, WIRE.Q_4);

        ap.limb_subproduct = ap.limb_subproduct * LIMB_SIZE;
        ap.limb_subproduct = ap.limb_subproduct + (wire(p, WIRE.W_L_SHIFT) * wire(p, WIRE.W_R_SHIFT));
        ap.non_native_field_gate_1 = ap.limb_subproduct;
        ap.non_native_field_gate_1 = ap.non_native_field_gate_1 - (wire(p, WIRE.W_O) + wire(p, WIRE.W_4));
        ap.non_native_field_gate_1 = ap.non_native_field_gate_1 * wire(p, WIRE.Q_O);

        ap.non_native_field_gate_3 = ap.limb_subproduct;
        ap.non_native_field_gate_3 = ap.non_native_field_gate_3 + wire(p, WIRE.W_4);
        ap.non_native_field_gate_3 = ap.non_native_field_gate_3 - (wire(p, WIRE.W_O_SHIFT) + wire(p, WIRE.W_4_SHIFT));
        ap.non_native_field_gate_3 = ap.non_native_field_gate_3 * wire(p, WIRE.Q_M);

        Fr non_native_field_identity =
        ap.non_native_field_gate_1 + ap.non_native_field_gate_2 + ap.non_native_field_gate_3;
        non_native_field_identity = non_native_field_identity * wire(p, WIRE.Q_R);

        // ((((w2' * 2^14 + w1') * 2^14 + w3) * 2^14 + w2) * 2^14 + w1 - w4) * qm
        // deg 2
        ap.limb_accumulator_1 = wire(p, WIRE.W_R_SHIFT) * SUBLIMB_SHIFT;
        ap.limb_accumulator_1 = ap.limb_accumulator_1 + wire(p, WIRE.W_L_SHIFT);
        ap.limb_accumulator_1 = ap.limb_accumulator_1 * SUBLIMB_SHIFT;
        ap.limb_accumulator_1 = ap.limb_accumulator_1 + wire(p, WIRE.W_O);
        ap.limb_accumulator_1 = ap.limb_accumulator_1 * SUBLIMB_SHIFT;
        ap.limb_accumulator_1 = ap.limb_accumulator_1 + wire(p, WIRE.W_R);
        ap.limb_accumulator_1 = ap.limb_accumulator_1 * SUBLIMB_SHIFT;
        ap.limb_accumulator_1 = ap.limb_accumulator_1 + wire(p, WIRE.W_L);
        ap.limb_accumulator_1 = ap.limb_accumulator_1 - wire(p, WIRE.W_4);
        ap.limb_accumulator_1 = ap.limb_accumulator_1 * wire(p, WIRE.Q_4);

        // ((((w3' * 2^14 + w2') * 2^14 + w1') * 2^14 + w4) * 2^14 + w3 - w4') * qm
        // deg 2
        ap.limb_accumulator_2 = wire(p, WIRE.W_O_SHIFT) * SUBLIMB_SHIFT;
        ap.limb_accumulator_2 = ap.limb_accumulator_2 + wire(p, WIRE.W_R_SHIFT);
        ap.limb_accumulator_2 = ap.limb_accumulator_2 * SUBLIMB_SHIFT;
        ap.limb_accumulator_2 = ap.limb_accumulator_2 + wire(p, WIRE.W_L_SHIFT);
        ap.limb_accumulator_2 = ap.limb_accumulator_2 * SUBLIMB_SHIFT;
        ap.limb_accumulator_2 = ap.limb_accumulator_2 + wire(p, WIRE.W_4);
        ap.limb_accumulator_2 = ap.limb_accumulator_2 * SUBLIMB_SHIFT;
        ap.limb_accumulator_2 = ap.limb_accumulator_2 + wire(p, WIRE.W_O);
        ap.limb_accumulator_2 = ap.limb_accumulator_2 - wire(p, WIRE.W_4_SHIFT);
        ap.limb_accumulator_2 = ap.limb_accumulator_2 * wire(p, WIRE.Q_M);

        Fr limb_accumulator_identity = ap.limb_accumulator_1 + ap.limb_accumulator_2;
        limb_accumulator_identity = limb_accumulator_identity * wire(p, WIRE.Q_O); //  deg 3

        ap.nnf_identity = non_native_field_identity + limb_accumulator_identity;
        ap.nnf_identity = ap.nnf_identity * (wire(p, WIRE.Q_NNF) * domainSep);
        evals[19] = ap.nnf_identity;
    }

    function accumulatePoseidonExternalRelation(
        Fr[NUMBER_OF_ENTITIES] memory p,
        Fr[NUMBER_OF_SUBRELATIONS] memory evals,
        Fr domainSep
    ) internal pure {
        PoseidonExternalParams memory ep;

        ep.s1 = wire(p, WIRE.W_L) + wire(p, WIRE.Q_L);
        ep.s2 = wire(p, WIRE.W_R) + wire(p, WIRE.Q_R);
        ep.s3 = wire(p, WIRE.W_O) + wire(p, WIRE.Q_O);
        ep.s4 = wire(p, WIRE.W_4) + wire(p, WIRE.Q_4);

        ep.u1 = ep.s1 * ep.s1 * ep.s1 * ep.s1 * ep.s1;
        ep.u2 = ep.s2 * ep.s2 * ep.s2 * ep.s2 * ep.s2;
        ep.u3 = ep.s3 * ep.s3 * ep.s3 * ep.s3 * ep.s3;
        ep.u4 = ep.s4 * ep.s4 * ep.s4 * ep.s4 * ep.s4;
        // matrix mul v = M_E * u with 14 additions
        ep.t0 = ep.u1 + ep.u2; // u_1 + u_2
        ep.t1 = ep.u3 + ep.u4; // u_3 + u_4
        ep.t2 = ep.u2 + ep.u2 + ep.t1; // 2u_2
        // ep.t2 += ep.t1; // 2u_2 + u_3 + u_4
        ep.t3 = ep.u4 + ep.u4 + ep.t0; // 2u_4
        // ep.t3 += ep.t0; // u_1 + u_2 + 2u_4
        ep.v4 = ep.t1 + ep.t1;
        ep.v4 = ep.v4 + ep.v4 + ep.t3;
        // ep.v4 += ep.t3; // u_1 + u_2 + 4u_3 + 6u_4
        ep.v2 = ep.t0 + ep.t0;
        ep.v2 = ep.v2 + ep.v2 + ep.t2;
        // ep.v2 += ep.t2; // 4u_1 + 6u_2 + u_3 + u_4
        ep.v1 = ep.t3 + ep.v2; // 5u_1 + 7u_2 + u_3 + 3u_4
        ep.v3 = ep.t2 + ep.v4; // u_1 + 3u_2 + 5u_3 + 7u_4

        ep.q_pos_by_scaling = wire(p, WIRE.Q_POSEIDON2_EXTERNAL) * domainSep;
        evals[20] = evals[20] + ep.q_pos_by_scaling * (ep.v1 - wire(p, WIRE.W_L_SHIFT));

        evals[21] = evals[21] + ep.q_pos_by_scaling * (ep.v2 - wire(p, WIRE.W_R_SHIFT));

        evals[22] = evals[22] + ep.q_pos_by_scaling * (ep.v3 - wire(p, WIRE.W_O_SHIFT));

        evals[23] = evals[23] + ep.q_pos_by_scaling * (ep.v4 - wire(p, WIRE.W_4_SHIFT));
    }

    function accumulatePoseidonInternalRelation(
        Fr[NUMBER_OF_ENTITIES] memory p,
        Fr[NUMBER_OF_SUBRELATIONS] memory evals,
        Fr domainSep
    ) internal pure {
        PoseidonInternalParams memory ip;

        Fr[4] memory INTERNAL_MATRIX_DIAGONAL = [
            FrLib.from(0x10dc6e9c006ea38b04b1e03b4bd9490c0d03f98929ca1d7fb56821fd19d3b6e7),
            FrLib.from(0x0c28145b6a44df3e0149b3d0a30b3bb599df9756d4dd9b84a86b38cfb45a740b),
            FrLib.from(0x00544b8338791518b2c7645a50392798b21f75bb60e3596170067d00141cac15),
            FrLib.from(0x222c01175718386f2e2e82eb122789e352e105a3b8fa852613bc534433ee428b)
        ];

        // add round constants
        ip.s1 = wire(p, WIRE.W_L) + wire(p, WIRE.Q_L);

        // apply s-box round
        ip.u1 = ip.s1 * ip.s1 * ip.s1 * ip.s1 * ip.s1;
        ip.u2 = wire(p, WIRE.W_R);
        ip.u3 = wire(p, WIRE.W_O);
        ip.u4 = wire(p, WIRE.W_4);

        // matrix mul with v = M_I * u 4 muls and 7 additions
        ip.u_sum = ip.u1 + ip.u2 + ip.u3 + ip.u4;

        ip.q_pos_by_scaling = wire(p, WIRE.Q_POSEIDON2_INTERNAL) * domainSep;

        ip.v1 = ip.u1 * INTERNAL_MATRIX_DIAGONAL[0] + ip.u_sum;
        evals[24] = evals[24] + ip.q_pos_by_scaling * (ip.v1 - wire(p, WIRE.W_L_SHIFT));

        ip.v2 = ip.u2 * INTERNAL_MATRIX_DIAGONAL[1] + ip.u_sum;
        evals[25] = evals[25] + ip.q_pos_by_scaling * (ip.v2 - wire(p, WIRE.W_R_SHIFT));

        ip.v3 = ip.u3 * INTERNAL_MATRIX_DIAGONAL[2] + ip.u_sum;
        evals[26] = evals[26] + ip.q_pos_by_scaling * (ip.v3 - wire(p, WIRE.W_O_SHIFT));

        ip.v4 = ip.u4 * INTERNAL_MATRIX_DIAGONAL[3] + ip.u_sum;
        evals[27] = evals[27] + ip.q_pos_by_scaling * (ip.v4 - wire(p, WIRE.W_4_SHIFT));
    }

    // Batch subrelation evaluations using precomputed powers of alpha
    // First subrelation is implicitly scaled by 1, subsequent ones use powers from the subrelationChallenges array
    function scaleAndBatchSubrelations(
        Fr[NUMBER_OF_SUBRELATIONS] memory evaluations,
        Fr[NUMBER_OF_ALPHAS] memory subrelationChallenges
    ) internal pure returns (Fr accumulator) {
        accumulator = evaluations[0];

        for (uint256 i = 1; i < NUMBER_OF_SUBRELATIONS; ++i) {
            accumulator = accumulator + evaluations[i] * subrelationChallenges[i - 1];
        }
    }
}

library CommitmentSchemeLib {
    using FrLib for Fr;

    // Avoid stack too deep
    struct ShpleminiIntermediates {
        Fr unshiftedScalar;
        Fr shiftedScalar;
        Fr unshiftedScalarNeg;
        Fr shiftedScalarNeg;
        // Scalar to be multiplied by [1]₁
        Fr constantTermAccumulator;
        // Accumulator for powers of rho
        Fr batchingChallenge;
        // Linear combination of multilinear (sumcheck) evaluations and powers of rho
        Fr batchedEvaluation;
        Fr[4] denominators;
        Fr[4] batchingScalars;
        // 1/(z - r^{2^i}) for i = 0, ..., logSize, dynamically updated
        Fr posInvertedDenominator;
        // 1/(z + r^{2^i}) for i = 0, ..., logSize, dynamically updated
        Fr negInvertedDenominator;
        // ν^{2i} * 1/(z - r^{2^i})
        Fr scalingFactorPos;
        // ν^{2i+1} * 1/(z + r^{2^i})
        Fr scalingFactorNeg;
        // Fold_i(r^{2^i}) reconstructed by Verifier
        Fr[] foldPosEvaluations;
    }

    // Compute the evaluations Aₗ(r^{2ˡ}) for l = 0, ..., m-1
    function computeFoldPosEvaluations(
        Fr[CONST_PROOF_SIZE_LOG_N] memory sumcheckUChallenges,
        Fr batchedEvalAccumulator,
        Fr[CONST_PROOF_SIZE_LOG_N] memory geminiEvaluations,
        Fr[] memory geminiEvalChallengePowers,
        uint256 logSize
    ) internal view returns (Fr[] memory) {
        Fr[] memory foldPosEvaluations = new Fr[](logSize);
        for (uint256 i = logSize; i > 0; --i) {
            Fr challengePower = geminiEvalChallengePowers[i - 1];
            Fr u = sumcheckUChallenges[i - 1];

            Fr batchedEvalRoundAcc = ((challengePower * batchedEvalAccumulator * Fr.wrap(2)) - geminiEvaluations[i - 1]
                    * (challengePower * (ONE - u) - u));
            // Divide by the denominator
            batchedEvalRoundAcc = batchedEvalRoundAcc * (challengePower * (ONE - u) + u).invert();

            batchedEvalAccumulator = batchedEvalRoundAcc;
            foldPosEvaluations[i - 1] = batchedEvalRoundAcc;
        }
        return foldPosEvaluations;
    }

    function computeSquares(Fr r, uint256 logN) internal pure returns (Fr[] memory) {
        Fr[] memory squares = new Fr[](logN);
        squares[0] = r;
        for (uint256 i = 1; i < logN; ++i) {
            squares[i] = squares[i - 1].sqr();
        }
        return squares;
    }
}

uint256 constant Q = 21888242871839275222246405745257275088696311157297823662689037894645226208583; // EC group order. F_q

// Fr utility

function bytesToFr(bytes calldata proofSection) pure returns (Fr scalar) {
    scalar = FrLib.fromBytes32(bytes32(proofSection));
}

// EC Point utilities
function bytesToG1Point(bytes calldata proofSection) pure returns (Honk.G1Point memory point) {
    uint256 x = uint256(bytes32(proofSection[0x00:0x20]));
    uint256 y = uint256(bytes32(proofSection[0x20:0x40]));
    require(x < Q && y < Q, Errors.ValueGeGroupOrder());

    // Reject the point at infinity (0,0). EVM precompiles silently treat (0,0)
    // as the identity element, which could zero out commitments.
    // On-curve validation (y² = x³ + 3) is handled by the ecAdd/ecMul precompiles
    // per EIP-196, so we only need to catch this special case here.
    require((x | y) != 0, Errors.PointAtInfinity());

    point = Honk.G1Point({x: x, y: y});
}

function negateInplace(Honk.G1Point memory point) pure returns (Honk.G1Point memory) {
    // When y == 0 (order-2 point), negation is the same point. Q - 0 = Q which is >= Q.
    if (point.y != 0) {
        point.y = Q - point.y;
    }
    return point;
}

/**
 * Convert the pairing points to G1 points.
 *
 * The pairing points are serialised as an array of 2 limbs representing two points
 * (P0 and P1, used for lhs and rhs of pairing operation).
 *
 * There are 2 limbs (lo, hi) for each coordinate, so 4 limbs per point, 8 total.
 * Layout: [P0.x_lo, P0.x_hi, P0.y_lo, P0.y_hi, P1.x_lo, P1.x_hi, P1.y_lo, P1.y_hi]
 *
 * @param pairingPoints The pairing points to convert.
 * @return lhs P0 point
 * @return rhs P1 point
 */
function convertPairingPointsToG1(Fr[PAIRING_POINTS_SIZE] memory pairingPoints)
    pure
    returns (Honk.G1Point memory lhs, Honk.G1Point memory rhs)
{
    // P0 (lhs): x = lo | (hi << 136)
    uint256 lhsX = Fr.unwrap(pairingPoints[0]);
    lhsX |= Fr.unwrap(pairingPoints[1]) << 136;

    uint256 lhsY = Fr.unwrap(pairingPoints[2]);
    lhsY |= Fr.unwrap(pairingPoints[3]) << 136;

    // P1 (rhs): x = lo | (hi << 136)
    uint256 rhsX = Fr.unwrap(pairingPoints[4]);
    rhsX |= Fr.unwrap(pairingPoints[5]) << 136;

    uint256 rhsY = Fr.unwrap(pairingPoints[6]);
    rhsY |= Fr.unwrap(pairingPoints[7]) << 136;

    // Reconstructed coordinates must be < Q to prevent malleability.
    // Without this, two different limb encodings could map to the same curve point
    // (via mulmod reduction in on-curve checks) but produce different transcript hashes.
    require(lhsX < Q && lhsY < Q && rhsX < Q && rhsY < Q, Errors.ValueGeGroupOrder());

    lhs.x = lhsX;
    lhs.y = lhsY;
    rhs.x = rhsX;
    rhs.y = rhsY;
}

/**
 * Hash the pairing inputs from the present verification context with those extracted from the public inputs.
 *
 * @param proofPairingPoints Pairing points from the proof - (public inputs).
 * @param accLhs Accumulator point for the left side - result of shplemini.
 * @param accRhs Accumulator point for the right side - result of shplemini.
 * @return recursionSeparator The recursion separator - generated from hashing the above.
 */
function generateRecursionSeparator(
    Fr[PAIRING_POINTS_SIZE] memory proofPairingPoints,
    Honk.G1Point memory accLhs,
    Honk.G1Point memory accRhs
) pure returns (Fr recursionSeparator) {
    // hash the proof aggregated X
    // hash the proof aggregated Y
    // hash the accum X
    // hash the accum Y

    (Honk.G1Point memory proofLhs, Honk.G1Point memory proofRhs) = convertPairingPointsToG1(proofPairingPoints);

    uint256[8] memory recursionSeparatorElements;

    // Proof points
    recursionSeparatorElements[0] = proofLhs.x;
    recursionSeparatorElements[1] = proofLhs.y;
    recursionSeparatorElements[2] = proofRhs.x;
    recursionSeparatorElements[3] = proofRhs.y;

    // Accumulator points
    recursionSeparatorElements[4] = accLhs.x;
    recursionSeparatorElements[5] = accLhs.y;
    recursionSeparatorElements[6] = accRhs.x;
    recursionSeparatorElements[7] = accRhs.y;

    recursionSeparator = FrLib.from(uint256(keccak256(abi.encodePacked(recursionSeparatorElements))) % P);
}

/**
 * G1 Mul with Separator
 * Using the ecAdd and ecMul precompiles
 *
 * @param basePoint The point to multiply.
 * @param other The other point to add.
 * @param recursionSeperator The separator to use for the multiplication.
 * @return `(recursionSeperator * basePoint) + other`.
 */
function mulWithSeperator(Honk.G1Point memory basePoint, Honk.G1Point memory other, Fr recursionSeperator)
    view
    returns (Honk.G1Point memory)
{
    Honk.G1Point memory result;

    result = ecMul(recursionSeperator, basePoint);
    result = ecAdd(result, other);

    return result;
}

/**
 * G1 Mul
 * Takes a Fr value and a G1 point and uses the ecMul precompile to return the result.
 *
 * @param value The value to multiply the point by.
 * @param point The point to multiply.
 * @return result The result of the multiplication.
 */
function ecMul(Fr value, Honk.G1Point memory point) view returns (Honk.G1Point memory) {
    Honk.G1Point memory result;

    assembly {
        let free := mload(0x40)
        // Write the point into memory (two 32 byte words)
        // Memory layout:
        // Address    |  value
        // free       |  point.x
        // free + 0x20|  point.y
        mstore(free, mload(point))
        mstore(add(free, 0x20), mload(add(point, 0x20)))
        // Write the scalar into memory (one 32 byte word)
        // Memory layout:
        // Address    |  value
        // free + 0x40|  value
        mstore(add(free, 0x40), value)

        // Call the ecMul precompile, it takes in the following
        // [point.x, point.y, scalar], and returns the result back into the free memory location.
        let success := staticcall(gas(), 0x07, free, 0x60, free, 0x40)
        if iszero(success) {
            revert(0, 0)
        }
        // Copy the result of the multiplication back into the result memory location.
        // Memory layout:
        // Address    |  value
        // result     |  result.x
        // result + 0x20|  result.y
        mstore(result, mload(free))
        mstore(add(result, 0x20), mload(add(free, 0x20)))

        mstore(0x40, add(free, 0x60))
    }

    return result;
}

/**
 * G1 Add
 * Takes two G1 points and uses the ecAdd precompile to return the result.
 *
 * @param lhs The left hand side of the addition.
 * @param rhs The right hand side of the addition.
 * @return result The result of the addition.
 */
function ecAdd(Honk.G1Point memory lhs, Honk.G1Point memory rhs) view returns (Honk.G1Point memory) {
    Honk.G1Point memory result;

    assembly {
        let free := mload(0x40)
        // Write lhs into memory (two 32 byte words)
        // Memory layout:
        // Address    |  value
        // free       |  lhs.x
        // free + 0x20|  lhs.y
        mstore(free, mload(lhs))
        mstore(add(free, 0x20), mload(add(lhs, 0x20)))

        // Write rhs into memory (two 32 byte words)
        // Memory layout:
        // Address    |  value
        // free + 0x40|  rhs.x
        // free + 0x60|  rhs.y
        mstore(add(free, 0x40), mload(rhs))
        mstore(add(free, 0x60), mload(add(rhs, 0x20)))

        // Call the ecAdd precompile, it takes in the following
        // [lhs.x, lhs.y, rhs.x, rhs.y], and returns their addition back into the free memory location.
        let success := staticcall(gas(), 0x06, free, 0x80, free, 0x40)
        if iszero(success) { revert(0, 0) }

        // Copy the result of the addition back into the result memory location.
        // Memory layout:
        // Address    |  value
        // result     |  result.x
        // result + 0x20|  result.y
        mstore(result, mload(free))
        mstore(add(result, 0x20), mload(add(free, 0x20)))

        mstore(0x40, add(free, 0x80))
    }

    return result;
}

function rejectPointAtInfinity(Honk.G1Point memory point) pure {
    require((point.x | point.y) != 0, Errors.PointAtInfinity());
}

/**
 * Check if pairing point limbs are all zero (default/infinity).
 * Default pairing points indicate no recursive verification occurred.
 */
function arePairingPointsDefault(Fr[PAIRING_POINTS_SIZE] memory pairingPoints) pure returns (bool) {
    uint256 acc = 0;
    for (uint256 i = 0; i < PAIRING_POINTS_SIZE; i++) {
        acc |= Fr.unwrap(pairingPoints[i]);
    }
    return acc == 0;
}

function pairing(Honk.G1Point memory rhs, Honk.G1Point memory lhs) view returns (bool decodedResult) {
    bytes memory input = abi.encodePacked(
        rhs.x,
        rhs.y,
        // Fixed G2 point
        uint256(0x198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c2),
        uint256(0x1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed),
        uint256(0x090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b),
        uint256(0x12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa),
        lhs.x,
        lhs.y,
        // G2 point from VK
        uint256(0x260e01b251f6f1c7e7ff4e580791dee8ea51d87a358e038b4efe30fac09383c1),
        uint256(0x0118c4d5b837bcc2bc89b5b398b5974e9f5944073b32078b7e231fec938883b0),
        uint256(0x04fc6369f7110fe3d25156c1bb9a72859cf2a04641f99ba4ee413c80da6a5fe4),
        uint256(0x22febda3c0c0632a56475b4214e5615e11e6dd3f96e6cea2854a87d4dacc5e55)
    );

    (bool success, bytes memory result) = address(0x08).staticcall(input);
    decodedResult = success && abi.decode(result, (bool));
}

abstract contract BaseZKHonkVerifier is IVerifier {
    using FrLib for Fr;

    struct PairingInputs {
        Honk.G1Point P_0;
        Honk.G1Point P_1;
    }

    struct SmallSubgroupIpaIntermediates {
        Fr[SUBGROUP_SIZE] challengePolyLagrange;
        Fr challengePolyEval;
        Fr lagrangeFirst;
        Fr lagrangeLast;
        Fr rootPower;
        Fr[SUBGROUP_SIZE] denominators; // this has to disappear
        Fr diff;
    }

    // Constants for proof length calculation (matching UltraKeccakZKFlavor)
    uint256 internal constant NUM_WITNESS_ENTITIES = 8 + NUM_MASKING_POLYNOMIALS;
    uint256 internal constant NUM_ELEMENTS_COMM = 2; // uint256 elements for curve points
    uint256 internal constant NUM_ELEMENTS_FR = 1; // uint256 elements for field elements
    uint256 internal constant NUM_LIBRA_EVALUATIONS = 4; // libra evaluations

    uint256 internal constant LIBRA_COMMITMENTS = 3;
    uint256 internal constant LIBRA_EVALUATIONS = 4;
    uint256 internal constant LIBRA_UNIVARIATES_LENGTH = 9;

    uint256 internal constant SHIFTED_COMMITMENTS_START = 30;
    uint256 internal constant PERMUTATION_ARGUMENT_VALUE_SEPARATOR = 1 << 28;

    uint256 internal immutable $N;
    uint256 internal immutable $LOG_N;
    uint256 internal immutable $VK_HASH;
    uint256 internal immutable $NUM_PUBLIC_INPUTS;
    uint256 internal immutable $MSMSize;

    constructor(uint256 _N, uint256 _logN, uint256 _vkHash, uint256 _numPublicInputs) {
        $N = _N;
        $LOG_N = _logN;
        $VK_HASH = _vkHash;
        $NUM_PUBLIC_INPUTS = _numPublicInputs;
        $MSMSize = NUMBER_UNSHIFTED_ZK + _logN + LIBRA_COMMITMENTS + 2;
    }

    function verify(bytes calldata proof, bytes32[] calldata publicInputs)
        public
        view
        override
        returns (bool verified)
    {
        // Calculate expected proof size based on $LOG_N
        uint256 expectedProofSize = calculateProofSize($LOG_N);

        // Check the received proof is the expected size where each field element is 32 bytes
        require(
            proof.length == expectedProofSize, Errors.ProofLengthWrongWithLogN($LOG_N, proof.length, expectedProofSize)
        );

        Honk.VerificationKey memory vk = loadVerificationKey();
        Honk.ZKProof memory p = ZKTranscriptLib.loadProof(proof, $LOG_N);

        require(publicInputs.length == vk.publicInputsSize - PAIRING_POINTS_SIZE, Errors.PublicInputsLengthWrong());

        // Generate the fiat shamir challenges for the whole protocol
        ZKTranscript memory t =
            ZKTranscriptLib.generateTranscript(p, publicInputs, $VK_HASH, $NUM_PUBLIC_INPUTS, $LOG_N);

        // Derive public input delta
        t.relationParameters.publicInputsDelta = computePublicInputDelta(
            publicInputs,
            p.pairingPointObject,
            t.relationParameters.beta,
            t.relationParameters.gamma, /*pubInputsOffset=*/
            1
        );

        // Sumcheck
        require(verifySumcheck(p, t), Errors.SumcheckFailed());
        require(verifyShplemini(p, vk, t), Errors.ShpleminiFailed());

        verified = true;
    }

    function computePublicInputDelta(
        bytes32[] memory publicInputs,
        Fr[PAIRING_POINTS_SIZE] memory pairingPointObject,
        Fr beta,
        Fr gamma,
        uint256 offset
    ) internal view returns (Fr publicInputDelta) {
        Fr numerator = Fr.wrap(1);
        Fr denominator = Fr.wrap(1);

        Fr numeratorAcc = gamma + (beta * FrLib.from(PERMUTATION_ARGUMENT_VALUE_SEPARATOR + offset));
        Fr denominatorAcc = gamma - (beta * FrLib.from(offset + 1));

        {
            for (uint256 i = 0; i < $NUM_PUBLIC_INPUTS - PAIRING_POINTS_SIZE; i++) {
                Fr pubInput = FrLib.fromBytes32(publicInputs[i]);

                numerator = numerator * (numeratorAcc + pubInput);
                denominator = denominator * (denominatorAcc + pubInput);

                numeratorAcc = numeratorAcc + beta;
                denominatorAcc = denominatorAcc - beta;
            }

            for (uint256 i = 0; i < PAIRING_POINTS_SIZE; i++) {
                Fr pubInput = pairingPointObject[i];

                numerator = numerator * (numeratorAcc + pubInput);
                denominator = denominator * (denominatorAcc + pubInput);

                numeratorAcc = numeratorAcc + beta;
                denominatorAcc = denominatorAcc - beta;
            }
        }

        // Fr delta = numerator / denominator; // TOOO: batch invert later?
        publicInputDelta = FrLib.div(numerator, denominator);
    }

    function verifySumcheck(Honk.ZKProof memory proof, ZKTranscript memory tp) internal view returns (bool verified) {
        Fr roundTargetSum = tp.libraChallenge * proof.libraSum; // default 0
        Fr powPartialEvaluation = Fr.wrap(1);

        // We perform sumcheck reductions over log n rounds ( the multivariate degree )
        for (uint256 round; round < $LOG_N; ++round) {
            Fr[ZK_BATCHED_RELATION_PARTIAL_LENGTH] memory roundUnivariate = proof.sumcheckUnivariates[round];
            Fr totalSum = roundUnivariate[0] + roundUnivariate[1];
            require(totalSum == roundTargetSum, Errors.SumcheckFailed());

            Fr roundChallenge = tp.sumCheckUChallenges[round];

            // Update the round target for the next rounf
            roundTargetSum = computeNextTargetSum(roundUnivariate, roundChallenge);
            powPartialEvaluation =
                powPartialEvaluation * (Fr.wrap(1) + roundChallenge * (tp.gateChallenges[round] - Fr.wrap(1)));
        }

        // Last round
        // For ZK flavors: sumcheckEvaluations has 42 elements
        // Index 0 is gemini_masking_poly, indices 1-41 are the regular entities used in relations
        Fr[NUMBER_OF_ENTITIES] memory relationsEvaluations;
        for (uint256 i = 0; i < NUMBER_OF_ENTITIES; i++) {
            relationsEvaluations[i] = proof.sumcheckEvaluations[i + NUM_MASKING_POLYNOMIALS]; // Skip gemini_masking_poly at index 0
        }
        Fr grandHonkRelationSum = RelationsLib.accumulateRelationEvaluations(
            relationsEvaluations, tp.relationParameters, tp.alphas, powPartialEvaluation
        );

        Fr evaluation = Fr.wrap(1);
        for (uint256 i = 2; i < $LOG_N; i++) {
            evaluation = evaluation * tp.sumCheckUChallenges[i];
        }

        grandHonkRelationSum =
            grandHonkRelationSum * (Fr.wrap(1) - evaluation) + proof.libraEvaluation * tp.libraChallenge;
        verified = (grandHonkRelationSum == roundTargetSum);
    }

    // Return the new target sum for the next sumcheck round
    function computeNextTargetSum(Fr[ZK_BATCHED_RELATION_PARTIAL_LENGTH] memory roundUnivariates, Fr roundChallenge)
        internal
        view
        returns (Fr targetSum)
    {
        Fr[ZK_BATCHED_RELATION_PARTIAL_LENGTH] memory BARYCENTRIC_LAGRANGE_DENOMINATORS = [
            Fr.wrap(0x0000000000000000000000000000000000000000000000000000000000009d80),
            Fr.wrap(0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593efffec51),
            Fr.wrap(0x00000000000000000000000000000000000000000000000000000000000005a0),
            Fr.wrap(0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593effffd31),
            Fr.wrap(0x0000000000000000000000000000000000000000000000000000000000000240),
            Fr.wrap(0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593effffd31),
            Fr.wrap(0x00000000000000000000000000000000000000000000000000000000000005a0),
            Fr.wrap(0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593efffec51),
            Fr.wrap(0x0000000000000000000000000000000000000000000000000000000000009d80)
        ];

        // To compute the next target sum, we evaluate the given univariate at a point u (challenge).

        // Performing Barycentric evaluations
        // Compute B(x)
        Fr numeratorValue = Fr.wrap(1);
        for (uint256 i = 0; i < ZK_BATCHED_RELATION_PARTIAL_LENGTH; ++i) {
            numeratorValue = numeratorValue * (roundChallenge - Fr.wrap(i));
        }

        Fr[ZK_BATCHED_RELATION_PARTIAL_LENGTH] memory denominatorInverses;
        for (uint256 i = 0; i < ZK_BATCHED_RELATION_PARTIAL_LENGTH; ++i) {
            denominatorInverses[i] = FrLib.invert(BARYCENTRIC_LAGRANGE_DENOMINATORS[i] * (roundChallenge - Fr.wrap(i)));
        }

        for (uint256 i = 0; i < ZK_BATCHED_RELATION_PARTIAL_LENGTH; ++i) {
            targetSum = targetSum + roundUnivariates[i] * denominatorInverses[i];
        }

        // Scale the sum by the value of B(x)
        targetSum = targetSum * numeratorValue;
    }

    function verifyShplemini(Honk.ZKProof memory proof, Honk.VerificationKey memory vk, ZKTranscript memory tp)
        internal
        view
        returns (bool verified)
    {
        CommitmentSchemeLib.ShpleminiIntermediates memory mem; // stack

        // - Compute vector (r, r², ... , r²⁽ⁿ⁻¹⁾), where n = log_circuit_size
        Fr[] memory powers_of_evaluation_challenge = CommitmentSchemeLib.computeSquares(tp.geminiR, $LOG_N);
        // Arrays hold values that will be linearly combined for the gemini and shplonk batch openings
        Fr[] memory scalars = new Fr[]($MSMSize);
        Honk.G1Point[] memory commitments = new Honk.G1Point[]($MSMSize);

        mem.posInvertedDenominator = (tp.shplonkZ - powers_of_evaluation_challenge[0]).invert();
        mem.negInvertedDenominator = (tp.shplonkZ + powers_of_evaluation_challenge[0]).invert();

        mem.unshiftedScalar = mem.posInvertedDenominator + (tp.shplonkNu * mem.negInvertedDenominator);
        mem.shiftedScalar =
            tp.geminiR.invert() * (mem.posInvertedDenominator - (tp.shplonkNu * mem.negInvertedDenominator));

        scalars[0] = Fr.wrap(1);
        commitments[0] = proof.shplonkQ;

        /* Batch multivariate opening claims, shifted and unshifted
        * The vector of scalars is populated as follows:
        * \f[
        * \left(
        * - \left(\frac{1}{z-r} + \nu \times \frac{1}{z+r}\right),
        * \ldots,
        * - \rho^{i+k-1} \times \left(\frac{1}{z-r} + \nu \times \frac{1}{z+r}\right),
        * - \rho^{i+k} \times \frac{1}{r} \times \left(\frac{1}{z-r} - \nu \times \frac{1}{z+r}\right),
        * \ldots,
        * - \rho^{k+m-1} \times \frac{1}{r} \times \left(\frac{1}{z-r} - \nu \times \frac{1}{z+r}\right)
        * \right)
        * \f]
        *
        * The following vector is concatenated to the vector of commitments:
        * \f[
        * f_0, \ldots, f_{m-1}, f_{\text{shift}, 0}, \ldots, f_{\text{shift}, k-1}
        * \f]
        *
        * Simultaneously, the evaluation of the multilinear polynomial
        * \f[
        * \sum \rho^i \cdot f_i + \sum \rho^{i+k} \cdot f_{\text{shift}, i}
        * \f]
        * at the challenge point \f$ (u_0,\ldots, u_{n-1}) \f$ is computed.
        *
        * This approach minimizes the number of iterations over the commitments to multilinear polynomials
        * and eliminates the need to store the powers of \f$ \rho \f$.
        */
        // For ZK flavors: evaluations array is [gemini_masking_poly, qm, qc, ql, qr, ...]
        // Start batching challenge at 1, not rho, to match non-ZK pattern
        mem.batchingChallenge = Fr.wrap(1);
        mem.batchedEvaluation = Fr.wrap(0);

        mem.unshiftedScalarNeg = mem.unshiftedScalar.neg();
        mem.shiftedScalarNeg = mem.shiftedScalar.neg();

        // Process all NUMBER_UNSHIFTED_ZK evaluations (includes gemini_masking_poly at index 0)
        for (uint256 i = 1; i <= NUMBER_UNSHIFTED_ZK; ++i) {
            scalars[i] = mem.unshiftedScalarNeg * mem.batchingChallenge;
            mem.batchedEvaluation = mem.batchedEvaluation
                + (proof.sumcheckEvaluations[i - NUM_MASKING_POLYNOMIALS] * mem.batchingChallenge);
            mem.batchingChallenge = mem.batchingChallenge * tp.rho;
        }
        // g commitments are accumulated at r
        // For each of the to be shifted commitments perform the shift in place by
        // adding to the unshifted value.
        // We do so, as the values are to be used in batchMul later, and as
        // `a * c + b * c = (a + b) * c` this will allow us to reduce memory and compute.
        // Applied to w1, w2, w3, w4 and zPerm
        for (uint256 i = 0; i < NUMBER_TO_BE_SHIFTED; ++i) {
            uint256 scalarOff = i + SHIFTED_COMMITMENTS_START;
            uint256 evaluationOff = i + NUMBER_UNSHIFTED_ZK;

            scalars[scalarOff] = scalars[scalarOff] + (mem.shiftedScalarNeg * mem.batchingChallenge);
            mem.batchedEvaluation =
                mem.batchedEvaluation + (proof.sumcheckEvaluations[evaluationOff] * mem.batchingChallenge);
            mem.batchingChallenge = mem.batchingChallenge * tp.rho;
        }

        commitments[1] = proof.geminiMaskingPoly;

        commitments[2] = vk.qm;
        commitments[3] = vk.qc;
        commitments[4] = vk.ql;
        commitments[5] = vk.qr;
        commitments[6] = vk.qo;
        commitments[7] = vk.q4;
        commitments[8] = vk.qLookup;
        commitments[9] = vk.qArith;
        commitments[10] = vk.qDeltaRange;
        commitments[11] = vk.qElliptic;
        commitments[12] = vk.qMemory;
        commitments[13] = vk.qNnf;
        commitments[14] = vk.qPoseidon2External;
        commitments[15] = vk.qPoseidon2Internal;
        commitments[16] = vk.s1;
        commitments[17] = vk.s2;
        commitments[18] = vk.s3;
        commitments[19] = vk.s4;
        commitments[20] = vk.id1;
        commitments[21] = vk.id2;
        commitments[22] = vk.id3;
        commitments[23] = vk.id4;
        commitments[24] = vk.t1;
        commitments[25] = vk.t2;
        commitments[26] = vk.t3;
        commitments[27] = vk.t4;
        commitments[28] = vk.lagrangeFirst;
        commitments[29] = vk.lagrangeLast;

        // Accumulate proof points
        commitments[30] = proof.w1;
        commitments[31] = proof.w2;
        commitments[32] = proof.w3;
        commitments[33] = proof.w4;
        commitments[34] = proof.zPerm;
        commitments[35] = proof.lookupInverses;
        commitments[36] = proof.lookupReadCounts;
        commitments[37] = proof.lookupReadTags;

        /* Batch gemini claims from the prover
         * place the commitments to gemini aᵢ to the vector of commitments, compute the contributions from
         * aᵢ(−r²ⁱ) for i=1, … , n−1 to the constant term accumulator, add corresponding scalars
         *
         * 1. Moves the vector
         * \f[
         * \left( \text{com}(A_1), \text{com}(A_2), \ldots, \text{com}(A_{n-1}) \right)
         * \f]
        * to the 'commitments' vector.
        *
        * 2. Computes the scalars:
        * \f[
        * \frac{\nu^{2}}{z + r^2}, \frac{\nu^3}{z + r^4}, \ldots, \frac{\nu^{n-1}}{z + r^{2^{n-1}}}
        * \f]
        * and places them into the 'scalars' vector.
        *
        * 3. Accumulates the summands of the constant term:
         * \f[
         * \sum_{i=2}^{n-1} \frac{\nu^{i} \cdot A_i(-r^{2^i})}{z + r^{2^i}}
         * \f]
         * and adds them to the 'constant_term_accumulator'.
         */

        // Add contributions from A₀(r) and A₀(-r) to constant_term_accumulator:
        // Compute the evaluations Aₗ(r^{2ˡ}) for l = 0, ..., $LOG_N - 1
        Fr[] memory foldPosEvaluations = CommitmentSchemeLib.computeFoldPosEvaluations(
            tp.sumCheckUChallenges,
            mem.batchedEvaluation,
            proof.geminiAEvaluations,
            powers_of_evaluation_challenge,
            $LOG_N
        );

        mem.constantTermAccumulator = foldPosEvaluations[0] * mem.posInvertedDenominator;
        mem.constantTermAccumulator =
            mem.constantTermAccumulator + (proof.geminiAEvaluations[0] * tp.shplonkNu * mem.negInvertedDenominator);

        mem.batchingChallenge = tp.shplonkNu.sqr();
        uint256 boundary = NUMBER_UNSHIFTED_ZK + 1;

        // Compute Shplonk constant term contributions from Aₗ(± r^{2ˡ}) for l = 1, ..., m-1;
        // Compute scalar multipliers for each fold commitment
        for (uint256 i = 0; i < $LOG_N - 1; ++i) {
            bool dummy_round = i >= ($LOG_N - 1);

            if (!dummy_round) {
                // Update inverted denominators
                mem.posInvertedDenominator = (tp.shplonkZ - powers_of_evaluation_challenge[i + 1]).invert();
                mem.negInvertedDenominator = (tp.shplonkZ + powers_of_evaluation_challenge[i + 1]).invert();

                // Compute the scalar multipliers for Aₗ(± r^{2ˡ}) and [Aₗ]
                mem.scalingFactorPos = mem.batchingChallenge * mem.posInvertedDenominator;
                mem.scalingFactorNeg = mem.batchingChallenge * tp.shplonkNu * mem.negInvertedDenominator;
                scalars[boundary + i] = mem.scalingFactorNeg.neg() + mem.scalingFactorPos.neg();

                // Accumulate the const term contribution given by
                // v^{2l} * Aₗ(r^{2ˡ}) /(z-r^{2^l}) + v^{2l+1} * Aₗ(-r^{2ˡ}) /(z+ r^{2^l})
                Fr accumContribution = mem.scalingFactorNeg * proof.geminiAEvaluations[i + 1];
                accumContribution = accumContribution + mem.scalingFactorPos * foldPosEvaluations[i + 1];
                mem.constantTermAccumulator = mem.constantTermAccumulator + accumContribution;
            }
            // Update the running power of v
            mem.batchingChallenge = mem.batchingChallenge * tp.shplonkNu * tp.shplonkNu;

            commitments[boundary + i] = proof.geminiFoldComms[i];
        }

        boundary += $LOG_N - 1;

        // Finalize the batch opening claim
        mem.denominators[0] = Fr.wrap(1).div(tp.shplonkZ - tp.geminiR);
        mem.denominators[1] = Fr.wrap(1).div(tp.shplonkZ - SUBGROUP_GENERATOR * tp.geminiR);
        mem.denominators[2] = mem.denominators[0];
        mem.denominators[3] = mem.denominators[0];

        mem.batchingChallenge = mem.batchingChallenge * tp.shplonkNu * tp.shplonkNu;
        for (uint256 i = 0; i < LIBRA_EVALUATIONS; i++) {
            Fr scalingFactor = mem.denominators[i] * mem.batchingChallenge;
            mem.batchingScalars[i] = scalingFactor.neg();
            mem.batchingChallenge = mem.batchingChallenge * tp.shplonkNu;
            mem.constantTermAccumulator = mem.constantTermAccumulator + scalingFactor * proof.libraPolyEvals[i];
        }
        scalars[boundary] = mem.batchingScalars[0];
        scalars[boundary + 1] = mem.batchingScalars[1] + mem.batchingScalars[2];
        scalars[boundary + 2] = mem.batchingScalars[3];

        for (uint256 i = 0; i < LIBRA_COMMITMENTS; i++) {
            commitments[boundary++] = proof.libraCommitments[i];
        }

        commitments[boundary] = Honk.G1Point({x: 1, y: 2});
        scalars[boundary++] = mem.constantTermAccumulator;

        require(
            checkEvalsConsistency(proof.libraPolyEvals, tp.geminiR, tp.sumCheckUChallenges, proof.libraEvaluation),
            Errors.ConsistencyCheckFailed()
        );

        Honk.G1Point memory quotient_commitment = proof.kzgQuotient;

        commitments[boundary] = quotient_commitment;
        scalars[boundary] = tp.shplonkZ; // evaluation challenge

        PairingInputs memory pair;
        pair.P_0 = batchMul(commitments, scalars);
        pair.P_1 = negateInplace(quotient_commitment);

        // Aggregate pairing points (skip if default/infinity — no recursive verification occurred)
        if (!arePairingPointsDefault(proof.pairingPointObject)) {
            Fr recursionSeparator = generateRecursionSeparator(proof.pairingPointObject, pair.P_0, pair.P_1);
            (Honk.G1Point memory P_0_other, Honk.G1Point memory P_1_other) =
                convertPairingPointsToG1(proof.pairingPointObject);

            // Validate the points from the proof are on the curve
            rejectPointAtInfinity(P_0_other);
            rejectPointAtInfinity(P_1_other);

            // accumulate with aggregate points in proof
            pair.P_0 = mulWithSeperator(pair.P_0, P_0_other, recursionSeparator);
            pair.P_1 = mulWithSeperator(pair.P_1, P_1_other, recursionSeparator);
        }

        return pairing(pair.P_0, pair.P_1);
    }

    function checkEvalsConsistency(
        Fr[LIBRA_EVALUATIONS] memory libraPolyEvals,
        Fr geminiR,
        Fr[CONST_PROOF_SIZE_LOG_N] memory uChallenges,
        Fr libraEval
    ) internal view returns (bool check) {
        Fr one = Fr.wrap(1);
        Fr vanishingPolyEval = geminiR.pow(SUBGROUP_SIZE) - one;
        require(vanishingPolyEval != Fr.wrap(0), Errors.GeminiChallengeInSubgroup());

        SmallSubgroupIpaIntermediates memory mem;
        mem.challengePolyLagrange[0] = one;
        for (uint256 round = 0; round < $LOG_N; round++) {
            uint256 currIdx = 1 + LIBRA_UNIVARIATES_LENGTH * round;
            mem.challengePolyLagrange[currIdx] = one;
            for (uint256 idx = currIdx + 1; idx < currIdx + LIBRA_UNIVARIATES_LENGTH; idx++) {
                mem.challengePolyLagrange[idx] = mem.challengePolyLagrange[idx - 1] * uChallenges[round];
            }
        }

        mem.rootPower = one;
        mem.challengePolyEval = Fr.wrap(0);
        for (uint256 idx = 0; idx < SUBGROUP_SIZE; idx++) {
            mem.denominators[idx] = mem.rootPower * geminiR - one;
            mem.denominators[idx] = mem.denominators[idx].invert();
            mem.challengePolyEval = mem.challengePolyEval + mem.challengePolyLagrange[idx] * mem.denominators[idx];
            mem.rootPower = mem.rootPower * SUBGROUP_GENERATOR_INVERSE;
        }

        Fr numerator = vanishingPolyEval * Fr.wrap(SUBGROUP_SIZE).invert();
        mem.challengePolyEval = mem.challengePolyEval * numerator;
        mem.lagrangeFirst = mem.denominators[0] * numerator;
        mem.lagrangeLast = mem.denominators[SUBGROUP_SIZE - 1] * numerator;

        mem.diff = mem.lagrangeFirst * libraPolyEvals[2];

        mem.diff = mem.diff + (geminiR - SUBGROUP_GENERATOR_INVERSE)
            * (libraPolyEvals[1] - libraPolyEvals[2] - libraPolyEvals[0] * mem.challengePolyEval);
        mem.diff = mem.diff + mem.lagrangeLast * (libraPolyEvals[2] - libraEval) - vanishingPolyEval * libraPolyEvals[3];

        check = mem.diff == Fr.wrap(0);
    }

    // This implementation is the same as above with different constants
    function batchMul(Honk.G1Point[] memory base, Fr[] memory scalars)
        internal
        view
        returns (Honk.G1Point memory result)
    {
        uint256 limit = $MSMSize;

        // Validate all points are on the curve
        for (uint256 i = 0; i < limit; ++i) {
            rejectPointAtInfinity(base[i]);
        }

        bool success = true;
        assembly {
            let free := mload(0x40)

            let count := 0x01
            for {} lt(count, add(limit, 1)) { count := add(count, 1) } {
                // Get loop offsets
                let base_base := add(base, mul(count, 0x20))
                let scalar_base := add(scalars, mul(count, 0x20))

                mstore(add(free, 0x40), mload(mload(base_base)))
                mstore(add(free, 0x60), mload(add(0x20, mload(base_base))))
                // Add scalar
                mstore(add(free, 0x80), mload(scalar_base))

                success := and(success, staticcall(gas(), 7, add(free, 0x40), 0x60, add(free, 0x40), 0x40))
                // accumulator = accumulator + accumulator_2
                success := and(success, staticcall(gas(), 6, free, 0x80, free, 0x40))
            }

            // Return the result
            mstore(result, mload(free))
            mstore(add(result, 0x20), mload(add(free, 0x20)))
        }

        require(success, Errors.ShpleminiFailed());
    }

    // Calculate proof size based on log_n (matching UltraKeccakZKFlavor formula)
    function calculateProofSize(uint256 logN) internal pure returns (uint256) {
        // Witness and Libra commitments
        uint256 proofLength = NUM_WITNESS_ENTITIES * NUM_ELEMENTS_COMM; // witness commitments
        proofLength += NUM_ELEMENTS_COMM * 3; // Libra concat, grand sum, quotient comms + Gemini masking

        // Sumcheck
        proofLength += logN * ZK_BATCHED_RELATION_PARTIAL_LENGTH * NUM_ELEMENTS_FR; // sumcheck univariates
        proofLength += NUMBER_OF_ENTITIES_ZK * NUM_ELEMENTS_FR; // sumcheck evaluations

        // Libra and Gemini
        proofLength += NUM_ELEMENTS_FR * 2; // Libra sum, claimed eval
        proofLength += logN * NUM_ELEMENTS_FR; // Gemini a evaluations
        proofLength += NUM_LIBRA_EVALUATIONS * NUM_ELEMENTS_FR; // libra evaluations

        // PCS commitments
        proofLength += (logN - 1) * NUM_ELEMENTS_COMM; // Gemini Fold commitments
        proofLength += NUM_ELEMENTS_COMM * 2; // Shplonk Q and KZG W commitments

        // Pairing points
        proofLength += PAIRING_POINTS_SIZE; // pairing inputs carried on public inputs

        return proofLength * 32;
    }

    function loadVerificationKey() internal pure virtual returns (Honk.VerificationKey memory);
}

contract HonkVerifier is BaseZKHonkVerifier(N, LOG_N, VK_HASH, NUMBER_OF_PUBLIC_INPUTS) {
     function loadVerificationKey() internal pure override returns (Honk.VerificationKey memory) {
       return HonkVerificationKey.loadVerificationKey();
    }
}
