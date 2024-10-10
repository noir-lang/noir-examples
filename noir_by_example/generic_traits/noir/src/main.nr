// DCI (Data, Context, Interaction) example - keeps objects simple, and binds specific functions to them in their context of use

// ### DATA ###
struct ValueAccount {
    balance: u32,
}

// Primitive functions for data object
trait ValueFunctions {
    fn add(&mut self, val: u32);
    fn sub(&mut self, val: u32);
}

impl ValueFunctions for ValueAccount {
    fn add(&mut self, val: u32) {
        self.balance += val;
    }
    fn sub(&mut self, val: u32) {
        self.balance -= val;
    }
}

// ### CONTEXT ###

// Example purchase context
// Buyer role
trait Buyer {
    fn make_payment(&mut self, val: u32);
}

// impl <T:ValueFunctions> Buyer for T {   // This works in rust
// impl <T> Seller for T {   // Valid Noir, but can't specify ValueFunctions trait, so can't access corresponding fns
impl <T> Buyer for ValueAccount { // context needs to be aware of data object (not just trait)
    fn make_payment(&mut self, val: u32) {
        self.sub(val);
    }
}

// Seller role
trait Seller {
    fn receive_payment(&mut self, val: u32);
}

impl <T> Seller for ValueAccount {
    fn receive_payment(&mut self, val: u32) {
        self.add(val);
    }
}

// Define the purchase context with its generic roles
struct PurchaseContext<B, S> {
    // Roles
    buyer: &mut B,
    seller: &mut S,
}

impl <B, S> PurchaseContext<B, S> where B: Buyer, S: Seller {
    fn do_purchase(&mut self, amount: u32) {
        self.buyer.make_payment(amount);
        // self.buyer.receive_payment(amount); // correct compiler error, buyer role cannot receive_payment
        self.seller.receive_payment(amount);
    }
}

// ### INTERACTION ###

fn main() {
    // create data object, can use all primitive functions
    let mut acc1: ValueAccount = ValueAccount { balance: 10 };
    let mut acc2: ValueAccount = ValueAccount { balance: 10 };

    // create context for data object as
    let mut purchase_context: PurchaseContext<ValueAccount, ValueAccount> = PurchaseContext::<ValueAccount, ValueAccount> { buyer: &mut acc1, seller: &mut acc2 };
    purchase_context.do_purchase(5); // 7
    print("acc1 balance: ");
    println(acc1.balance);
    print("acc2 balance: ");
    println(acc2.balance);
}
