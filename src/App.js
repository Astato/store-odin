import Navbar from './components/navbar';
import Home from './components/home';
import Store from './components/store';
import About from './components/about';
import Contact from './components/contact';
import Login from './components/login';
import Faq from './components/faq';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Store/>
      <Login/>
    </div>
  );
}

export default App;
