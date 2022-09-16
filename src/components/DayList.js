import React from 'react';
import DayListItem from './DayListItem';
import "components/DayListItem"

export default function DayList(props) {
  const days = props.days

  const dateArray = days.map( day => {
    return <DayListItem key={day.id} name={day.name} spots={day.spots} selected={day.name === props.value} setDay={props.setDay}/>
  })
  
  return (
    <ul>{dateArray}</ul>
  );
}



