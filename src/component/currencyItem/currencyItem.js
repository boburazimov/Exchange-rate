import React from "react";
import {Col, FormGroup} from "reactstrap";
import "./currencyItem.css";

const curr = ["USD", "EUR", "UZS", "RUB"];

const CurrencyItem = ({itemIndex = null, item: {currency, value}, onChangeValues, action, rowIndex, onDeleteItem}) => {

  return (
    <>
      <FormGroup className="max-width">
        <div className="input-group p-2 mb-0 mt-3 border border-2 rounded-7 border-info shadow">
          <Col md={5}>
            <select
              value={currency}
              className="form-select form-control border-0 fw-bold bg-white shadow-none"
              onChange={(e) => onChangeValues(rowIndex, itemIndex, action, e.target.value, value)}>
              <option value="0">select</option>
              {curr?.map((curr, index) => <option key={index} value={curr}>{curr}</option>
              )}
            </select>
          </Col>
          <Col md={action === "to" ? 6 : 7}>
            <input
              readOnly={action !== "from"}
              // type="number"
              className="form-control border-0 fw-bold text-end bg-white shadow-none"
              id={rowIndex + itemIndex + action}
              value={value.toLocaleString("en-RU", { minimumFractionDigits: 2})}
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
      </FormGroup>
    </>
  )
}

export default CurrencyItem;