import { IProblemLog } from "../interfaces/problem-log";

export const compareDate = (dateA: Date, dateB: Date) => {
    dateA = new Date(dateA);
    dateB = new Date(dateB);

    if (dateA.getFullYear() != dateB.getFullYear() ||
        dateA.getMonth() != dateB.getMonth() ||
        dateA.getDate() != dateB.getDate()) {
        return false;
    }
    return true;
}

export const separateByDate = (problemLogs: IProblemLog[]) => {
    if (problemLogs.length == 0) return [];
    let res: IProblemLog[][] = [];
    res.push([problemLogs[0]]);
    let prev = problemLogs[0];
    let prev_i = 0;
    for (let i = 1; i < problemLogs.length; ++i) {
        if (compareDate(prev.timestamp, problemLogs[i].timestamp)) {
            res[prev_i].push(problemLogs[i]);
        }
        else {
            res.push([problemLogs[i]]);
            prev_i++;
        }
        prev = problemLogs[i];
    }
    return res;
}

export const formatDateTitle = (date: Date) => {
    date = new Date(date);
    return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
}