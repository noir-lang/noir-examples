// Need standard environment lib for command line arguments
use std::env;

fn fixed_loop() {
    let l = 10;

    // Loop from 1 to l (inclusive)
    for i in 1..=l {
        println!("Loop iteration: {}", i);
    }
}

fn variable_loop(len: u32) {
    // Loop from 1 to len (inclusive)
    for i in 1..=len {
        println!("Variable loop iteration: {}", i);
    }
}

fn main() {
    let DEFAULT = 5;
    // Read first command line argument
    let args: Vec<String> = env::args().collect();
    let loop_length = if args.len() > 1 {
        args[1].parse().unwrap_or(DEFAULT)
    } else {
        DEFAULT // Default value if no argument is provided
    };

    fixed_loop();
    variable_loop(loop_length); // variable
}

#[test]
fn test_loops() {
    main();
}
