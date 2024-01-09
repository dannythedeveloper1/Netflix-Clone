import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Banner from './components/banner/Banner';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner/>
      <Footer/>
    </div>
  );
}
//Tvshow 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1'

export default App;
