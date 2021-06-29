import './App.css';
import {Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import CurrencyRow from "./component/currencyRow";
import {currencyAPI} from "./api/api";

function App() {

  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem('data')) || [[{currency: "", value: 0, action: "from"}]]
  );

  /**
   * Rates is Object that get from API, Example:
   EUR : 1 (Default base currency is EUR for simple plan at the API)
   USD : 1.19361
   UZS : 12620.689967
   RUB : 86.191817
   */
  const [rates, setRates] = useState(null);

  useEffect(() => {

    console.log("Render: UseEffect")
    /**
     * Внешний источник API --------------------
     */
    currencyAPI.getLatest()
      .then(res => {
    res.status === 200 && setRates(res.data.rates)
        })
    /**
     * Маковые данные ---------------------------
     */
    // setRates({
    //   EUR: 1,
    //   USD: 1.19361,
    //   UZS: 12620.689967,
    //   RUB: 86.191817
    // })
    localStorage.setItem('data', JSON.stringify(data));
  }, [data])


  const onAddRow = () => {

    setData([
      ...data,
      [{currency: "", value: 0, action: "from"}]
    ])
  }

  const onAddItem = (rowIndex) => {

    let arrayRow = data[rowIndex];
    if (arrayRow.length === 4)
      return alert("You can't add any items")
    arrayRow.push({currency: "", value: 0, action: "to"});
    setData([
      ...data.slice(0, rowIndex),
      arrayRow,
      ...data.slice(rowIndex + 1)
    ])
  }

  const convert = (arrRow, rates) => {

    console.log("Render: Convert")
    if (rates !== null && arrRow[0].value && arrRow[0].currency) {
      const fromCurr = arrRow[0].currency;
      const fromValue = arrRow[0].value;
      let fromRate = rates[fromCurr];
      arrRow.forEach((item, i) => {
        let toRate = rates[item["currency"]];
        if (i !== 0) {
          if (fromRate >= toRate) {
            item["value"] = (fromValue / (fromRate / toRate));
          } else {
            item["value"] = (fromValue * (toRate / fromRate));
          }
        }
      })
      return arrRow;
    }
    return arrRow
  }

  const onChangeValues = (rowIndex, itemIndex, action, currency, value) => {

    console.log("Render: onChangeValues")
    let arrRow = data[rowIndex];
    arrRow[itemIndex].currency = currency;
    arrRow[itemIndex].value = value;

    const newArrRow = convert(arrRow, rates);
    setData([
      ...data.slice(0, rowIndex),
      newArrRow,
      ...data.slice(rowIndex + 1)
    ]);
  }

  const onDeleteItem = (rowIndex, itemIndex) => {

    let arrRow = data[rowIndex];
    arrRow.splice(itemIndex, 1);
    setData([
      ...data.slice(0, rowIndex),
      arrRow,
      ...data.slice(rowIndex + 1)
    ])
  }

  return (
    <div className="App">
      <div className="container-xxl mt-5">
        <Row>
          <div className="fromTo">
            <h2 className="from">From</h2>
            <h2 className="to">To</h2>
          </div>
        </Row>
        <div>
          {data?.map((row, index) => {
            return (
              <CurrencyRow
                key={index}
                row={row}
                onChangeValues={onChangeValues}
                rowIndex={index}
                onAddItem={() => onAddItem(index)}
                onDeleteItem={onDeleteItem}/>
            )
          })}
        </div>
        <div className="add_row">
          <span className="icon_plus" onClick={onAddRow}/>
        </div>
      </div>
      {rates !== null &&
      Object.keys(rates).map((cur, i) => (
        <li key={i} className="ms-4 list-unstyled">
          <span className="input-label">
            <b>{cur}</b> :
            <span className="text-danger fw-bold">{rates[cur]}</span>
          </span>
        </li>
      ))}
    </div>
  );
}

export default App;
