pub trait PartialEq {
    fn eq(self, other: Self) -> bool;
}

impl PartialEq for Vec<u8> {
    fn eq(self, rhs: Vec<u8>) -> bool {
        let len = self.len();
        assert(len == rhs.len());
        let mut result = true;
        for i in 0..len {
            if self.get(i) != rhs.get(i) {
                result = false;
            }
        }
        result
    }
}

