import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";

// dummy data

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

// component declarations
export default function Application(props) {
  const [value, onChange] = useState("Monday");
  const [days, setDays] = useState([]);

  // console.log("PROPS:", props)
  // console.log("--------------------------------------------------")
  // console.log(Object.values(appointments))
  // console.log("--------------------------------------------------")

  useEffect(() => {
    axios.get('http://localhost:8001/api/days').then((res) => {
      // console.log(res.data)
      setDays(res.data);
      // console.log(setDays)
    })
  }, [])

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
            days={days}
            day={value}
            setDay={onChange}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
          <section className="schedule">
            {Object.values(appointments).map((appointment) => {
              console.log("#################################")
              console.log("APPOINTMENTS: ", appointment)
              console.log("APPT KEY/ID: ", appointment.id)
              console.log("APPT TIME: ", appointment.time)
              console.log("APPT INTERVIEW: ", appointment.interview)
              console.log("#################################")
              return <Appointment key={appointment.id}
                                    {...appointment}
                 />
            })} 
            <Appointment key="last" time="5pm" />
          </section>

    </main>
  );
}
// return <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview}

  //     </nav>
  //       <img
  //         className="sidebar__lhl sidebar--centered"
  //         src="images/lhl.png"
  //         alt="Lighthouse Labs"
  //       />
  //     </section>
  //     {Object.values(appointments).map((appointment) => {
  //       // console.log("#####################################")
  //       // console.log("appointment: ", appointment)
  //       // console.log("appointment ID: ", appointment.id)
  //       // console.log("appointment TIME: ", appointment.time)
  //       // console.log("appointment INTERVIEW: ", appointment.interview)
  //       // // console.log("appointment INTERVIEW STUDENT: ", appointment.interview.student)
  //       // console.log("#####################################")
  //       return (
  //         <section
  //           className="schedule">
  //           <Appointment key={appointment.id}
  //             {...appointment} />
  //           <Appointment key="last" time="5pm" />
  //         </section>
  //       );
  //     }
  //     )}
  //   </main>
  // );