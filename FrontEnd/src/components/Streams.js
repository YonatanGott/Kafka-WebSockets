import React, { useContext, useState } from 'react';
import { TopicContext } from '../contexts/TopicContext';
import StreamTable from './StreamTable';


const Streams = () => {
    const [showTopicOne, setShowTopicOne] = useState(false)
    const [showTopicTwo, setShowTopicTwo] = useState(false)
    const [showTopicThree, setShowTopicThree] = useState(false)
    const [showTopicFour, setShowTopicFour] = useState(false)
    const [showTopicFive, setShowTopicFive] = useState(false)
    const [activeStreams, setActiveStreams] = useState(0)
    // Topic Context
    const { showConnect, showButton, handleConnect, topicOne, topicTwo, topicThree, topicFour, topicFive, topics, allTopics, handleDisconnect } = useContext(TopicContext)
    const analyticsTopics = []

    const handleShowTopic = (e) => {
        switch (e.target.value) {
            case 'TopicOne':
                setShowTopicOne(true);
                setActiveStreams(i => i + 1)
                break;
            case 'TopicTwo':
                setShowTopicTwo(true);
                setActiveStreams(i => i + 1)
                break;
            case 'TopicThree':
                setShowTopicThree(true);
                setActiveStreams(i => i + 1)
                break;
            case 'TopicFour':
                setShowTopicFour(true);
                setActiveStreams(i => i + 1)
                break;
            case 'TopicFive':
                setShowTopicFive(true);
                setActiveStreams(i => i + 1)
                break;
            default:
                setShowTopicOne(true);
                setShowTopicTwo(true);
                setShowTopicThree(true);
                setShowTopicFour(true);
                setShowTopicFive(true);
        }
    }

    const handleHideTopic = (e) => {
        switch (e.target.value) {
            case 'TopicOne':
                setShowTopicOne(false);
                setActiveStreams(i => i - 1)
                break;
            case 'TopicTwo':
                setShowTopicTwo(false);
                setActiveStreams(i => i - 1)
                break;
            case 'TopicThree':
                setShowTopicThree(false);
                setActiveStreams(i => i - 1)
                break;
            case 'TopicFour':
                setShowTopicFour(false);
                setActiveStreams(i => i - 1)
                break;
            case 'TopicFive':
                setShowTopicFive(false);
                setActiveStreams(i => i - 1)
                break;
            default:
                setShowTopicOne(false);
                setShowTopicTwo(false);
                setShowTopicThree(false);
                setShowTopicFour(false);
                setShowTopicFive(false);
        }
    }

    const handleChecked = (e) => {
        let check = e.target.checked;
        let topic = e.target.value;
        if (check) {
            analyticsTopics.push(topic)
        } else if (!check) {
            let index = analyticsTopics.indexOf(topic);
            analyticsTopics.splice(index, 1)
        }
    }

    const handleSubmitTopics = (e) => {
        e.preventDefault();
        if (analyticsTopics.length > 0) {
            handleConnect(analyticsTopics);
        }
    }
    const changeTopics = () => {
        handleDisconnect()
        setShowTopicOne(false);
        setShowTopicTwo(false);
        setShowTopicThree(false);
        setShowTopicFour(false);
        setShowTopicFive(false);
    }

    return (
        <div className="container">
            <h2>Streams</h2>
            <div className="row">
                <div className="col s12">
                    {
                        showButton &&
                        <div className="card-panel teal">
                            <h5 className="topic-text white-text">Chose From Available Topics:</h5>
                            <span className="white-text"> Up to 5 </span>
                            <form action="#">
                                {
                                    allTopics && allTopics.map((topic, index) => {
                                        return (
                                            <p key={index}>
                                                <label className="checkbox-label">
                                                    <input type="checkbox" value={topic} onChange={handleChecked} />
                                                    <span>{topic}</span>
                                                </label>
                                            </p>
                                        )
                                    })
                                }
                                <button className="waves-effect waves-light btn-large blue-grey darken-3" onClick={handleSubmitTopics}> Connect to Streams</button>
                            </form>
                        </div>
                    }
                </div>
                {
                    showConnect && <div className="col s10 offset-s1">

                        <div className="card-panel teal connect-card">
                            <button className="waves-effect waves-light btn-small grey darken-3" onClick={changeTopics} > Change Topics </button>
                            <h5 className="connected-text white-text">Connected To Topics</h5>
                            <div className="progress blue-grey darken-2">
                                <div className="indeterminate blue-grey lighten-5"></div>
                            </div>
                            <div className="streams-action">
                                {topics[0] && <>
                                    {
                                        showTopicOne ? <button value="TopicOne" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>{topics[0]}</button> :
                                            <button value="TopicOne" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>{topics[0]}</button>
                                    }
                                </>}
                                {topics[1] && <>
                                    {
                                        showTopicTwo ? <button value="TopicTwo" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>{topics[1]}</button> :
                                            <button value="TopicTwo" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>{topics[1]}</button>
                                    }
                                </>}
                                {topics[2] && <>
                                    {
                                        showTopicThree ? <button value="TopicThree" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}> {topics[2]}</button> :
                                            <button value="TopicThree" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}> {topics[2]}</button>
                                    }
                                </>}
                                {topics[3] && <>
                                    {
                                        showTopicFour ? <button value="TopicFour" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>{topics[3]}</button> :
                                            <button value="TopicFour" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>{topics[3]}</button>
                                    }
                                </>}
                                {topics[4] && <>
                                    {
                                        showTopicFive ? <button value="TopicFive" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>{topics[4]}</button> :
                                            <button value="TopicFive" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>{topics[4]}</button>
                                    }
                                </>}
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="row center-align">
                {
                    showTopicOne && <StreamTable stream={topicOne} topic={topics[0]} activeStreams={activeStreams} />
                }
                {
                    showTopicTwo && <StreamTable stream={topicTwo} topic={topics[1]} activeStreams={activeStreams} />
                }
                {
                    showTopicThree && <StreamTable stream={topicThree} topic={topics[2]} activeStreams={activeStreams} />
                }
                {
                    showTopicFour && <StreamTable stream={topicFour} topic={topics[3]} activeStreams={activeStreams} />
                }
                {
                    showTopicFive && <StreamTable stream={topicFive} topic={topics[4]} activeStreams={activeStreams} />
                }
            </div>
        </div >
    )

}

export default Streams;