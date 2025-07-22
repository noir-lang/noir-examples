mod utils;

pub use utils::{conditional_select, DebugRandomEngine};
use std::collections::bounded_vec::BoundedVec;

/**
 * @brief represents a byte-array of up to MaxBytes, that is used as a "haystack" array,
 *        where we want to validate a substring "needle" is present in the "haystack"
 * @details the "body" parameter contains some input bytes, zero-padded to the nearest multiple of 31
 *          We pack "bytes" into 31-byte "chunks", as this is the maximum number of bytes we can fit
 *          into a field element without overflowing.
 *          TODO: once we can derive generics via arithmetic on other generics, we want this "31" parameter
 *          to be defined by the backend being used instead of being hardcoded to 31
 *
 * @note We perform this 31-byte packing because it dramatically reduces the number of constraints required for substring matching. See (chicken)
 *
 * @tparam MaxBytes: the maximum number of bytes that StringBody can contain
 * @tparam MaxPaddedBytes: the maximum number of bytes after zero-padding to the nearest multiple of 31
 * @tparam PaddedChunks: the number of 31-byte chunks needed to represent MaxPaddedBytes
 **/
pub struct StringBody<let MaxPaddedBytes: u32, let PaddedChunks: u32, let MaxBytes: u32> {
    pub body: [u8; MaxPaddedBytes],
    chunks: [Field; PaddedChunks],
    pub byte_length: u32,
}

/**
 * @brief represents a byte-array of up to MaxBytes, that is used as a "needle" array,
 *        where we want to validate a substring "needle" is present in the "haystack"
 * @tparam MaxBytes: the maximum number of bytes that StringBody can contain
 * @tparam MaxPaddedBytes: the maximum number of bytes after zero-padding to the nearest multiple of 31
 * @tparam PaddedChunksMinusOne: the number of 31-byte chunks needed to represent MaxPaddedBytes minus one!
 *
 * @note PaddedChunksMinusOne is because we are going to do the following:
 *                            1. align the SubString bytes according to the StringBody bytes being matched against
 *                            2. split the aligned bytes into 31-byte chunks. The 1st and last chunks might contain
 *                               fewer than 31 bytes due to the above alignment
 *                            3. validate the aligned-byte-chunks match the StringBody byte chunks
 *       To account for the fact that the 1st and last chunks might have fewer bytes we treat those separately
 *       The param PaddedChunksMinusOne is the number of 31-byte chunks required to represent SubString *EXCLUDING* the initial and final chunks
 */
pub struct SubString<let MaxPaddedBytes: u32, let PaddedChunksMinusOne: u32, let MaxBytes: u32> {
    pub body: [u8; MaxPaddedBytes],
    pub byte_length: u32,
}

pub type StringBody32 = StringBody<62, 2, 32>;
pub type StringBody64 = StringBody<93, 3, 64>;
pub type StringBody128 = StringBody<155, 5, 128>;
pub type StringBody256 = StringBody<279, 9, 256>;
pub type StringBody512 = StringBody<527, 17, 512>;
pub type StringBody1024 = StringBody<1054, 34, 1024>;
pub type StringBody2048 = StringBody<2077, 67, 2048>;
pub type StringBody4096 = StringBody<4123, 133, 4096>;
pub type StringBody8192 = StringBody<8215, 265, 8192>;
pub type StringBody16384 = StringBody<16399, 529, 16384>;

pub type SubString32 = SubString<62, 1, 32>;
pub type SubString64 = SubString<93, 2, 64>;
pub type SubString128 = SubString<155, 4, 128>;
pub type SubString256 = SubString<279, 8, 256>;
pub type SubString512 = SubString<527, 16, 512>;
pub type SubString1024 = SubString<1054, 33, 1024>;

pub trait SubStringTrait {
    fn match_chunks<let HaystackChunks: u32>(
        self,
        haystack: [Field; HaystackChunks],
        num_bytes_in_first_chunk: u32,
        body_chunk_offset: u32,
        num_full_chunks: u32,
    );

    fn len(self) -> u32;
    fn get(self, idx: u32) -> u8;
    fn get_body(self) -> [u8];
}

// ######################################################
// S U B S T R I N G
// ######################################################
impl<let MaxPaddedBytes: u32, let PaddedChunksMinusOne: u32, let MaxBytes: u32> SubString<MaxPaddedBytes, PaddedChunksMinusOne, MaxBytes> {

    /**
     * @brief construct a SubString object from an input byte array
     * @details the input byte array must have a number of bytes less than or equal to MaxBytes
     **/
    pub fn new<let InputBytes: u32>(input: [u8; InputBytes], input_length: u32) -> Self {
        assert(MaxBytes <= MaxPaddedBytes);
        assert(input_length <= MaxBytes);
        assert(InputBytes <= MaxBytes);
        let mut body: [u8; MaxPaddedBytes] = [0; MaxPaddedBytes];
        for i in 0..InputBytes {
            body[i] = input[i];
        }
        SubString { body, byte_length: input_length }
    }

    /**
     * @brief concatenate two SubString objects together
     * @details each SubString can have different MaxBytes sizes, however we need OtherBytes <= MaxBytes
     *          (use concat_into for cases where this is not the case)
     **/
    pub fn concat<let OtherPaddedBytes: u32, let OtherPaddedChunks: u32, let OtherMaxBytes: u32>(
        self,
        other: SubString<OtherPaddedBytes, OtherPaddedChunks, OtherMaxBytes>,
    ) -> Self {
        assert(
            OtherPaddedBytes <= MaxPaddedBytes,
            "SubString::concat. SubString being concatted has larger max length. Try calling concat_into",
        );
        assert(
            self.byte_length + other.byte_length <= MaxPaddedBytes,
            "SubString::concat, concatenated string exceeds MaxPaddedBytes",
        );
        let mut body = self.body;
        let offset: u32 = self.byte_length;
        for i in 0..MaxPaddedBytes {
            if (i + offset < MaxPaddedBytes) {
                body[i + offset] = other.body[i];
            }
        }
        SubString { body, byte_length: self.byte_length + other.byte_length }
    }

    /**
     * @brief concatenate two SubString objects together. Return type has OtherPaddedBytes max bytes
     * @details each SubString can have different MaxBytes sizes, however we need MaxBytes <= OtherBytes
     *          (use concat for cases where this is not the case)
     **/
    pub fn concat_into<let OtherPaddedBytes: u32, let OtherPaddedChunks: u32, let OtherMaxBytes: u32>(
        self,
        other: SubString<OtherPaddedBytes, OtherPaddedChunks, OtherMaxBytes>,
    ) -> SubString<OtherPaddedBytes, OtherPaddedChunks, OtherMaxBytes> {
        assert(
            MaxPaddedBytes <= OtherPaddedBytes,
            "SubString::concat_into. SubString being concat has larger max length. Try calling concat",
        );
        assert(
            self.byte_length + other.byte_length <= OtherPaddedBytes,
            "SubString::concat_into, concatenated string exceeds MaxPaddedBytes",
        );
        let mut body: [u8; OtherPaddedBytes] = [0; OtherPaddedBytes];
        for i in 0..MaxBytes {
            body[i] = self.body[i];
        }

        let offset: u32 = self.byte_length;
        for i in 0..OtherPaddedBytes {
            if (i + offset < OtherPaddedBytes) {
                body[i + offset] = other.body[i];
            }
        }
        SubString { body, byte_length: self.byte_length + other.byte_length }
    }
}

impl<let MaxPaddedBytes: u32, let PaddedChunksMinusOne: u32, let MaxBytes: u32> SubStringTrait for SubString<MaxPaddedBytes, PaddedChunksMinusOne, MaxBytes> {

    fn len(self) -> u32 {
        self.byte_length
    }
    fn get(self, idx: u32) -> u8 {
        self.body[idx]
    }
    fn get_body(self) -> [u8] {
        let x = self.body.as_slice();
        x
    }

    /**
     * @brief given some `haystack` 31-byte chunks, validate that there exist `num_full_chunks`
     *        in the SubString, starting at byte position `starting_needle_byte`.
     *        The selected chunks must be equal to the haystack chunks starting at `starting_haystack_chunk`
     **/
    fn match_chunks<let HaystackChunks: u32>(
        self,
        haystack: [Field; HaystackChunks],
        starting_needle_byte: u32,
        starting_haystack_chunk: u32,
        num_full_chunks: u32,
    ) {
        let mut substring_chunks: [Field; PaddedChunksMinusOne] = [0; PaddedChunksMinusOne];
        // pack the substring into 31 byte chunks.
        // This is fairly expensive as we need a ROM table to access the SubString.body
        // which is 2 gates per byte
        for i in 0..PaddedChunksMinusOne {
            let mut slice: Field = 0;
            for j in 0..31 {
                slice *= 256;
                let substring_idx = starting_needle_byte + (i * 31) + j;
                let mut byte = self.body[substring_idx];
                slice += byte as Field;
            }
            std::as_witness(slice);
            substring_chunks[i] = slice;
        }
        // iterate over the needle chunks and validate they match the haystack chunks
        for i in 0..PaddedChunksMinusOne {
            let predicate = i < num_full_chunks;
            let lhs = substring_chunks[i];
            let rhs = haystack[predicate as u32 * (i + starting_haystack_chunk)];
            assert(predicate as Field * (lhs - rhs) == 0);
        }
    }
}

impl<let MaxPaddedBytes: u32, let PaddedChunksMinusOne: u32, let MaxBytes: u32> From<BoundedVec<u8, MaxBytes>> for SubString<MaxPaddedBytes, PaddedChunksMinusOne, MaxBytes> {
    fn from(input: BoundedVec<u8, MaxBytes>) -> Self {
        Self::new(input.storage(), input.len() as u32)
    }
}

// ######################################################
// S T R I N G   B O D Y
// ######################################################
impl<let MaxPaddedBytes: u32, let PaddedChunks: u32, let MaxBytes: u32> StringBody<MaxPaddedBytes, PaddedChunks, MaxBytes> {

    /**
     * @brief construct a StringBody object from an input byte array
     * @details the input byte array must have a number of bytes less than or equal to MaxBytes
     **/
    pub fn new<let InputBytes: u32>(data: [u8; InputBytes], length: u32) -> Self {
        assert(length <= MaxBytes);
        assert(length <= InputBytes);
        let mut body: [u8; MaxPaddedBytes] = [0; MaxPaddedBytes];
        for i in 0..InputBytes {
            body[i] = data[i];
        }
        StringBody { body, chunks: compute_chunks(body), byte_length: length }
    }

    /**
     * @brief Validate a substring exists in the StringBody. Returns a success flag and the position within the StringBody that the match was found
     **/
    pub fn substring_match<NeedleSubString>(self, substring: NeedleSubString) -> (bool, u32)
    where
        NeedleSubString: SubStringTrait,
    {
        // use unconstrained function to determine:
        // a: is the substring present in the body text
        // b: the position of the first match in the body text
        let position: u32 = unsafe {
            // Safety: The rest of this function checks this.
            utils::search(
                self.body,
                substring.get_body(),
                self.byte_length,
                substring.len(),
            )
        };

        assert(
            position + substring.len() <= self.byte_length,
            "substring not present in main text (match found if a padding text included. is main text correctly formatted?)",
        );
        let substring_length = substring.len();

        // chunk_index = which 31-byte haystack chunk does the needle begin in?
        let chunk_index: u32 = position / 31;
        // chunk_offset = how many haystack bytes are present in the 1st haystack chunk?
        let chunk_offset: u32 = position % 31;
        // how many needle bytes are in 1st haystack chunk?
        let num_bytes_in_first_chunk: u32 = 31 - chunk_offset;
        let mut starting_needle_byte_index_of_final_chunk: u32 = 0;
        let mut chunk_index_of_final_haystack_chunk_with_matching_needle_bytes: u32 = 0;
        let mut num_full_chunks = 0;

        // is there only one haystack chunk that contains needle bytes?
        let merge_initial_final_needle_chunks = substring_length < num_bytes_in_first_chunk;

        // if the above is false...
        if (!merge_initial_final_needle_chunks) {
            // compute how many full 31-byte haystack chunks contain 31 needle bytes
            num_full_chunks = (substring_length - num_bytes_in_first_chunk) / 31;
            // for the final haystack chunk that contains needle bytes, where in the needle does this chunk begin?
            starting_needle_byte_index_of_final_chunk =
                num_full_chunks * 31 + num_bytes_in_first_chunk;

            // what is the index of the final haystack chunk that contains needle bytes?
            chunk_index_of_final_haystack_chunk_with_matching_needle_bytes =
                num_full_chunks + chunk_index + 1;
        } else {
            starting_needle_byte_index_of_final_chunk = 0;
            // if the needle bytes does NOT span more than 1 haystack chunk,
            // the final haystack index will be the same as the initial haystack index
            chunk_index_of_final_haystack_chunk_with_matching_needle_bytes = chunk_index;
        }

        // To minimize the number of comparisons between the haystack bytes and the needle bytes,
        // we pack both the haystack bytes and needle bytes into 31-byte Field "chunks" and compare chunks.
        // To do this correctly, we need to align the needle chunks with the haystack chunks
        /*
            e.g. consider a toy example where we pack 3 bytes into a chunk
            haystack: [VWXZYABCDEQRSTU]
            needle: [ABCDE]
        when constructing needle chunks, we need to align according to where the needle is located in the haystack
            haystack chunks:   [VWX] [ZYA] [BCD] [EQR] [STU]
                                      _..   ...   .__
            processed needle chunks: [ZYA] [BCD] [EQR]
        a "_" symbole means that a chunk byte has been sourced from the haystack bytes,
            a "." symbol means a byte is sourced from the needle bytes
        Both the initial and final chunks of the processed needle are "composite" constructions.
            If chunk byte index < `position` or is > `position + needle length", byte is sourced from haystack, otherwise byte is sourced from needle
        The way we execute this in code is to define an "initial" needle chunk and a "final" needle chunk.
            Num needle bytes in initial chunk = position % 31
            Num needle bytes in final chunk = (needle_length - (position % 31)) % 31
        If needle_length < 31 then the "initial" and "final" chunks
            are actually the *same* chunk and we must perform a merge operation
            (see later in algo for comments)
        */
        // instead of directly reading haystack bytes, we derive the bytes from the haystack chunks.
        // This way we don't have to instantiate the haystack bytes as a ROM table, which would cost 2 * haystack.length gates
        let offset_to_first_needle_byte_in_chunk: u32 = chunk_offset;
        let initial_haystack_chunk = self.chunks[chunk_index];
        let final_haystack_chunk =
            self.chunks[chunk_index_of_final_haystack_chunk_with_matching_needle_bytes];

        let initial_body_bytes: [u8; 31] = initial_haystack_chunk.to_be_bytes();
        let final_body_bytes: [u8; 31] = final_haystack_chunk.to_be_bytes();

        // When defining the initial chunk bytes, we can represent as Field elements as we are deriving values from known bytes.
        // This saves us a few gates
        let mut initial_chunk: [Field; 31] = [0; 31];
        let mut final_chunk: [Field; 31] = [0; 31];
        for i in 0..31 {
            // if i < offset_to_first_needle_byte_in_chunk, we read from the haystack
            // otherwise we read from the needle
            // n.b. this can be done with an if statement, but the following code produces fewer constraints
            let idx: u32 = i;
            let predicate = i < offset_to_first_needle_byte_in_chunk;
            let lhs: Field = initial_body_bytes[i] as Field;
            // if i < offset_to_first_needle_byte_in_chunk then `idx - offset_to_first_needle_byte_in_chunk` is negative
            // to ensure we access array correctly we need to set the lookup index to 0 if predicate = 0
            let substring_idx = if predicate {
                0
            } else {
                idx - offset_to_first_needle_byte_in_chunk
            };
            let rhs: Field = substring.get(substring_idx) as Field;
            let byte: Field = predicate as Field * (lhs - rhs) + rhs;
            initial_chunk[i] = byte;
        }

        // If `merge_initial_final_needle_chunks = true`, `final_chunk` will contain the full needle data,
        // this requires some complex logic to determine where we are sourcing the needle bytes from.
        // Either they come from the `initial_chunk`, the haystack bytes or the substring bytes.
        for i in 0..31 {
            let mut lhs_index = starting_needle_byte_index_of_final_chunk + i;
            let predicate = lhs_index < substring_length;
            /*
                | merge_initial_final_needle_chunks | predicate | byte_source              |
                | false                             | false     | body_bytes[i]            |
                | false                             | true      | substring[lhs_idx]       |
                | true                              | false     | body_bytes[i]            |
                | true                              | true      | initial_chunk[lhs_index] |
            NOTE: if `merge = true` and `predicate = true`, we read from `initial_chunk` to short-circuit some extra logic.
                      if `initial_chunk` did not exist, then we would need to validate whether `i < offset_to_first_needle_byte_in_chunk`.
                      if true, the byte source would be body_bytes, otherwise the source would be substring bytes
            */
            let substring_idx = (predicate as u32) * lhs_index;
            let byte_from_substring = substring.get(substring_idx) as Field;
            let byte_from_initial_chunk = initial_chunk[i] as Field;
            let byte_from_haystack = final_body_bytes[i] as Field;

            // TODO: find out why this cuts 1 gate per iteration
            std::as_witness(byte_from_initial_chunk);

            let p = predicate as Field;
            let m = merge_initial_final_needle_chunks as Field;
            // p * (m * (a - b) + (b - c)) + c
            let ab = byte_from_initial_chunk - byte_from_substring;
            std::as_witness(ab);
            let bc = byte_from_substring - byte_from_haystack;
            let t0 = m * ab + bc;
            let destination_byte = p * t0 + byte_from_haystack;

            final_chunk[i] = destination_byte;
        }

        // TODO: moving this above the previous code block adds 31 gates. find out why? :/
        let mut initial_needle_chunk: Field = 0;
        let mut final_needle_chunk: Field = 0;

        // Construct the initial and final needle chunks from the byte arrays we previously built.
        // Validate they match the initial and final haystack chunks
        for i in 0..31 {
            initial_needle_chunk *= 256;
            initial_needle_chunk += initial_chunk[i];
            final_needle_chunk *= 256;
            final_needle_chunk += final_chunk[i];
        }

        std::as_witness(initial_needle_chunk);
        std::as_witness(final_needle_chunk);

        initial_needle_chunk = merge_initial_final_needle_chunks as Field
            * (final_needle_chunk - initial_needle_chunk)
            + initial_needle_chunk;
        assert(initial_needle_chunk == initial_haystack_chunk);
        assert(final_needle_chunk == final_haystack_chunk);

        // Step 3: Construct needle chunks (for all but the 1st and last chunks) and validate they match the haystack chunks.
        //         This part is much simpler as we know that all bytes in the chunk are sourced from the needle chunk.
        // NOTE:   If we chose to not pack bytes into 31-byte chunks, the string matching algorithm would be simpler but more expensive.
        //         Instead of matching chunks with each other, we would match individual byte values.
        //         i.e. the number of iterations in this loop would be 31x greater
        //         each loop iteration would also require a predicate, to check whether the byte index was within the needle range or not
        //         Combined these two operations would add about 10 gates per loop iteration,
        //         combined with a 31x iteration length would make this algorithm much more costly than the chunked variant
        let body_chunk_offset = chunk_index + 1;
        substring.match_chunks(
            self.chunks,
            num_bytes_in_first_chunk,
            body_chunk_offset,
            num_full_chunks,
        );
        (true, position)
    }
}

impl<let MaxPaddedBytes: u32, let PaddedChunksMinusOne: u32, let MaxBytes: u32> From<BoundedVec<u8, MaxBytes>> for StringBody<MaxPaddedBytes, PaddedChunksMinusOne, MaxBytes> {
    fn from(input: BoundedVec<u8, MaxBytes>) -> Self {
        Self::new(input.storage(), input.len() as u32)
    }
}

/// Given an input byte array, convert into 31-byte chunks
///
/// Cost: ~0.5 gates per byte
fn compute_chunks<let MaxPaddedBytes: u32, let PaddedChunks: u32>(
    body: [u8; MaxPaddedBytes],
) -> [Field; PaddedChunks] {
    let mut chunks: [Field; PaddedChunks] = [0; PaddedChunks];
    for i in 0..PaddedChunks {
        let mut limb: Field = 0;
        for j in 0..31 {
            limb *= 256;
            limb += body[i * 31 + j] as Field;
        }
        chunks[i] = limb;
        std::as_witness(chunks[i]);
    }
    chunks
}

#[test]
fn test() {
    let haystack_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        .as_bytes();
    let needle_text = " dolor in reprehenderit in voluptate velit esse".as_bytes();

    let mut haystack: StringBody512 = StringBody::new(haystack_text, haystack_text.len());
    let mut needle: SubString64 = SubString::new(needle_text, needle_text.len());

    let result = haystack.substring_match(needle);
    assert(result.0 == true);
}

#[test]
fn test_small_needle() {
    let haystack_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        .as_bytes();
    let needle_text = "olor".as_bytes();
    let mut haystack: StringBody512 = StringBody::new(haystack_text, haystack_text.len());
    let mut needle: SubString32 = SubString::new(needle_text, needle_text.len());

    let result = haystack.substring_match(needle);
    assert(result.0 == true);
}

#[test]
fn test_needle_aligned_on_byte_boundary() {
    let haystack_text = "the quick brown fox jumped over the lazy dog".as_bytes();
    let needle_text = " the lazy dog".as_bytes();

    let mut haystack: StringBody256 = StringBody::new(haystack_text, haystack_text.len());
    let mut needle: SubString256 = SubString::new(needle_text, needle_text.len());

    let result = haystack.substring_match(needle);
    assert(result.0 == true);
}

#[test]
fn test_needle_haystack_equal_size() {
    let haystack_text =
        "the quick brown fox jumped over the lazy dog lorem ipsum blahhhh".as_bytes();
    let needle_text = "the quick brown fox jumped over the lazy dog lorem ipsum blahhhh".as_bytes();

    let mut haystack: StringBody64 = StringBody::new(haystack_text, haystack_text.len());
    let mut needle: SubString64 = SubString::new(needle_text, needle_text.len());

    let result = haystack.substring_match(needle);
    assert(result.0 == true);
}

#[test]
fn test_concat() {
    let email_text = "account recovery for Bartholomew Fibblesworth".as_bytes();
    let username = "Bartholomew Fibblesworth".as_bytes();
    let mut padded_email_text: [u8; 256] = [0; 256];
    let mut padded_username: [u8; 100] = [0; 100];
    for i in 0..username.len() {
        padded_username[i] = username[i];
    }
    for i in 0..email_text.len() {
        padded_email_text[i] = email_text[i];
    }
    let needle_text_init = "account recovery for ".as_bytes();

    let needle_start: SubString128 = SubString::new(needle_text_init, needle_text_init.len());
    let needle_end: SubString128 = SubString::new(padded_username, username.len());
    let needle = needle_start.concat(needle_end);

    for i in 0..45 {
        assert(needle.body[i] == email_text[i]);
    }

    let haystack: StringBody256 = StringBody::new(padded_email_text, 200);
    let (result, _): (bool, u32) = haystack.substring_match(needle);
    assert(result == true);
}

#[test]
fn test_concat_into() {
    let email_text = "account recovery for Bartholomew Fibblesworth".as_bytes();
    let username = "Bartholomew Fibblesworth".as_bytes();
    let mut padded_email_text: [u8; 256] = [0; 256];
    let mut padded_username: [u8; 100] = [0; 100];
    for i in 0..username.len() {
        padded_username[i] = username[i];
    }
    for i in 0..email_text.len() {
        padded_email_text[i] = email_text[i];
    }
    let needle_text_init = "account recovery for ".as_bytes();

    let needle_start: SubString32 = SubString::new(needle_text_init, needle_text_init.len());
    let needle_end: SubString128 = SubString::new(padded_username, username.len());
    let needle = needle_start.concat_into(needle_end);

    for i in 0..45 {
        assert(needle.body[i] == email_text[i]);
    }

    let haystack: StringBody256 = StringBody::new(padded_email_text, 200);
    let (result, _): (bool, u32) = haystack.substring_match(needle);
    assert(result == true);
}

#[test]
unconstrained fn test_partial_match() {
    let mut Engine = DebugRandomEngine { seed: 0 };
    let mut foo: [u8; 1024] = Engine.get_random_bytes();
    let mut bar: [u8; 128] = [0; 128];
    for i in 0..128 {
        bar[i] = foo[i + 123];
    }
    let position = utils::search(foo, bar.as_slice(), 1024, 128);

    assert(position == 123);
}

#[test]
fn test_substring_from_bounded_vec() {
    let haystack_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        .as_bytes();
    let needle_text = " dolor in reprehenderit in voluptate velit esse".as_bytes();

    let mut haystack: StringBody512 = BoundedVec::from(haystack_text).into();
    let mut needle: SubString64 = BoundedVec::from(needle_text).into();

    let result = haystack.substring_match(needle);
    assert(result.0 == true);
}

#[test]
fn test_string_body_from_bounded_vec() {
    let haystack_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        .as_bytes();

    let mut haystack: StringBody512 = BoundedVec::from(haystack_text).into();
    let needle_text = " dolor in reprehenderit in voluptate velit esse".as_bytes();
    let mut needle: SubString64 = BoundedVec::from(needle_text).into();

    let result = haystack.substring_match(needle);
    assert(result.0 == true);
}

#[test]
fn regression_20() {
    let haystack: [u8; 128] = [
        0x00, 0x00, 0x00, 0x00, 0x00, 0x29, 0x92, 0x00, 0x55, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x6e, 0x00, 0x00, 0x00, 0x00, 0x57, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x84,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x5a, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ];

    let needle: [u8; 32] = [
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00,
    ];
    let needle_len: u32 = 0x20;
    let id_haystack: StringBody128 = StringBody::new(haystack, 128);
    let pk_needle: SubString32 = SubString::new(needle, needle_len);
    let (result, _): (bool, u32) = id_haystack.substring_match(pk_needle);
    assert(result);
}