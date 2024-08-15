// import Listings from "./apiCall/apiCall-Unauthorised ";
import "./App.css";
import RickAndMorty from "./apiCall/RickandMortyAPI";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RickAndMorty />
        {/* <Listings /> */}
      </header>
    </div>
  );
}

export default App;
