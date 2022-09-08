import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  console.log(props.time)
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show /> : <Empty />}
    </article>
  );
}