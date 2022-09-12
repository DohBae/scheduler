import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewers = props.interviewers;

  // console.log("INTERVIEWER", interviewers)

  const interviewersArray = interviewers.map( interviewer => {
    const isSelected = interviewer.id === props.value
    
    return ( <InterviewerListItem 
    key={interviewer.id} 
    id={interviewer.id} 
    name ={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={isSelected} 
    setInterviewer={() => props.onChange(interviewer.id)}/>)
  })
  

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersArray}</ul>
    </section>
  );
}