import { IProblemLog } from "../interfaces/problem-log";

export const fetchProblemLogs = (page: number, size: number) => {
    return new Promise<IProblemLog[]>((resolve, reject) => {{
        fetch(`${process.env.REACT_APP_API}/problemlog?page=${page}&size=${size}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data as IProblemLog[]);
        })
        .catch((error) => {
            console.error(error);
        })
    }})
}