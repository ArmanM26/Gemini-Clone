import { createContext, useEffect } from "react";
import runChat from "../config/gemini";
import { useState } from "react";
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // const onSent = async (prompt) => {
  //   try {
  //     const response = await runChat(input); // call Gemini API
  //     console.log("Gemini response:", response); // log immediately
  //   } catch (error) {
  //     console.error("Error running chat:", error);
  //   }
  // };

  const onSent = async (promt) => {
    setResultData("");
    setLoading(true);
    setShowResults(true);
    setRecentPrompt(input);
    const response = await runChat(input);
    setResultData(response);
    setLoading(false);
    setInput("");
  };

  // useEffect(() => {
  //   onSent("What is ReactJS");
  // }, []); // runs only once when component mounts

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    input,
    setInput,
    showResults,
    loading,
    resultData,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
