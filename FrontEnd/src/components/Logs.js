import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogCard from './LogCard';

const Logs = () => {
    const [logs, setLogs] = useState([])

    const getLogs = async () => {
        let res = await axios.get("http://localhost:5000/api/logs");
        let data = res.data;
        setLogs(data)
    };

    useEffect(() => {
        getLogs();
    }, [])

    return (
        <div className="container">
            <h2>Logs</h2>
            {
                logs.map((log) => {
                    return <LogCard log={log} key={log._id} />
                })
            }
        </div>
    )
}

export default Logs;
