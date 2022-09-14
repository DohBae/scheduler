import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";
// import Form from "./Appointment/Form";
import { getAppointmentsForDay, getInterview, getInterviewsForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";



import "components/Application.scss";


export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  const interviewers = getInterviewsForDay(state, state.day)
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
          <section className="schedule">
          {appointments}
            <Appointment key ="last" time="5pm"/>
          </section>
    </main>
  );
}





  // const setDay = day => setState(prev => ({ ...prev, day }));
  

  // useEffect(() => {
  //   axios.get('http://localhost:8001/api/days').then((res) => {
  //     Promise.all([
  //       axios.get('http://localhost:8001/api/days'),
  //       axios.get('http://localhost:8001/api/appointments'),
  //       axios.get('//localhost:8001/api/interviewers')
  //     ]).then((all) => {
  //       setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  //     });
  //   })
  // }, [])
  
  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview}).then((res) => { 
  //     setState({...state, appointments});
  //   })
  // }
  
  // function cancelInterview(id) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   return axios.delete(`http://localhost:8001/api/appointments/${id}`).then((res) => { 
  //     setState({...state, appointments});
  //   })
  // }


  