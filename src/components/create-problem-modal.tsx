import { useState } from 'react';
import '../style/create-problem-modal.css'
import { IProblemLog } from "../interfaces/problem-log";
import { createProblemLog } from '../services/problem-log';

interface ICreateProblemModalProps {
    setShowCreateProblemModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProblemModal = (props: ICreateProblemModalProps) => {
    const [questionName, setQuestionName] = useState("");
    const [questionUrl, setQuestionUrl] = useState("");
    const [questionDifficulty, setQuestionDifficulty] = useState("");
    const [submitButtonText, setSubmitButtonText] = useState("Done");
    const [errorText, setErrorText] = useState("");

    const handleSubmit= async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProblemLog: IProblemLog = {
            id: undefined,
            name: questionName,
            url: questionUrl,
            difficulty: Number(questionDifficulty),
            timestamp: new Date(Date.now())
        }

        setSubmitButtonText("Submitting")
        if (await createProblemLog(newProblemLog)) {
            setSubmitButtonText("Done");
            setQuestionName("");
            setQuestionUrl("");
            setQuestionDifficulty("");
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
                    <h1>Add Question</h1>
                    <form className="create-problem-form" onSubmit={e => {handleSubmit(e)}}>
                        <label>
                            <input placeholder="Question Name" 
                                    onChange={(e) => {setQuestionName(e.target.value)}}
                                    value={questionName}
                                    required></input>
                        </label>
                        <br />
                        <label>
                            <input placeholder="Question URL" 
                                    onChange={(e) => {setQuestionUrl(e.target.value)}}
                                    value={questionUrl}
                                    required></input>
                        </label>
                        <br />
                        <label>
                            <input type="number" 
                                    step="0.1" 
                                    max="5" 
                                    min="0"
                                    placeholder="Question Difficulty"
                                    onChange={((e) => {setQuestionDifficulty(e.target.value)})}
                                    value={questionDifficulty}
                                    required
                                    />
                        </label>
                        <div className="create-problem-error">{errorText}</div>
                        <div className="form-submit-frame">
                            <button onClick={() => props.setShowCreateProblemModal(false)} className="form-submit-button">
                                Cancel
                            </button>
                            <input 
                                className="form-submit-button" 
                                type='submit' value={submitButtonText}>
                            </input>
                        </div>
                    </form>
                </div>
                <div className="old-computer-frame">
                    <div className="old-computer-container">
                        <img className="old-computer-img" src="/images/old_computer.png"></img>
                        <p>"Nice you just solved another question!"</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProblemModal;