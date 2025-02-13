import sys
import subprocess
import toml
load('gen.sage')

# Run a shell command and print the output
def run_command(command):
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.stdout:
        print(result.stdout, end='')
    
    if result.returncode != 0:
        if result.stderr:
            print(result.stderr)
        raise subprocess.CalledProcessError(result.returncode, command)

def format_array(arr):
    return "[" + ", ".join(f'"{item}"' for item in arr) + "]"

def update_prover_toml(is_v1: bool, msg_len: int):
    prover_toml_path = "../crates/use_v2/Prover.toml"
    if is_v1:
        prover_toml_path =  "../crates/use_v1/Prover.toml"

    data = toml.load(prover_toml_path)
    (msg, c, s, (pk_x, pk_y), (nullifier_x, nullifier_y)) = plume_generate_test_case(is_v1, msg_len)
    
    
    data['c'] = c
    data['msg'] = msg
    data['nullifier_x'] = nullifier_x
    data['nullifier_y'] = nullifier_y
    data['pk_x'] = pk_x
    data['pk_y'] = pk_y
    data['s'] = s
    
    c_str = format_array(c)
    msg_str = format_array(msg)
    nullifier_x_str = format_array(nullifier_x)
    nullifier_y_str = format_array(nullifier_y)
    pk_x_str = format_array(pk_x)
    pk_y_str = format_array(pk_y)
    s_str = format_array(s)
    
    with open(prover_toml_path, 'w') as f:
        f.write(f'c = {c_str}\n')
        f.write(f'msg = {msg_str}\n')
        f.write(f'nullifier_x = {nullifier_x_str}\n')
        f.write(f'nullifier_y = {nullifier_y_str}\n')
        f.write(f'pk_x = {pk_x_str}\n')
        f.write(f'pk_y = {pk_y_str}\n')
        f.write(f's = {s_str}\n')

def update_MSG_LEN_variable(is_v1: bool, msg_len: int):
    path = "../crates/use_v2/src/"
    if is_v1:
        path = "../crates/use_v1/src/"
  
    with open(path + 'main.nr', 'r') as file:
        lines = file.readlines()
    
    MSG_LEN_line = 7
    lines[MSG_LEN_line] = f"global MSG_LEN: u32 = {msg_len};\n"

    with open(path + 'main.nr', 'w') as file:
        file.writelines(lines)

# Take MSG_LEN number and plume version (v1 or v2)
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Error: incorrect number of arguments")
        sys.exit()
        
    versions = ["v1", "v2"]

    if sys.argv[1] not in versions:
        print("Error:", sys.argv[1], "incorrect version.")
        sys.exit()

    is_v1 = sys.argv[1] == versions[0]
    msg_len = int(sys.argv[2])

    update_MSG_LEN_variable(is_v1, msg_len)
    update_prover_toml(is_v1, msg_len)
