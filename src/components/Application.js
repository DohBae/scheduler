import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";
import Form from "./Appointment/Form";
import { getAppointmentsForDay, getInterview, getInterviewsForDay } from "helpers/selectors";



import "components/Application.scss";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // const [dailyAppointments, setDailyAppointments] = useState([]);
  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewsForDay(state, state.day)
  // console.log(appointments)
  
  // const interviewersForm = interviewers.map((val) => {
  //   return (
  //     <Appointment
  //       // key={val.id}
  //       // id={val.id}
  //       name={val.name}
  //       avatar={val.avatar}
  //     />,

  //     <Form 
  //       key={val.id}
  //       id={val.id}
  //       name={val.name}
  //       avatar={val.avatar}
  //     />
  //   ); 
  // });


  // WHY IS THIS HERE?????????????????????????????????????
  // const schedule = appointments.map((appointment) => {
  //  ;
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //     />
      
  //   );
  // });

  // console.log("SCHEDULE: ", schedule)
   
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
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview}).then((res) => { 
      setState({...state, appointments});
    })
  }
  
// console.log('STATE.APPTS: ', state)
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then((res) => { 
      setState({...state, appointments});
    })
    // console.log("Deleting...")
  }


  
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
          {appointments.map((appointment) => {
             const interview = getInterview(state, appointment.interview)
            //  console.log('APPOINTMENT: ', appointment)
            //  console.log('INTERVIEW: ', interview)
            //  console.log({appointment, interview})
            return <Appointment key={appointment.id}
                                id={appointment.id}
                              time={appointment.time}
                         interview={interview}
                       interviewers={interviewers.map(item => item)}
                       bookInterview={bookInterview}
                       cancelInterview={cancelInterview}
                       editInterview={bookInterview}
                       />
                      })} 
            <Appointment key ="last" time="5pm"/>
          </section>

    </main>
  );
}