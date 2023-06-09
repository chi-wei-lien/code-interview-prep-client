import { useState } from 'react';
import '../style/create-problem-modal.css'
import { IProblemLog } from "../interfaces/problem-log";
import { createProblemLog } from '../services/problem-log';

interface ICreateProblemModalProps {
    setShowCreateProblemModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProblemModal = (props: ICreateProblemModalProps) => {
    const [problemName, setProblemName] = useState("");
    const [problemUrl, setProblemUrl] = useState("");
    const [problemDifficulty, setProblemDifficulty] = useState("");
    const [submitButtonText, setSubmitButtonText] = useState("Done");
    const [errorText, setErrorText] = useState("");

    const handleSubmit= async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProblemLog: IProblemLog = {
            id: -1,
            name: problemName,
            url: problemUrl,
            difficulty: Number(problemDifficulty),
            timestamp: new Date(Date.now())
        }

        setSubmitButtonText("Submitting")
        if (await createProblemLog(newProblemLog)) {
            setSubmitButtonText("Done");
            setProblemName("");
            setProblemUrl("");
            setProblemDifficulty("");
            setErrorText("");
            props.setShowCreateProblemModal(false);
        }
        else {
            setSubmitButtonText("Done");
            setErrorText("Oops! Something went wrong. Please try again later")
        }
    }

    return (
        <div className="modal-frame">
            <div className="modal">
                <div className="create-problem-form-container">
                    <h1>Add Problem</h1>
                    <form className="create-problem-form" onSubmit={e => {handleSubmit(e)}}>
                        <label>
                            <input placeholder="Problem Name" 
                                    onChange={(e) => {setProblemName(e.target.value)}}
                                    value={problemName}
                                    required></input>
                        </label>
                        <br />
                        <label>
                            <input placeholder="Problem URL" 
                                    onChange={(e) => {setProblemUrl(e.target.value)}}
                                    value={problemUrl}
                                    required></input>
                        </label>
                        <br />
                        <label>
                            <input type="number" 
                                    step="0.1" 
                                    max="5" 
                                    min="0"
                                    placeholder="Problem Difficulty"
                                    onChange={((e) => {setProblemDifficulty(e.target.value)})}
                                    value={problemDifficulty}
                                    required
                                    />
                        </label>
                        <div className="create-problem-error">{errorText}</div>
                        <div className="form-submit-frame">
                            <button onClick={() => props.setShowCreateProblemModal(false)} 
                                    className="form-button">
                                Cancel
                            </button>
                            <input className="form-button" 
                                type='submit' value={submitButtonText}>
                            </input>
                        </div>
                    </form>
                </div>
                <div className="old-computer-frame">
                    <div className="old-computer-container">
                        <img className="old-computer-img" src="/images/old_computer.png"></img>
                        <p>"Nice you just solved another problem!"</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProblemModal;