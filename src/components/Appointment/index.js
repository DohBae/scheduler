import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode  from "hooks/useVisualMode";
import Form from "./Form";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  console.log("PROPS: ", props)
  // console.log("PROPS.STUDENT: ", props.interview.student)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
// console.log("PROPS.STUDENT: ", props.student)
// console.log("PROPS: ", props)
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        />
        )}
      {mode === CREATE && (
        <Form 
        student={props.student}
        interviewers={props.interviewers}
        onCancel={() => back(EMPTY)}
        />

      )}
    </article>
  );
}
// {props.interview ? <Show /> : <Empty />}
// {mode === CREATE && <Form onCancel={() => transition(EMPTY)} />}