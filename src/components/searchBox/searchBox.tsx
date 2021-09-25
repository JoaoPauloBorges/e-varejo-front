import React, { FC } from "react";
import { Input } from "antd";
import { useHistory } from "react-router-dom";

const { Search } = Input;

const SearchBox: FC = () => {
  const history = useHistory();

  const onSearchHandler = (params: any) => {
    history.push(`products?q=${params}`);
  };
  return (
    <Search
      name="searchbox"
      style={{ width: "100%", borderRadius: "50px" }}
      onSearch={onSearchHandler}
    />
  );
};

export default SearchBox;
