import { getParams } from "./get-params";

export async function getHistoricalRates(currencyKey) {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  month = month.toString().padStart(2, "0");
  const year = date.getFullYear();

  const dates = [];
  const promises = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = `${year}-${month}-${day}`;
    dates.push(currentDate);
    promises.push(
      getHistoricalRate(i === 0 ? "latest" : currentDate, currencyKey)
    );
    day -= 1;
  }

  const historicalRates = await Promise.all(promises);

  const historicalRatesObj = {};
  dates.forEach((date, index) => {
    historicalRatesObj[date] = historicalRates[index];
  });

  return historicalRatesObj;
}

async function getHistoricalRate(date, currencyKey) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/${date}?${getParams({
      symbols: [currencyKey, "PLN"],
    })}`
  );
  const data = await res.json();

  return ((1 / data.rates[currencyKey]) * data.rates["PLN"]).toFixed(4);
}
