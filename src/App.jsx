import { useEffect, useState } from "react";
import "./App.scss";
import { getRates } from "./helpers/get-rates";
import { getHistoricalRates } from "./helpers/get-historical-rates";

function App() {
  const [latestRates, setLatestRates] = useState({});
  const [selectedCurrencyKey, setSelectedCurrencyKey] = useState(null);
  const [historicalRates, setHistoricalRates] = useState(null);

  async function loadHistoricalRate(currencyKey) {
    const historicalRates = await getHistoricalRates(currencyKey);

    setSelectedCurrencyKey(currencyKey);
    setHistoricalRates(historicalRates);
  }

  async function loadLatestRates() {
    const rates = await getRates("latest");

    setLatestRates(rates);
  }

  useEffect(() => {
    loadLatestRates();
  }, []);

  return (
    <main>
      <h1 className="header">Kursy walut</h1>
      <section className="container">
        {selectedCurrencyKey && historicalRates && (
          <div className="specific-currency-wrapper">
            <h3>Kursy {selectedCurrencyKey} z ostatnich 7 dni</h3>
            <ul className="specific-currency">
              {Object.entries(historicalRates).map(([date, rate]) => (
                <li key={date}>
                  {date}: {rate}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rates-wrapper">
          <ul className="rates">
            {Object.entries(latestRates).map(([currencyKey, rate]) => (
              <li key={currencyKey} onClick={() => loadHistoricalRate(currencyKey)} style={{ cursor: "pointer" }}>
                <div> {currencyKey} </div>
                <div> {rate} </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default App;
