import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  function transition(mode, replace = false) {
    setHistory((prev => replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]))  
  }
  
  function back(mode) {
    if(history.length < 2) return 
    setHistory(history => [...history.slice(0, history.length - 1)])
  }

  return { mode: history[history.length - 1], transition, back };
}