import MainContent from './components/ui/MainContent';
import NavBar from './components/ui/NavBar';

const App = () => {
  return (
    <div className="flex">
       <NavBar />
       <MainContent />
    </div>
  );
}

export default App;