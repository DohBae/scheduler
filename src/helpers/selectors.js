import React, { useState, useEffect } from "react";
import axios from 'axios';
import InterviewerList from "components/InterviewerList";


export const getAppointmentsForDay = function(state, day) {
  const appointmentDay = state.days.find((item) => item.name === day)
  const appointments = [];
  if (appointmentDay != undefined) {
    const appointmentsArray = appointmentDay.appointments

    appointmentsArray.forEach((appointment) => {
      appointments.push(state.appointments[appointment])
    })
  }

  return appointments;
};

export const getInterview = function(state, interview) {
  
  // console.log('STATE: ', state.interviewers)
  // console.log('STATE KEYS: ', Object.values(state.interviewers))
  // console.log('STATE.APPOINTMENTS: ', state.appointments)e
  // console.log('INTERVIEW: ', interview)
  // console.log('STATE.APPOINTMENTS.INTERVIEW: ', state.appointments.interview)
  // console.log('INTERVIEW.INTERVIEWER: ', interview.interviewer)
  // console.log('STATE.APPOINTMENTS: ', state.appointments)


  if (interview != null) {
    const interviewerInfo = Object.values(state.interviewers).find(item => item.id === interview.interviewer)
    // console.log(interviewerInfo)
    const newObject = {}
    // console.log("INTERVIEWER INFO: ", interviewerInfo)
    var key1 = "student"
    var key2 = "interviewer"
    newObject[key2] = interviewerInfo
    newObject[key1] = interview.student
    
    const outputObject = newObject

    // console.log(outputObject)

    return outputObject
    
  } else {
    return null
  }




  // const interviewObject = interviewerInfo.student
  // const interviews = {}

  // interviewObject.forEach((interview) => {
  //   interviews.push(state.appointments[interview])
  // })
  // return interviews;
};