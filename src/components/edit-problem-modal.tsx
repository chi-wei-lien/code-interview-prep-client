import { useState } from 'react';
import '../style/create-problem-modal.css'
import { IProblemLog } from "../interfaces/problem-log";
import { deleteProblemLogs, editProblemLog } from '../services/problem-log';
import EditProblemLogState from '../states/edit-problem-log-state';

interface ICreateProblemModalProps {
    setShowEditProblemModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProblemModal = (props: ICreateProblemModalProps) => {
    const [problemName, setProblemName] = useState(EditProblemLogState.getProblemName());
    const [problemUrl, setProblemUrl] = useState(EditProblemLogState.getProblemUrl());
    const [problemDifficulty, setProblemDifficulty] = useState(EditProblemLogState.getProblemDifficulty() + "");
    const [submitButtonText, setSubmitButtonText] = useState("Done");
    const [errorText, setErrorText] = useState("");

    const handleSubmit = async() => {
        const newProblemLog: IProblemLog = {
            id: EditProblemLogState.getProblemId(),
            name: problemName,
            url: problemUrl,
            difficulty: Number(problemDifficulty),
            timestamp: new Date(Date.now())
        }

        setSubmitButtonText("Submitting")
        if (await editProblemLog(newProblemLog)) {
            setSubmitButtonText("Done");
            setProblemName("");
            setProblemUrl("");
            setProblemDifficulty("");
            setErrorText("");
            props.setShowEditProblemModal(false);
        }
        else {
            setSubmitButtonText("Done");
            setErrorText("Oops! Something went wrong. Please try again later")
        }
    }

    const handleDelete = async () => {
        if (await deleteProblemLogs(EditProblemLogState.getProblemId())) {
            setSubmitButtonText("Done");
            setProblemName("");
            setProblemUrl("");
            setProblemDifficulty("");
            setErrorText("");
            props.setShowEditProblemModal(false);
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
                    <h1>Edit Problem</h1>
                    <form className="create-problem-form">
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
                            <button onClick={() => handleDelete()} 
                                    className="form-button">
                                Remove
                            </button>
                            <button onClick={() => props.setShowEditProblemModal(false)} 
                                    className="form-button">
                                Cancel
                            </button>
                            <input className="form-button" 
                                    value={submitButtonText}
                                    onClick={() => handleSubmit()}>
                            </input>
                        </div>
                    </form>
                </div>
                <div className="old-computer-frame">
                    <div className="old-computer-container">
                        <img className="old-computer-img" src="/images/old_computer.png"></img>
                        <p>"Entered something wrong? You can fix it here!"</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProblemModal;