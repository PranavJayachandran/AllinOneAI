import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import ImageGenerator from './components/ImageGenerator';
import ImageToText from './components/ImageToText';
import TextCompletion from './components/TextCompletion';

function App() {
  return (
    <div className='banner-bg'>
      <Navbar />
      <Banner />
      <ImageGenerator />
      <ImageToText />
      <TextCompletion />
    </div>
  );
}

export default App;
