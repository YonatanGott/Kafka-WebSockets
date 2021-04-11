import React, { useState } from 'react';
// API
import { sendLog } from '../lib/api';

const LogCard = ({ log, topics }) => {
    const [showLog, setShowLog] = useState(false)
    const [showSend, setShowSend] = useState(false)
    const [loading] = useState(false)
    const [topic, setTopic] = useState()

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
    const handleShowSend = () => {
        setShowSend(true)
    }

    const handleSelectTopic = (e) => {
        setTopic(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (topic) {
            let selectedTopic = topic;
            await sendLog(selectedTopic, log._id)
            setShowSend(false)
        } else {
            alert('Select Topic')
        }
    }

    return (
        <div className="col s12">
            <div className="card-panel teal">
                <h5 className="card-title white-text"> {title} </h5>
                <div className="card-content white-text">
                    <span>
                        {showLog ?
                            <button className="waves-effect waves-light btn-small blue-grey lighten-5 black-text log-btn" onClick={handleHideLog}>Hide Log</button> :
                            <button className="waves-effect waves-light btn-small blue-grey darken-4 log-btn" onClick={handleShowLog}>Show Log</button>}
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
                {
                    !showSend &&
                    <button className="waves-effect waves-light btn-large blue-grey darken-4 send-btn" onClick={handleShowSend} >Choose Topic To Send Log</button>
                }
                {
                    loading &&
                    <div className="progress blue-grey darken-2">
                        <div className="indeterminate blue-grey lighten-5"></div>
                    </div>
                }
                {
                    showSend &&
                    <form action="#" onSubmit={handleSubmit} >
                        <div className="input-field select-topics valign-wrapper">
                            {
                                topics.map((topic, index) => {
                                    return (
                                        <p key={index}>
                                            <label>
                                                <input className="radio-btn" name="group1" type="radio" onChange={handleSelectTopic} value={topic} />
                                                <span>{topic}</span>
                                            </label>
                                        </p>
                                    )
                                })
                            }
                            <button type="submit" className="waves-effect waves-light btn blue-grey darken-4 send-btn" >Send Log</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}
export default LogCard;