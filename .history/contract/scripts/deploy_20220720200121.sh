#!/bin/bash 

source ./scripts/setting.conf

near delete $SUB_ACCOUNT $MASTER_ACCOUNT 

near create-account $SUB_ACCOUNT --masterAccount $MASTER_ACCOUNT

near deploy arose.testnet --wasmFile=./res/farm.wasm