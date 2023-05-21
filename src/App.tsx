import './App.css';
import Navbar from './components/navbar';
import ProblemLog from './components/problem-log';

function App() {
    return (
        <div className="main-container">
            <Navbar />
            <div className="main-frame">
                <ProblemLog />
            </div>
        </div>
    );
}

export default App;
