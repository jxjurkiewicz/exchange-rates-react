import { getParams } from "./get-params";

export async function getRates(date = "latest") {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/${date}?${getParams()}`
  );
  const data = await res.json();

  const ratesInEur = data.rates;
  const euroRate = Number(data.rates["PLN"]);
  const newRates = {};

  for (const currencyKey in ratesInEur) {
    if (currencyKey === "PLN") {
      continue;
    }
    if (currencyKey === "EUR") {
      newRates[currencyKey] = euroRate.toFixed(4);
      continue;
    }

    const valueInEur = Number(ratesInEur[currencyKey]);
    newRates[currencyKey] = ((1 / valueInEur) * euroRate).toFixed(4);
  }

  return newRates;
}
