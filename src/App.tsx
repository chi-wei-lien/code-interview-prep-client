import './App.css';
import Navbar from './components/navbar';
import ProblemLog from './components/problem-log';
import CreateProblemModal from './components/create-problem-modal';
import { useEffect, useState } from 'react';
import NavbarMobile from './components/navbar-mobile';

const MIN_DESKTOP_SIZE = 700;

function App() {
    const [showCreateProblemModal, setShowCreateProblemModal] = useState(false);
    const [isDesktop, setDesktop] = useState(window.innerWidth > MIN_DESKTOP_SIZE);

    const updateMedia = () => {
        setDesktop(window.innerWidth > MIN_DESKTOP_SIZE);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, []);

    if (isDesktop) {
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

    return (
        <div>
            <NavbarMobile />
            <div className="main-mobile-frame">
                { showCreateProblemModal ? <CreateProblemModal setShowCreateProblemModal={setShowCreateProblemModal} /> : null}
                <div className='main-mobile-frame-content'>
                    <ProblemLog setShowCreateProblemModal={setShowCreateProblemModal}/>
                </div>
            </div>
        </div>
    )
    
}

export default App;
