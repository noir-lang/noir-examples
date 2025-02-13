from hashlib import sha256
load('constants.sage')
load('utils.sage')


def HashToField(msg):
    ui = ExpandMessageXmd(msg)
    # Divide into two equal parts
    return (BytesToRegisters(ui[:48]), BytesToRegisters(ui[48:]))

# Do not work properly and I don't know why (in python too)
def BytesToRegisters(ui):
    ui.reverse()
    a = bytes_to_num(ui)
    return num_to_bytes(a % SECP256K1_PRIME)


# ExpandMessageXmd
def ExpandMessageXmd(msg):
    b0 = MsgPrime(msg)
    b1 = HashB(1, b0)
    b2 = HashBi(2, b0, b1)
    b3 = HashBi(3, b0, b2)
    return b1 + b2 + b3

def MsgPrime(msg):
    dst_prime = get_dst_prime()
    res = [0]*64 + msg + [0, 96] + [0] + dst_prime
    return list(sha256(bytes(res)).digest())

def HashB(b_idx, b):
    assert(b_idx < 8)
    dst_prime = get_dst_prime()
    res = bytes(b + [b_idx] + dst_prime)
    return list(sha256(res).digest())

def HashBi(b_idx, b0, b1):
    assert(b_idx < 8)
    res = []

    for i in range(32):
        res.append(b0[i] ^^ b1[i])
    return HashB(b_idx, res)


def get_dst_prime():
    return [
        81, 85, 85, 88, 45, 86, 48, 49, 45, 67, 83, 48, 50, 45, 119, 105, 116,
        104, 45, 115, 101, 99, 112, 50, 53, 54, 107, 49, 95, 88, 77, 68, 58,
        83, 72, 65, 45, 50, 53, 54, 95, 83, 83, 87, 85, 95, 82, 79, 95, 49
    ]
