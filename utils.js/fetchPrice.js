async function fetchCoinGecko() {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
  );
  let data = await response.json();
  let price = data["bitcoin"]["usd"];
  return price;
}
module.exports = { fetchCoinGecko };
