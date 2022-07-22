//initialize the contract


use near_sdk::borsh::{self, BorshSerialize, BorshDeserialize};
use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::AccountId;
use near_sdk::{near_bindgen};


#[near_bindgen]
#[derive(Debug, BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]


pub struct AvocadoProduct {
    // pub price: u8,
    // pub quantity: u8,
    // pub expiration: u8,
    pub value_addition: String,
    pub location: String,
    pub variety: String,
    pub farmer: AccountId,
  
}

impl AvocadoProduct {
    pub fn new(value_addition: String, variety: String, location: String, farmer: AccountId) -> Self {
        Self {
           
            value_addition,
            location,
            variety,
            farmer,
        
        }
    }
}