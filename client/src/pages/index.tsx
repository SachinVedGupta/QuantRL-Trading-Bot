import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Index() {
  const [stepsData, setStepsData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/trades")
      .then((response) => response.json())
      .then((data) => {
        const steps = [];
        for (const outerKey in data) {
          const innerData = data[outerKey];
          for (const innerKey in innerData) {
            const stepDetails = {
              key: outerKey,
              subKey: innerKey,
              ...innerData[innerKey],
            };
            steps.push(stepDetails);
          }
        }
        setStepsData(steps);
      });
  }, []);

  // Transform the data for charts
  const steps = stepsData.map((step) => step.step);
  const stockPrices = [0, 1, 2].map((i) => stepsData.map((step) => step.stock_prices[i]));
  const portfolioValues = stepsData.map((step) => step.portfolio_value);
  const stocksOwned = [0, 1, 2].map((i) => stepsData.map((step) => step.stocks_owned[i]));

  const stockLabels = ["Apple", "Motorola", "Starbucks"];

  // Define chart datasets
  const stockPricesData = {
    labels: steps,
    datasets: stockLabels.map((label, index) => ({
      label: `${label} Stock Price`,
      data: stockPrices[index],
      borderColor: ["red", "blue", "green"][index],
      fill: false,
    })),
  };

  const portfolioValueData = {
    labels: steps,
    datasets: [
      {
        label: "Portfolio Value",
        data: portfolioValues,
        borderColor: "purple",
        fill: false,
      },
    ],
  };

  const stocksOwnedData = {
    labels: steps,
    datasets: stockLabels.map((label, index) => ({
      label: `${label} Stocks Owned`,
      data: stocksOwned[index],
      borderColor: ["orange", "yellow", "pink"][index],
      fill: false,
    })),
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
        <div className="max-w-screen-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div>
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          QuantRL - Automated Trading Bot
        </h1>

        {/* Toggle Button */}
        <div className="text-center mb-4">
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {showDetails ? "Hide Details" : "About Project"}
          </button>
        </div>

        {/* Conditional Rendering of Details */}
        {showDetails && (
          <div className="p-6 mb-8 rounded-lg shadow-lg ring-4 ring-blue-200 ring-offset-4 ring-offset-blue-50">
            <h2 className="text-xl text-blue-900 mb-4 text-center">
              Below you will find the trades made by the custom-made automated trading bot. Each episode has approximately 600 steps (each step represents a day).
            </h2>
            <h2 className="text-xl text-blue-900 mb-4 text-center">
              The initial investment is $100,000. View the charts below for graphs representing the Stock Prices, Portfolio Value, and Stocks Owned at any given time step (day). The "stocks owned" depicts what the stock trader is doing at any given time, with shifts meaning that the bot has bought/sold certain stocks at that time.
            </h2>
            <h2 className="text-xl text-blue-900 mb-4 text-center">
              This is an ML + Reinforcement Learning based Stock Trading bot. It operates in a customer environment where there are actions and states. When in training mode, the bot's actions affect its reward, which is used as a metric for it (the model) to learn, train, and improve. It runs through the training data (first half of historical data) multiple times, continuously optimizing and improving as it gains more and more experience. Then, it applies that "knowledge" when running on the test data, of which it has never seen before (second half of historical data). It runs over this just once, in order to simulate a real-world scenario where you just have one chance to invest and can't go back or have a redo.
            </h2>
            <h2 className="text-xl text-blue-900 mb-4 text-center">
              At any given time, the bot only knows the current and historical data, and is doing actions (buy/sell/hold any stock respectively) that it believes will maximize the future reward (a high portfolio value). Therefore, it is essentially running through a simulation, that mimics how it would work in real life!
            </h2>
          </div>
        )}
      </div>

      {/* Stock Prices Chart */}
      <div className="bg-white mb-6 p-6 rounded-lg shadow-md">
        <h2 className="text-xl text-blue-600 mb-4 text-center">Stock Prices</h2>
        <Line data={stockPricesData} />
      </div>

      {/* Portfolio Value Chart */}
      <div className="bg-white mb-6 p-6 rounded-lg shadow-md">
        <h2 className="text-xl text-blue-600 mb-4 text-center">Portfolio Value</h2>
        <Line data={portfolioValueData} />
      </div>

      {/* Stocks Owned Chart */}
      <div className="bg-white mb-6 p-6 rounded-lg shadow-md">
        <h2 className="text-xl text-blue-600 mb-4 text-center">Stocks Owned</h2>
        <Line data={stocksOwnedData} />
      </div>

      {/* Individual Steps Data */}
      {stepsData.map((stepData, index) => (
        <div className="bg-white mb-6 p-6 rounded-lg shadow-md" key={index}>
          <h2 className="text-xl text-blue-600 mb-4">
            Episode: {stepData.key}, Step: {stepData.subKey}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg text-gray-800 mb-2">Action:</h3>
              <ul className="list-none">
                {stepData.action.map((item, idx) => (
                  <li key={idx} className="text-gray-600">
                    {stockLabels[idx]}: {item === 0 ? "Sell" : item === 1 ? "Hold" : "Buy"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-gray-800 mb-2">Cash in Hand:</h3>
              <p className="text-gray-800">${stepData.cash_in_hand.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-lg text-gray-800 mb-2">Portfolio Value:</h3>
              <p className="text-gray-800">${stepData.portfolio_value.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-lg text-gray-800 mb-2">Stock Prices:</h3>
              <ul className="list-none">
                {stepData.stock_prices.map((price, idx) => (
                  <li key={idx} className="text-gray-600">
                    {stockLabels[idx]}: ${price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-gray-800 mb-2">Stocks Owned:</h3>
              <ul className="list-none">
                {stepData.stocks_owned.map((owned, idx) => (
                  <li key={idx} className="text-gray-600">
                    {stockLabels[idx]}: {owned}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;
