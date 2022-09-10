import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

import "components/Application.scss";


// component declarations
export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // const [dailyAppointments, setDailyAppointments] = useState([]);

  const appointments = getAppointmentsForDay(state, state.day)

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });
  
   
  // console.log("PROPS:", props)
  // console.log("--------------------------------------------------")
  // console.log(Object.values(appointments))
  // console.log("--------------------------------------------------")

  const setDay = day => setState(prev => ({ ...prev, day }));
  

  useEffect(() => {
    axios.get('http://localhost:8001/api/days').then((res) => {
      Promise.all([
        axios.get('http://localhost:8001/api/days'),
        axios.get('http://localhost:8001/api/appointments'),
        axios.get('//localhost:8001/api/interviewers')
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      });
    })
  }, [])
  
  // useEffect(() => {
  //   if (state.days.length > 0) {
  //     // setDailyAppointments(appts) 
  //     setDailyAppointments(getAppointmentsForDay(state, state.day)) 
  //   }

  // }, [state.days])
  // dailyAppointments = getAppointmentsForDay(state.day, setState) 
  //   console.log("DAILY APPTS: ", dailyAppointments)

  

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
            <Appointment schedule/>
          <Appointment key="last" time="5pm" />
          </section>

    </main>
  );
}
// {dailyAppointments.map((appointment) => {
//   // console.log("#################################")
//   // console.log("APPOINTMENTS: ", appointment)
//   // console.log("APPT KEY/ID: ", appointment.id)
//   // console.log("APPT TIME: ", appointment.time)
//   // console.log("APPT INTERVIEW: ", appointment.interview)
//   // console.log("#################################")
//   return <Appointment key={appointment.id}
//                         {...appointment}
//      />
// })} 