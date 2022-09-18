
export const getAppointmentsForDay = function(state, day) {
  const appointmentDay = state.days.find((item) => item.name === day)
  const appointments = [];
  if (appointmentDay !== undefined) {
    const appointmentsArray = appointmentDay.appointments

    appointmentsArray.forEach((appointment) => {
      appointments.push(state.appointments[appointment])
    })
  }

  return appointments;
};

export const getInterviewsForDay = function(state, day) {
  const interviewDay = state.days.find((item) => item.name === day)
  const interviews = [];
  if (interviewDay !== undefined) {
    const interviewsArray = interviewDay.interviewers

    interviewsArray.forEach((interview) => {
      interviews.push(state.interviewers[interview])
    })
  }

  return interviews;
};

export const getInterview = function(state, interview) {

  if (interview != null) {
    const interviewerInfo = Object.values(state.interviewers).find(item => item.id === interview.interviewer)
    const newObject = {}
    var key1 = "student"
    var key2 = "interviewer"
    newObject[key2] = interviewerInfo
    newObject[key1] = interview.student

    const outputObject = newObject

    return outputObject

  } else {
    return null
  }
};