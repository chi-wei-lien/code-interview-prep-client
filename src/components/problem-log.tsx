import { useEffect, useState } from "react";
import { fetchProblemLogs } from "../services/problem-log";
import { IProblemLog } from "../interfaces/problem-log";
import { separateByDate, formatDateTitle, compareDate } from "../utils/date";

import '../style/problem-log.css'

interface IProblemLogProps {
    setShowCreateProblemModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProblemLog = (props: IProblemLogProps) => {
    const [problemLogs, setProblemLogs] = useState<IProblemLog[][]>();
    const [firstQuestionToday, setFirstQuestionToday] = useState(true);
    const [newProblemLog, setNewProblemLog] = useState<JSX.Element>();

    const today = new Date(Date.now());
    let counter = 0;

    useEffect(() => {
        fetchProblemLogs(0, 10).then((res) => {
            const separated = separateByDate(res)
            setProblemLogs(separated);
            if (compareDate(today, separated[0][0].timestamp)) {
                setNewProblemLog(<div>hi</div>);
                setFirstQuestionToday(false);
            }
        })
    }, [])

    if (!problemLogs) {
        return (
            <div>
                <div>fetching</div>
            </div>
        )
    } 

    return (
        <div className="problems">
            { firstQuestionToday  ? (
                <div className="problem">
                    <h1>{formatDateTitle(today)}</h1>
                    <ul>
                        <li className="new-problem"><a href="#" onClick={() => props.setShowCreateProblemModal(true)}>
                            Add Question</a>
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
                                    <li key={problemLog.id as React.Key}>
                                        <p>{problemLog.name} (<a href={problemLog.url} target="_blank">URL</a>)</p>
                                        
                                        <span className="difficulty tooltip">
                                            {problemLog.difficulty}
                                            <span className="tooltiptext">Difficulty</span>
                                        </span>
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