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

// steps
// video1
//1.  setting up app the react app environment
// pages/home/home.js
// header and footer
// video2
//  show how they can get api key in tmdb and how can they get the endpoints
// axios and request 
// show how can they hide api key in .env and added to gitignore
// video3
// bunner including css
// video4 
// rowlist just passing data for one row
// row js 
// duplicat and pass different props value for each row in rowlist
// video5 
// deployment 



