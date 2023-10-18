import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/loader";
import "./SearchBar.css";

const SearchBar = (props) => {
  const navigate = useNavigate();
  const [searchDropdown, setsearchDropdown] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleSearch = () => {
    setLoader(true);
    console.log(props.searchKeyword, ":");
    fetch(
      `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${props.searchKeyword}`
    )
      .then((res) => res.json())
      .then((d) => {
        setsearchDropdown(d.suggestionGroup.suggestionList.suggestion);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <div className="container">
      <div className="searchbar">

      <input
      className="searchinput"
        type="search"
        name="search"
        id="drugs-search"
        value={props.searchKeyword}
        onChange={(e) => props.setSearchKeyword(e.target.value)}
        onKeyDownCapture={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        />
      <button className="searchBTN" onClick={() => handleSearch()}>&#x1F50D;</button>
      </div>
      {loader ? (
        <>
          <Loader/>
        </>
      ) : (
        <ul className="results">
          {searchDropdown ? (
            searchDropdown.map((suggestion, id) => (
              <li key={id}  onClick={() => {
                navigate(`/${props.searchKeyword}`);
              }}>
                {suggestion}
              </li>
            ))
          ) : (
            <>
              <p>Nothing could be Found for that term</p>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
