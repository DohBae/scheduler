import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode  from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  // console.log("PROPS: ", props)
  // console.log("PROPS.STUDENT: ", props.interview.student)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
// console.log("PROPS.STUDENT: ", props.student)
// console.log("PROPS: ", props)

function save(name, interviewer) {
  
  const interview = {
    student: name,
    interviewer
  };
  // console.log("Saving...")
  transition(SAVING)
  props.bookInterview(props.id, interview);
  transition(SHOW);
}
// console.log("PROPS.INTERVIEW: ", props.interview)
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
        onSave={save}
        />
        )}
        {mode === SAVING && <Status message="Saving" />}
    </article>
  );
}
// {mode === SAVING && <Status onClick={() => transition(SAVING)}/>}