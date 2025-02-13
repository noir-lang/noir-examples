load('constants.sage')
load('hash_to_field.sage')
load('map_to_curve.sage')
load('iso_map.sage')

# Get msg in byte format
def HashToCurve(msg):
    # return bytes
    u = HashToField(msg)

    # Return field type
    q0 = MapToCurve(u[0])
    q1 = MapToCurve(u[1])

    return (E(IsoMap(q0)) + E(IsoMap(q1))).xy()
