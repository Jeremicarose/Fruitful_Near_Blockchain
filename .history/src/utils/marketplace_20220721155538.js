import { parseNearAmount } from "near-api-js/lib/utils/format";
import { Big } from "big.js";
const GAS = Big(3)
  .times(10 ** 13)
  .toFixed();
  export function addova(product) {
    product.price = parseNearAmount(product.price + "");
    return window.contract.addova({ price: Number.parseInt(product.price), 
      quntity: Number.parseInt(product.quantity), 
      expiration: product.expiration,
      value_addition: product.value_addition, 
      location: product.location, 
      varieties: product.varieties, 
       });
  }
export function getovas() {
  //@ts-ignore
  return window.contract.getovas();
}

export async function buy_ova({ id, price }) {
  //@ts-ignore
  price = parseNearAmount(price.toString() + "");
  //@ts-ignore
  await window.contract.buy({ id: id.toString() }, GAS, price);
}
