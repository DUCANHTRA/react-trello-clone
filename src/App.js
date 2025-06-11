import './styles/App.css';
import Title from './components/Title';
import Board from './components/Board';

const App = () => {

  return (
    <div className="top-most-container">
      <Title />
      <Board />
    </div>
  );
}

export default App;