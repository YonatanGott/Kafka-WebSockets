import React, { useState } from 'react';
import axios from 'axios';



const LogCard = ({ log }) => {
    const [showLog, setShowLog] = useState(false)

    // Date and Time
    let dateArray = log.time.split('T');
    let date = dateArray[0];
    let timeStr = dateArray[1];
    let timeArray = timeStr.split(':');
    let time = timeArray[0] + ":" + timeArray[1];
    // Title (temp)
    let gameArray = log.game.split('|')
    let titleArray = gameArray[gameArray.length - 1].split(';');
    let title = titleArray[0] + ' ' + titleArray[titleArray.length - 1];


    const handleShowLog = () => {
        setShowLog(true)
    }
    const handleHideLog = () => {
        setShowLog(false)
    }

    const handleSendLog = async (e) => {
        let logId = e.target.value
        await axios.post("http://localhost:5000/api/logs", {
            id: logId,
        });
    }

    return (
        <div className="row">
            <div className="col s12">
                <div className="card-panel teal">
                    <h5 className="card-title white-text"> {title} </h5>
                    <div className="card-content white-text">
                        <span>
                            {(showLog ?
                                <button className="waves-effect waves-light btn-small blue-grey lighten-5 black-text log-btn" onClick={handleHideLog}>Hide Log</button> :
                                <button className="waves-effect waves-light btn-small blue-grey darken-4 log-btn" onClick={handleShowLog}>Show Log</button>)}
                            {
                                showLog && <ul className="list-group left-align">
                                    {log.data.map((log, index) => {
                                        return <li key={index}>
                                            <blockquote className="log-item">
                                                {log}
                                            </blockquote>
                                        </li>
                                    })}
                                </ul>
                            }
                        </span>
                        <p>
                            <b>Date: </b>{date}
                        </p>
                        <p>
                            <b>Time: </b>{time}
                        </p>
                    </div>
                    <button value={log._id} className="waves-effect waves-light btn blue-grey darken-4 send-btn" onClick={handleSendLog}>Send Log</button>
                </div>
            </div>
        </div>
    )
}
export default LogCard;