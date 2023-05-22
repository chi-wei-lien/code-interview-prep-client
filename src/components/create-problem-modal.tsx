import '../style/create-problem-modal.css'

interface ICreateProblemModalProps {
    setShowCreateProblemModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProblemModal = (props: ICreateProblemModalProps) => {
    return (
        <div className="modal-frame">
            <div className="modal">
                <div className="create-problem-form-container">
                    <h1>Add Question</h1>
                    <form className="create-problem-form">
                        <label>
                            <input placeholder="Question Name"></input>
                        </label>
                        <br />
                        <label>
                            <input placeholder="Question URL"></input>
                        </label>
                        <br />
                        <label>
                            <input placeholder="Question Difficulty"></input>
                        </label>
                    </form>
                    <div className="form-submit-frame">
                        <button onClick={() => props.setShowCreateProblemModal(false)} className="form-submit-button">
                            Cancel
                        </button>
                        <button onClick={() => props.setShowCreateProblemModal(false)} className="form-submit-button">
                            Done
                        </button>
                    </div>
                    {/* <button onClick={() => props.setShowCreateProblemModal(false)}>close</button> */}
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