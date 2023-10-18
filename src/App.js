import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import {Route, Routes} from "react-router-dom"
import ProductPage from './components/productPage/ProductPage';
import { useState } from 'react';

function App() {
  const [searchKeyword, setSearchKeyword] = useState("")
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchBar setSearchKeyword={setSearchKeyword} searchKeyword={searchKeyword}/>}/>
        <Route path={`/${searchKeyword}`} element={<ProductPage searchKeyword={searchKeyword}/>}/>
      </Routes>
    </div>
    {/* <SearchBar/>
    <ProductPage/> */}
    </>
  );
}

export default App;
