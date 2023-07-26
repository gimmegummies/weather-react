import SearchEngine from "./components/SearchEngine";
import "./App.css";
import "./fonts/KurkaLapoyu-Regular.otf";

function App() {
  return (
    <div className="App">
      <SearchEngine />
      <footer>
        coded by{" "}
        <a
          href="https://github.com/gimmegummies/weather-react"
          target="_blank"
          rel="noreferrer"
        >
          Ksu
        </a>
      </footer>
    </div>
  );
}

export default App;

// todo: add 6-days forecast
