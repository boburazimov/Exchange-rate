import React from "react";
import CurrencyItem from "../currencyItem";
import "./currencyRow.css"

const CurrencyRow = ({row, onChangeValues, rowIndex, onAddItem, onDeleteItem}) => {

  return (
    <div className="d-flex flex-row">
      {row?.map((item, index) => {
        return (
          <div className="items-style d-inline-flex" key={index}>
            <CurrencyItem
              itemIndex={index}
              item={item}
              onChangeValues={onChangeValues}
              action={index === 0 ? "from" : "to"}
              rowIndex={rowIndex}
              onDeleteItem={onDeleteItem}/>
            {index === 0 &&
            <div className="equally">
              <span className="center-t">=</span>
            </div>}
          </div>)
      })}
      <div className="plus_style" onClick={onAddItem}>
        <span className="plus">+</span>
      </div>
    </div>)
}

export default CurrencyRow;