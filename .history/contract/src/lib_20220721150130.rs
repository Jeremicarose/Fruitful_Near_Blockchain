use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{UnorderedMap, Vector};
use near_sdk::{env, near_bindgen, AccountId, Promise};
use crate::env::panic_str;
use crate::avocado_product::AvocadoProduct;


const SALES_EXPECTED_ERR: &str = "Out of stock";
const AMOUNT_EXPECTED_ERR: &str = "Not enough money";
   
mod avocado_product;




#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct AvocadoDisplay {
    ova : UnorderedMap<u64, AvocadoProduct>,
    buyer : UnorderedMap<u64, Vector<AccountId>>,
}

#[near_bindgen]
impl AvocadoDisplay {
    pub fn addova(&mut self, price: u8, quantity: u8, expiration: u8, value_addition: String, location: String, variety: String) {
        let index : u64 = self.ova.len() + 1;
        self.ova.insert(&index, 
            &AvocadoProduct::new(
                price,
                quantity,
                expiration,
                value_addition,
                location,
                variety,
                env::signer_account_id()
     
        ),);
    }
    //get ova by index
    pub fn getova(&self, id: String) -> (String,String,String,String,String,String,String,Vec<String>) {
        let index : u64 = id.parse::<u64>().unwrap();
        let ova : AvocadoProduct = self.ova.get(&index).unwrap();
        (ova.price.to_string(), ova.quantity.to_string(), ova.expiration.to_string(), 
        ova.value_addition, ova.location, ova.variety, ova.farmer.to_string(), self.buyer_list(id.parse::<u64>().unwrap()),)
    }

    #[private]
    fn buyer_list(&self, id: u64) -> Vec<String> {
        if let Some(i) = self.buyer.get(&id) {
            let mut pple: Vec<String> = vec![];
            for g in i.iter() {
                pple.push(g.to_string());
            }            
             return pple;
        }
        return Vec::<String>::new();
    }

    pub fn getovas(&self)  -> Vec<(String, String, String, String, String, String, String, Vec<String>)> {
        let mut ovas: Vec<(String, String, String, String, String,String,String, Vec<String>)> = vec![];
        for g in 1..=self.ova.len(){
            ovas.push(self.getova(g.to_string()));
        }
        return ovas;
    }

    #[payable]
    pub fn buy(&mut self, id:String){
        let amount = "1".parse::<u128>().unwrap() * 10u128.pow(24);
        let ovas = self.ova.get(&id.parse::<u64>().unwrap()).unwrap();
        if(ovas.price as u128) * amount <= (env::attached_deposit()){
            let buyer1 = self.buyer_list(id.parse::<u64>().unwrap());
            if(buyer1.len()+1) as u8 > ovas.quantity {
                panic_str(SALES_EXPECTED_ERR);
            }else{
                Promise::new(ovas.farmer).transfer(env::attached_deposit());
                let mut buyer = self.buyer.get(&id.parse::<u64>().unwrap()).unwrap();
                buyer.push(&env::signer_account_id());
                self.buyer.insert(&id.parse::<u64>().unwrap(), &buyer);
            }
                
                
        } else{
            panic_str(AMOUNT_EXPECTED_ERR);
        }
    }

    // fn initial_storage(&self) -> u64 {
    //     let initial_storage = env::storage_usage();
    //     initial_storage
    // }

    // fn settle_storage_cost(&self, initial_storage: u64, attached_deposit: u128, signer: &str) {
    //     let current_storage = env::storage_usage();
    //     let used_storage = current_storage - initial_storage;
    //     let storage_unit_price = env::storage_byte_cost();

    //     if let Some(payable_storage_cost) = storage_unit_price.checked_mul(used_storage.into()) {
    //         assert!(attached_deposit >= payable_storage_cost);

    //         let excess = attached_deposit - payable_storage_cost;
    //         self.refund_excess(excess, signer);
    //     } else {
    //         panic!("Error calculating storage cost");
    //     }
    // }

    // fn refund_storage_cost(&self, initial_storage: u64, signer: &str) {
    //     let current_storage = env::storage_usage();
    //     let storage_released = initial_storage - current_storage;
    //     let storage_unit_price = env::storage_byte_cost();

    //     if let Some(refundable_storage_cost) = storage_unit_price.checked_mul(storage_released.into()) {
    //         self.refund_excess(refundable_storage_cost, signer);
    //     } else {
    //         panic!("Error calculating storage cost");
    //     }
    // }

    // fn refund_excess(&self, excess: u128, signer: &str) {
    //     if excess > 0 {
    //         Promise::new(signer.to_string()).transfer(excess);
    //     }
    // }

    
}

impl Default for AvocadoDisplay {
    fn default() -> Self {
        Self {
            ova: UnorderedMap::<u64, AvocadoProduct>::new(b'o'),
            buyer: UnorderedMap::<u64, Vector<AccountId>>::new(b'b'),
        }
    }
}
