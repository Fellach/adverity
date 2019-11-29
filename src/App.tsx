import React from "react";
import Header from "./components/Header";
import Store from "./store/Store";
import FiltersContainer from "./components/FiltersContainer";
import ChartContainer from "./components/ChartContainer";

const App: React.FC = () => {
  return (
    <Store>
      <Header />
      <FiltersContainer />
      <ChartContainer />
    </Store>
  );
};

export default App;
