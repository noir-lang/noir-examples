load('constants.sage')
load('utils.sage')

a = FIELD(28734576633528757162648956269730739219262246272443394170905244663053633733939)
b = FIELD(1771)
z = FIELD(115792089237316195423570985008687907853269984665640564039457584007908834671652)
c1 = FIELD(5324262023205125242632636178842408935272934169651804884418803605709653231043)
c2 = FIELD(31579660701086235115519359547823974869073632181538335647124795638520591274090)

def MapToCurve(u):
    u = FIELD(bytes_to_num(u))
    tv1 = FIELD((z*z * u*u*u*u + z*u*u) ^ (-1))  # Mod mul inv at the end
    x1 = (-b / a) * (FIELD(1) + tv1)

    gx1 = x1*x1*x1 + a*x1 + b
    x2 = z * u*u * x1
    gx2 = x2*x2*x2 + a*x2 + b
    (x, y) = XY2Selector(x1, x2, gx1, gx2)

    y = y if (int(u) & 1) == (int(y) & 1) else -FIELD(y)
    return (x, y)
    
    
def XY2Selector(x1, x2, gx1, gx2):
    gx1_sqrt = FIELD(mod_sqrt(gx1))
    gx2_sqrt = FIELD(mod_sqrt(gx2))

    s1 = (gx1_sqrt * gx1_sqrt) == gx1
    s2 = (gx2_sqrt * gx2_sqrt) == gx2
    assert(s1 != s2)
    return (x1, gx1_sqrt) if s1 else (x2, gx2_sqrt)

def mod_sqrt(num):
    return num ** ((SECP256K1_PRIME + 1) // 4)
