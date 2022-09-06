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
    pub fn addova(&mut self, price: u64, quantity: u64, expiration: String, value_addition: String, location: String, variety: String) {
        let index : u64 = self.ova.len() + 1;
        let avo = AvocadoProduct::new(
            price,
            quantity,
            expiration,
            value_addition,
            location,
            variety,
            env::signer_account_id()
 
    );
        self.ova.insert(&index, &avo);
           
    }
    //get ova by index
    pub fn getova(&self, id:u64 ) -> (String,String,String,String,String,String,String,Vec<String>) {
        let index : u64 = id;
        let ova : AvocadoProduct = self.ova.get(&index).unwrap();
        (ova.price.to_string(), ova.quantity.to_string(), ova.expiration.to_string(), 
        ova.value_addition, ova.location, ova.variety, ova.farmer.to_string(), self.buyer_list(id),)
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
            ovas.push(self.getova(g as u64));
        }
        return ovas;
    }

    #[payable]
    pub fn buy(&mut self, id:u64){
        //let amount = "1".parse::<u128>().unwrap() * 10u128.pow(24);
        let ovas = self.ova.get(&id).unwrap();
        let deposit = env::attached_deposit();
        if((ovas.price as f64) * 10.0_f64.powf(24.0)) as u128 <= (deposit){
            let buyer1 = self.buyer_list(id);
            if(buyer1.len()+1) as u64 > ovas.quantity {
                panic_str(SALES_EXPECTED_ERR);
            }else{
                Promise::new(ovas.farmer).transfer(env::attached_deposit());
                let mut buyer = self.buyer.get(&id).unwrap();
                buyer.push(&env::signer_account_id());
                self.buyer.insert(&id, &buyer);
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
