load('constants.sage')

def IsoMap(p):
    x = p[0]
    y = p[1]

    x_2 = x * x
    x_3 = x_2 * x

    x_num = k1_0() + k1_1()*x + k1_2()*x_2 + k1_3()*x_3
    x_den = x_2 + k2_1()*x + k2_0()
    y_num = k3_0() + k3_1()*x + k3_2()*x_2 + k3_3()*x_3
    y_den = k4_0() + k4_1()*x + k4_2()*x_2 + x_3

    x = x_num / x_den
    y = y * y_num / y_den
    return (x, y)

def k1_0():
    return FIELD(0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7)
def k1_1():
    return FIELD(0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581)
def k1_2():
    return FIELD(0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262)
def k1_3():
    return FIELD(0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c)

def k2_0():
    return FIELD(0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b)
def k2_1():
    return FIELD(0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14)

def k3_0():
    return FIELD(0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c)
def k3_1():
    return FIELD(0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3)
def k3_2():
    return FIELD(0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931)
def k3_3():
    return FIELD(0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84)

def k4_0():
    return FIELD(0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b)
def k4_1():
    return FIELD(0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573)
def k4_2():
    return FIELD(0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f)

