import { useEffect, useState } from "react";
import { fetchProblemLogs } from "../services/problem-log";
import { IProblemLog } from "../interfaces/problem-log";
import { separateByDate, formatDateTitle } from "../utils/date";

const ProblemLog = () => {
    const [problemLogs, setProblemLogs] = useState<IProblemLog[][]>();

    useEffect(() => {
        fetchProblemLogs(0, 10).then((res) => {
            setProblemLogs(separateByDate(res));
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
        <div>
            { problemLogs.map((problemLogDate) => {
                return (
                    <div>
                        <h1>{formatDateTitle(problemLogDate[0].timestamp)}</h1>
                        { problemLogDate.map((problemLog) => {
                            return (
                                <div key={problemLog.id as React.Key}>{problemLog.name} {problemLog.difficulty}</div>
                            )
                        }) }
                    </div>
                )
            }) }
        </div>
    )
}

export default ProblemLog;