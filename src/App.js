import './App.css';
import Tetris from "./components/Tetris";
import TetrisStore from "./store/TetrisStore";

const store = new TetrisStore();

function App() {
  return (
    <div className="App">
        <Tetris store={store}/>
    </div>
  );
}

export default App;
