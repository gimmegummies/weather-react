import SearchEngine from "./components/SearchEngine";
import "./App.css";
import "./fonts/KurkaLapoyu-Regular.otf";

function App() {
  return (
    <div className="App">
      <SearchEngine />
      <footer>
        coded by <a href="https://github.com/gimmegummies/weather-react">Ksu</a>
      </footer>
    </div>
  );
}

export default App;

// todo: make lo responsive, add 6-days forecast, style components, pay attention to font sizes (!), ::selection, hover on link in the footer
