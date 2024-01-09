import './App.css';
import Header from './components/header/Header';
import Row from './components/rows/Row';

function App() {
  return (
    <div className="App">
      <Header/>
      <Row />
    </div>
  );
}
//Tvshow 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1'

export default App;
