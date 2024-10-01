fn fixed_loop() {
    let len = 10;

    // Loop from 1 to l (inclusive)
    for i in 1..len + 1 {
        print("Loop iteration: ");
        println(i);
    }
}

fn variable_loop(len: u32) {
    let MAX_LEN = 20;
    assert(len <= MAX_LEN);
    // Loop from 1 to MAX_LEN
    for i in 1..MAX_LEN as u32 + 1 {
        // only print when beneath len (inclusive)
        if (i <= len) {
            print("Variable loop iteration: ");
            println(i);
        }
    }
}

// Parameters read from Prover.toml file
fn main(loop_length: u32) {
    fixed_loop();
    variable_loop(loop_length);
}

#[test]
fn test_loops() {
    main(5);
}
