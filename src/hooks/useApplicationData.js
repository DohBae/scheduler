import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ]).then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      });
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

    
    const dayObject = state.days.find(date => date.name === state.day);
    
    let spots = dayObject.appointments.length;
  
    for (const id of dayObject.appointments) {
      const appointment = appointments[id];
      if (appointment.interview) {
        spots--;
      }
    }
    const day = {...dayObject, spots};
    const days = state.days.map(date => date.name === state.day ? day : date)
    
    
    return axios.put(`/api/appointments/${id}`, { interview })
    .then((res) => {
      setState({ ...state, appointments, days });
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let spots = 0;

    const dayObject = state.days.find(date => date.name === state.day);

    for (const id of dayObject.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const day = {...dayObject, spots};
    const days = state.days.map(date => date.name === state.day ? day : date)

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((res) => {
      setState({ ...state, appointments, days });
    })
  }

  return { state: state, setDay: setDay, bookInterview: bookInterview, cancelInterview: cancelInterview}
}

