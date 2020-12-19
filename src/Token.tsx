import * as React from 'react';
import CloseIcon from "./CloseIcon";
import {IItem} from "./ReactSelect";

const Token = ({item, onClick}:
                 {
                   item: IItem,
                   onClick: (item: IItem) => void
                 }) => {
  function handleClick(event: any) {
    onClick(item);
  }

  return <div key={item.value} className="react-select-token"
              onClick={React.useCallback(handleClick, [item, onClick])}>
    {item.label}
    <CloseIcon/>
  </div>
}

export default Token;
