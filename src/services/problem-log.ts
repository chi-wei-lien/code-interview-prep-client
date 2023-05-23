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

export const createProblemLog = (newProblemLog: IProblemLog) => {
    return new Promise<Boolean>((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API}/problemlog`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProblemLog)
        }).then((res) => {
            if (res.status == 201) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        })
        .catch((error) => {
            console.error(error);
            resolve(false);
        })
    })
}

export const editProblemLog = (newProblemLog: IProblemLog) => {
    return new Promise<Boolean>((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API}/problemlog/${newProblemLog.id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProblemLog)
        }).then((res) => {
            if (res.status == 204 || res.status == 201) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        })
        .catch((error) => {
            console.error(error);
            resolve(false);
        })
    })
}

export const deleteProblemLogs = (id: number) => {
    return new Promise<Boolean>((resolve, reject) => {{
        fetch(`${process.env.REACT_APP_API}/problemlog/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            if (res.status == 204) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }})
}
