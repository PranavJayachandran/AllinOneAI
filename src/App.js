import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import ImageGenerator from './components/ImageGenerator';
import ImageToText from './components/ImageToText';
import TextCompletion from './components/TextCompletion';
import Findtheanswer from './components/Findtheanswer';

function App() {
  return (
    <div className='banner-bg overflow-y-hidden'>
      <Navbar />
      <Banner />
      <ImageGenerator />
      <Findtheanswer />
      <TextCompletion />
      <ImageToText />


    </div>
  );
}

export default App;
