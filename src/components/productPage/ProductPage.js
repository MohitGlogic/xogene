import React, { useEffect, useState } from "react";
import Loader from "../Loader/loader";

const ProductPage = (props) => {
  const [loader, setLoader] = useState(false);
  const [drug, setDrug] = useState();
  const [drugArr, setDruArr] = useState([]);

  const getDrugDetails = () => {
    setLoader(true);
    fetch(
      `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${props.searchKeyword}`
    )
      .then((res) => res.json())
      .then((data) => {
        data && console.log(data, ":data");
        setDrug(data);
        data.drugGroup.conceptGroup &&
          setDruArr(data.drugGroup.conceptGroup[1].conceptProperties);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {});
  };
  useEffect(() => {
    getDrugDetails();
    setLoader(false);
  }, []);

  return (
    <>
      <h2>ProductPage</h2>
      <h4>{props.searchKeyword}</h4>
      {loader ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {drug &&
            drug.drugGroup &&
            drug.drugGroup.conceptGroup &&
            drug.drugGroup.conceptGroup[0].tty}
          {drugArr.length &&
            drugArr.map((rx, index) => {
              <>
                {console.log(rx.rxcui, "rx")}
                {/* <ul key={index}>
                    <li>{rx.rxcui}</li>
                    <li>{rx.name}</li>
                    <li>{rx.synonym}</li>
                  </ul> */}
                <p>
                  {rx.rxcui}
                  {rx.name}
                </p>
              </>;
            })}
        </>
      )}
    </>
  );
};

export default ProductPage;
