import React, { useState } from 'react';
import StreamTable from './StreamTable';


const Streams = ({ showConnect, showButton, handleConnect, topicOne, topicTwo, topicThree, topicFour, topicFive }) => {
    const [showTopicOne, setShowTopicOne] = useState(false)
    const [showTopicTwo, setShowTopicTwo] = useState(false)
    const [showTopicThree, setShowTopicThree] = useState(false)
    const [showTopicFour, setShowTopicFour] = useState(false)
    const [showTopicFive, setShowTopicFive] = useState(false)

    const handleShowTopic = (e) => {
        switch (e.target.value) {
            case 'TopicOne':
                setShowTopicOne(true);
                break;
            case 'TopicTwo':
                setShowTopicTwo(true);
                break;
            case 'TopicThree':
                setShowTopicThree(true);
                break;
            case 'TopicFour':
                setShowTopicFour(true);
                break;
            case 'TopicFive':
                setShowTopicFive(true);
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
                break;
            case 'TopicTwo':
                setShowTopicTwo(false);
                break;
            case 'TopicThree':
                setShowTopicThree(false);
                break;
            case 'TopicFour':
                setShowTopicFour(false);
                break;
            case 'TopicFive':
                setShowTopicFive(false);
                break;
            default:
                setShowTopicOne(false);
                setShowTopicTwo(false);
                setShowTopicThree(false);
                setShowTopicFour(false);
                setShowTopicFive(false);
        }
    }

    return (
        <div className="container">
            <h2>Streams</h2>
            <div className="row">
                <div className="col s12">
                    {
                        showButton &&
                        <button className="waves-effect waves-light btn-large" onClick={handleConnect}> Connect to Stream</button>
                    }
                </div>
                {
                    showConnect && <div className="col s8 offset-s2">
                        <div className="card-panel teal connect-card">
                            <h5 className="connected-text white-text">Connected To Socket</h5>
                            <div className="progress blue-grey darken-2">
                                <div className="indeterminate blue-grey lighten-5"></div>
                            </div>
                            <div className="streams-action">
                                {topicOne[0] && <>{
                                    showTopicOne ? <button value="TopicOne" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>{topicOne[0].topic}</button> :
                                        <button value="TopicOne" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>{topicOne[0].topic}</button>
                                }</>}
                                {topicTwo[0] && <>
                                    {
                                        showTopicTwo ? <button value="TopicTwo" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>{topicTwo[0].topic}</button> :
                                            <button value="TopicTwo" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>{topicTwo[0].topic}</button>
                                    }
                                </>}
                                {topicThree[0] && <>
                                    {
                                        showTopicThree ? <button value="TopicThree" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}> {topicThree[0].topic}</button> :
                                            <button value="TopicThree" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}> {topicThree[0].topic}</button>
                                    }
                                </>}
                                {topicFour[0] && <>
                                    {
                                        showTopicFour ? <button value="TopicFour" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>{topicFour[0].topic}</button> :
                                            <button value="TopicFour" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>{topicFour[0].topic}</button>
                                    }
                                </>}
                                {topicFive[0] && <>
                                    {
                                        showTopicFive ? <button value="TopicFive" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>{topicFive[0].topic}</button> :
                                            <button value="TopicFive" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>{topicFive[0].topic}</button>
                                    }
                                </>}
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="row">
                {
                    showTopicOne && <StreamTable stream={topicOne} topic={topicOne[0].topic} />
                }
                {
                    showTopicTwo && <StreamTable stream={topicTwo} topic={topicTwo[0].topic} />
                }
                {
                    showTopicThree && <StreamTable stream={topicThree} topic={topicThree[0].topic} />
                }
                {
                    showTopicFour && <StreamTable stream={topicFour} topic={topicFour[0].topic} />
                }
                {
                    showTopicFive && <StreamTable stream={topicFive} topic={topicFive[0].topic} />
                }
            </div>
        </div >
    )

}

export default Streams;