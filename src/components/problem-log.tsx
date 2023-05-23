import { useEffect, useState } from "react";
import { fetchProblemLogs } from "../services/problem-log";
import { IProblemLog } from "../interfaces/problem-log";
import { separateByDate, formatDateTitle, compareDate } from "../utils/date";
import EditProblemLogState from "../states/edit-problem-log-state";

import '../style/problem-log.css'

interface IProblemLogProps {
    showCreateProblemModal: Boolean,
    showEditProblemModal: Boolean,
    setShowCreateProblemModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowEditProblemModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProblemLog = (props: IProblemLogProps) => {
    const [problemLogs, setProblemLogs] = useState<IProblemLog[][]>();
    const [firstProblemToday, setFirstProblemToday] = useState(true);
    const [newProblemLog, setNewProblemLog] = useState<JSX.Element>();

    const today = new Date(Date.now());
    let counter = 0;

    const handleProblemOnClick = (problemId: number, problemName: string, problemUrl: string, problemDifficulty: number) => {
        EditProblemLogState.setProblemId(problemId)
        EditProblemLogState.setProblemName(problemName);
        EditProblemLogState.setProblemUrl(problemUrl);
        EditProblemLogState.setProblemDifficulty(problemDifficulty);
        props.setShowEditProblemModal(true);
    }

    useEffect(() => {
        fetchProblemLogs(0, 10).then((res) => {
            const separated = separateByDate(res);
            if (separated.length === 0) {
                setFirstProblemToday(true);
            } 
            setProblemLogs(separated);
            if (separated.length > 0 && compareDate(today, separated[0][0].timestamp)) {
                setNewProblemLog(
                    <div className="problem">
                        <ul>
                            <li className="new-problem"><a href="#" onClick={() => props.setShowCreateProblemModal(true)}>
                                Add Problem</a>
                            </li>
                        </ul>
                    </div>);
                setFirstProblemToday(false);
            }
        })
    }, [props.showCreateProblemModal, props.showEditProblemModal])

    if (!problemLogs) {
        return (
            <div>
                <div>fetching</div>
            </div>
        )
    }

    return (
        <div className="problems">
            { firstProblemToday  ? (
                <div className="problem">
                    <h1>{formatDateTitle(today)}</h1>
                    <ul>
                        <li className="new-problem"><a href="#" onClick={() => props.setShowCreateProblemModal(true)}>
                            Add Problem</a>
                        </li>
                    </ul>
                </div>
            ) : null }
            { problemLogs.map((problemLogDate) => {
                counter++;
                return (
                    <div className="problem"> 
                        <h1>{ formatDateTitle(problemLogDate[0].timestamp) }</h1>
                        {counter == 1 ? newProblemLog : null}
                        <ul>
                            { problemLogDate.map((problemLog) => {
                                return (
                                    <li key={problemLog.id as React.Key} 
                                            onClick={() => {
                                                handleProblemOnClick(problemLog.id,
                                                        problemLog.name, 
                                                        problemLog.url, 
                                                        problemLog.difficulty)}}>
                                        {problemLog.name} (<a href={problemLog.url} target="_blank">URL</a>)
                                        
                                        <div className="difficulty tooltip">
                                            <span>{problemLog.difficulty + ""}</span>
                                            <span className="tooltiptext">Difficulty</span>
                                        </div>
                                    </li>
                                )
                            }) }
                        </ul>
                    </div>
                )
            }) }
        </div>
    )
}

export default ProblemLog;