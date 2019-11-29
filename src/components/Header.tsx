import React, { useContext } from "react";
import { Context } from "../store/context";

const Header: React.FC = () => {
  const { state } = useContext(Context);
  const { headerLabel } = state;

  return (
    <header>
      <h1>Advertising Data ETL-V</h1>
      <span>{headerLabel}</span>
    </header>
  );
};

export default Header;
