import "./App.css";
import "./index.css";
import "@mantine/core/styles.css";
import Header from "./components/Header.js";
import MacroProcessor from "./components/MacroProcessor.js";
// Open AI key
// const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div id="mainContiner" className="bg-gray-50">
          <div id="macroProcessorContainer" className="p-4">
          <MacroProcessor />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
