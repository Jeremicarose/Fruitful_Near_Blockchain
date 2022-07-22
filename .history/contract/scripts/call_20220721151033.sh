#!/bin/bash 

source ./scripts/setting.conf

#near view $SUB_ACCOUNT getovas '{}'

# Add AvocadoProduct to the contract
  near call $SUB_ACCOUNT addova '{"price": 5, "quantity":2, "expiration": 3, "value_addition": "oil", "location": "Kenya", "variety": "Sweet"}' --accountId arose.testnet
  
  