import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Coins from "./Coins";

const baseUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

function App() {
  const [coins, setcoins] = useState([]);

  const [search, setsearch] = useState("");

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((res) => {
        setcoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log("error in the url"));
  }, []);

  const handleChange = (e) => {
    setsearch(e.target.value);
  };
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-search-text">Search any Crypto</h1>
        <form>
          <input
            type="text"
            placeholder="search"
            className="coin-input"
            onChange={handleChange}
          ></input>
        </form>
      </div>
      {filteredCoins.map(coin=>{
        return(
          <Coins 
          key={coin.id}
          cname={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          volume={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          
          />
        )
      })}
    </div>
  );
}

export default App;
