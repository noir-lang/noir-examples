use dep::std;

fn main(
    root: pub Field,
    index: Field,
    hash_path: [Field; 2],
    secret: Field,
    proposalId: pub Field,
    vote: pub Field
) -> pub Field {
    let note_commitment = std::hash::pedersen_hash([secret]);
    let nullifier = std::hash::pedersen_hash([root, secret, proposalId]);

    let check_root = std::merkle::compute_merkle_root(note_commitment, index, hash_path);
    assert(root == check_root);

    // Originally contrained the vote to avoid front-running,
    // but including the vote as a public input is sufficient

    // assert(vote <= 1);

    nullifier
}

#[test]
fn test_valid_build_merkle_tree() {
    let commitment_0 = std::hash::pedersen_hash([1]);
    let commitment_1 = std::hash::pedersen_hash([2]);
    let commitment_2 = std::hash::pedersen_hash([3]);
    let commitment_3 = std::hash::pedersen_hash([4]);

    let left_branch = std::hash::pedersen_hash([commitment_0, commitment_1]);
    let right_branch = std::hash::pedersen_hash([commitment_2, commitment_3]);

    let root = std::hash::pedersen_hash([left_branch, right_branch]);

    let proposalId = 0;
    let vote = 1;

    let nullifier = main(root, 0, [commitment_1, right_branch], 1, proposalId, vote);

    let expected_nullifier = std::hash::pedersen_hash([root, 1, proposalId]);

    std::println("Merkle Tree:");
    std::println([root]);
    std::println([left_branch, right_branch]);
    std::println([commitment_0, commitment_1, commitment_2, commitment_3]);

    assert(nullifier == expected_nullifier);
}

// fn main(root : pub Field, index : Field, hash_path : [Field; 2], secret: Field, priv_key: Field, proposalId: pub Field, vote: pub u8) -> pub Field {
//     let note_commitment = std::hash::pedersen([priv_key, secret]);
//     let nullifier = std::hash::pedersen([root, priv_key, proposalId]);

//     let check_root = std::merkle::compute_merkle_root(note_commitment[0], index, hash_path);
//     assert(root == check_root);

//     // Originally contrained the vote to avoid front-running,
//     // but including the vote as a public input is sufficient

//     assert(vote <= 1);

//     nullifier[0]
// }

// Helpers for getting note_commitments to build the merkle tree.
// To view: nargo test --show-output

#[test]
fn test_build_merkle_tree() {
    let secret = 9;
    let commitment_0 = std::hash::pedersen_hash([0, secret]);
    let commitment_1 = std::hash::pedersen_hash([1, secret]);
    let commitment_2 = std::hash::pedersen_hash([2, secret]);
    let commitment_3 = std::hash::pedersen_hash([3, secret]);

    let left_branch = std::hash::pedersen_hash([commitment_0, commitment_1]);
    let right_branch = std::hash::pedersen_hash([commitment_2, commitment_3]);

    let root = std::hash::pedersen_hash([left_branch, right_branch]);

    std::println("Merkle Tree:");
    std::println([root]);
    std::println([left_branch, right_branch]);
    std::println([commitment_0, commitment_1, commitment_2, commitment_3]);
}
