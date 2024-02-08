import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import TextInput from "./TextInput";
import ProcessButton from "./ProcessButton";
import DisplayResult from "./DisplayResult";
import { expandMacroUsingGPT4 } from "../utils/openAIUtils";

const MacroProcessor = () => {
  // State for storking macros loaded from the CSV
  const [macros, setMacros] = useState([]);
  // State for user input text
  const [inputText, setInputText] = useState("");
  // State for discplaying the processed text
  const [processedText, setProcessedText] = useState("");
  // State for loading state
  const [loading, setLoading] = useState(false);

  // Load and parse the CSV file
  useEffect(() => {
    // console.log("loading and parsing CSV");
    //Reference the CSV file from the public directory
    Papa.parse(`${process.env.PUBLIC_URL}/data/macros.csv`, {
      download: true, // Enables fetching the CSV file from the URL
      header: true, // Assumes the first row of CSV are headers
      complete: (result) => {
        // console.log("CSV parsing complete:", result.data);

        // Set the parsed CSV data to the macros state.
        setMacros(result.data);
      },
      error: (error) => {
        // log errors if CSV parsing fails
        console.log("Error parsing CSV:", error);
      },
    });
  }, []); // Empty dependency array so effect runs once on mount

  // Function to process user input text,
  // replacing macros with predefined text or
  // dynamically expanding them using GPT-4
  const processText = async () => {
    // Start loading state
    setLoading(true);
    // Log starting of text processing
    console.log("Starting text processing...");
    // Initialize temporary text with input text
    let tempText = inputText;

    // Regular expression to detect "insert" or "input" followed by any word
    const regex = /\b(insert|input)\s+([^\s,.]+)/gi;
    let match;
    let dynamicExpansions = []; // To hold promises of dynamic expansions

    // Iterate through matches of the regular expression in the input text
    while ((match = regex.exec(tempText)) !== null) {
      // Extract full match (e.g., "insert macroPhrase") and macro phrase
      const fullMatch = match[0];
      const macroPhrase = match[2];

      // Check if the macro phrase exists in the macros loaded from the CSV
      const macroEntry = macros.find(
        (m) => m["Macro Phrase"].toLowerCase() === macroPhrase.toLowerCase()
      );

      if (macroEntry) {
        // Replace with macro text if found in CSV
        tempText = tempText.replace(fullMatch, macroEntry["Macro Text"]);
      } else {
        // Prepare for dynamic expansion if not found
        const expansionPromise = expandMacroUsingGPT4(macroPhrase, inputText)
          .then((expandedText) => ({ fullMatch, expandedText }))
          .catch((error) => {
            console.error("Error during macro processing:", error);
            return { fullMatch, expandedText: fullMatch }; // Fallback to the original macro phrase on error
          });
        dynamicExpansions.push(expansionPromise);
      }
    }

    // Wait for all dynamic expansions to complete
    const expansions = await Promise.all(dynamicExpansions);
    expansions.forEach(({ fullMatch, expandedText }) => {
      // Replace original macro phrase with expanded text
      tempText = tempText.replace(fullMatch, expandedText);
    });

    // Update state with processed text
    setProcessedText(tempText);
    // Stop loading state
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 h-screen">
      {/* Text input for user input */}
      <TextInput value={inputText} onChange={setInputText} />
      {/* ProcessButton component to trigger text processing */}
      <ProcessButton onClick={processText} loading={loading} />
      {/* DisplayResults to show processed text */}
      <DisplayResult text={processedText} />
    </div>
  );
};

export default MacroProcessor;
