import React, { useEffect, useState } from 'react';
import LogCard from './LogCard';
// API
import { getAllLogs, getAllTopics } from '../lib/api'

const Logs = () => {
    const [logs, setLogs] = useState([])
    const [topics, setTopics] = useState([])

    const getLogs = async () => {
        const data = await getAllLogs()
        const topics = await getAllTopics()
        setLogs(data.logs);
        setTopics(topics.topics)
    };

    useEffect(() => {
        getLogs();
    }, [])

    return (
        <div className="container">
            <h2>Logs</h2>
            <div className="row">
                {
                    logs.map((log) => {
                        return <LogCard log={log} topics={topics} key={log._id} />
                    })
                }
            </div>
        </div>
    )
}

export default Logs;
