import React from "react";
import {Col} from "reactstrap";
import "./currencyItem.css";

const curr = ["USD", "EUR", "UZS", "RUB"];

const CurrencyItem = ({itemIndex = null, item: {currency, value}, onChangeValues, action, rowIndex, onDeleteItem}) => {

  return (
    <>
      <form className="max-width">
        <div className="input-group p-2 mb-0 mt-3 border border-2 rounded-7 border-info shadow">
          <Col md={4}>
            <select
              value={currency}
              className="form-select form-control border-0 fw-bold bg-white shadow-none p-1 sel-style"
              onChange={(e) => onChangeValues(rowIndex, itemIndex, action, e.target.value, value)}>
              <option value="0">selc.</option>
              {curr?.map((curr, index) => <option key={index} value={curr}>{curr}</option>
              )}
            </select>
          </Col>
          <Col md={action === "to" ? 7 : 8}>
            <input
              readOnly={action !== "from"}
              className="form-control border-0 fw-bold text-end bg-white shadow-none p-1"
              id={rowIndex + itemIndex + action}
              value={isNaN(value) ? 0 : value.toLocaleString("en-RU", {minimumFractionDigits: 3})}
              onChange={(e) => onChangeValues(rowIndex, itemIndex, action, currency, e.target.value)}
            />
          </Col>
          {action === "to" &&
          <Col md={1} className="ps-1 pt-1">
            <i
              className="fa fa-trash-o align-middle"
              style={{color: "red", cursor: "pointer"}}
              onClick={() => onDeleteItem(rowIndex, itemIndex)}
            />
          </Col>}
        </div>
      </form>
    </>
  )
}

export default CurrencyItem;