def bytes_to_num(arr):
    return int.from_bytes(bytes(arr), byteorder='little')

def num_to_bytes(num):
    res = []
    while num > 0:
        res.append(num & 0xff)
        num >>= 8
    return res