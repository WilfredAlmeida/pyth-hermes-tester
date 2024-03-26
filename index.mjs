import { PriceServiceConnection } from "@pythnetwork/price-service-client";
import dotenv from "dotenv";

dotenv.config();

const connection = new PriceServiceConnection(process.env.RPC_ENDPOINT_PYTH, {
  priceFeedRequestConfig: {
    binary: true,
  },
});
const priceIds = [
  // You can find the ids of prices at https://pyth.network/developers/price-feed-ids
  "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d"  //SOL-USD
];
async function main(){
  await connection.subscribePriceFeedUpdates(priceIds, (priceFeed) => {
    console.log(
      `${new Date().toUTCString()} Received update for ${priceFeed.id}: ${JSON.stringify(priceFeed.getPriceNoOlderThan(60))}`
    );
  }).catch((err) => {
    console.error(`${new Date().toUTCString()} ERROR ${err}`);
  });
}

main()