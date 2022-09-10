import React from 'react';
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  
// console.log(props)
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2>{props.name}</h2>
      {props.spots > 1 &&  <h3>{props.spots} spots remaining</h3>}
      {props.spots === 1 &&  <h3>{props.spots} spot remaining</h3>}
      {props.spots === 0 &&  <h3>no spots remaining</h3>}
    </li>
  );
}

// li represents entire day item
// h2 displays the name
// h3 display spots remaining for the day