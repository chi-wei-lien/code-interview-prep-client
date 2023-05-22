import './App.css';
import Navbar from './components/navbar';
import ProblemLog from './components/problem-log';
import CreateProblemModal from './components/create-problem-modal';
import { useState } from 'react';

function App() {
    const [showCreateProblemModal, setShowCreateProblemModal] = useState(false);

    return (
        <div className="main-container">
            <Navbar />
            <div className="main-frame">
                { showCreateProblemModal ? <CreateProblemModal setShowCreateProblemModal={setShowCreateProblemModal} /> : null}
                <div className='main-frame-content'>
                    <ProblemLog setShowCreateProblemModal={setShowCreateProblemModal}/>
                </div>
            </div>
        </div>
    );
}

export default App;
