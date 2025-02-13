import os
from hashlib import sha256

load('utils.sage')
load('constants.sage')
load('hash_to_curve.sage')


# Generator of secp256k1 curve
def get_G():
    return (
        0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798,
        0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8
    )

def generate_random_r_sk_msg(msg_len: int):
    r = os.urandom(32)
    sk = os.urandom(32)
    msg = os.urandom(msg_len)
    return (list(r), list(sk), list(msg))

def plume_generate_test_case(is_v1: bool, msg_len: int):
    (r, sk, msg) = generate_random_r_sk_msg(msg_len)
    r = bytes_to_num(r)
    sk = bytes_to_num(sk)

    G = get_G()
    G = E(G[0], G[1])

    Pk = (sk * G).xy()
    H = HashToCurve(msg + compress_ec_point(Pk))

    Hp = E(H[0], H[1])
    N = (sk * Hp).xy()

    if is_v1:
        c = sha256_points([G, Pk, H, N, r*G, r*Hp])
    else:
        c = sha256_points([N, r*G, r*Hp])
    c.reverse()

    s = (r + sk * bytes_to_num(c)) % SECP256K1_NUMBERS
    s = num_to_bytes(int(s))
    c.reverse()
    s.reverse()

    Pk = point_to_be_bytes(Pk)
    N = point_to_be_bytes(N)

    return (msg, c, s, Pk, N)

def point_to_be_bytes(p):
    return (num_to_bytes(int(p[0]))[::-1], num_to_bytes(int(p[1]))[::-1])

def compress_ec_point(p):
    x = num_to_bytes(int(p[0]))
    y = num_to_bytes(int(p[1]))

    compressed = [(y[0] & 1) + 2] * 33
    for i in range(32):
        compressed[32-i] = x[i]
    return compressed

def sha256_points(points):
    res = []
    for p in points:
        res += compress_ec_point(p)
    return list(sha256(bytes(res)).digest())
