import React, { useState } from 'react';
import axios from 'axios';



const LogCard = ({ log }) => {
    const [showLog, setShowLog] = useState(false)
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

    const handleSelectTopic = (e) => {
        setTopic(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (topic) {
            let selectedTopic = topic;
            await axios.post("http://localhost:5000/api/logs", {
                id: log._id,
                topic: selectedTopic,
            });
        } else {
            alert('Select Topic')
        }
    }

    return (
        <div className="row">
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
                    <form action="#" onSubmit={handleSubmit} >
                        <div className="input-field select-topics">
                            <p>
                                <label>
                                    <input className="radio-btn" name="group1" type="radio" onChange={handleSelectTopic} value='StreamOne' />
                                    <span>Topic 1</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input className="radio-btn" name="group1" type="radio" onChange={handleSelectTopic} value='StreamTwo' />
                                    <span>Topic 2</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input className="radio-btn" name="group1" type="radio" onChange={handleSelectTopic} value='StreamThree' />
                                    <span>Topic 3</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input className="radio-btn" name="group1" type="radio" onChange={handleSelectTopic} value='StreamFour' />
                                    <span>Topic 4</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input className="radio-btn" name="group1" type="radio" onChange={handleSelectTopic} value='StreamFive' />
                                    <span>Topic 5</span>
                                </label>
                            </p>
                        </div>
                        <button type="submit" className="waves-effect waves-light btn blue-grey darken-4 send-btn" >Send Log</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LogCard;