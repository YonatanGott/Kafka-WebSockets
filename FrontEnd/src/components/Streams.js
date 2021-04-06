import React, { useState } from 'react';
import StreamTable from './StreamTable';


const Streams = ({ showConnect, showButton, handleConnect, topicOne, topicTwo, topicThree, topicFour, topicFive }) => {
    const [showTopicOne, setShowTopicOne] = useState(false)
    const [showTopicTwo, setShowTopicTwo] = useState(false)
    const [showTopicThree, setShowTopicThree] = useState(false)
    const [showTopicFour, setShowTopicFour] = useState(false)
    const [showTopicFive, setShowTopicFive] = useState(false)
    const topicOneTitle = 'Topic 1 Title';
    const topicTwoTitle = 'Topic 2 Title';
    const topicThreeTitle = 'Topic 3 Title';
    const topicFourTitle = 'Topic 4 Title';
    const topicFiveTitle = 'Topic 5 Title';

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
                                {
                                    showTopicOne ? <button value="TopicOne" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>Topic 1</button> :
                                        <button value="TopicOne" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>Topic 1</button>
                                }
                                {
                                    showTopicTwo ? <button value="TopicTwo" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>Topic 2</button> :
                                        <button value="TopicTwo" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>Topic 2</button>
                                }
                                {
                                    showTopicThree ? <button value="TopicThree" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>Topic 3</button> :
                                        <button value="TopicThree" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>Topic 3</button>
                                }
                                {
                                    showTopicFour ? <button value="TopicFour" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>Topic 4</button> :
                                        <button value="TopicFour" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>Topic 4</button>
                                }
                                {
                                    showTopicFive ? <button value="TopicFive" className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>Topic 5</button> :
                                        <button value="TopicFive" className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>Topic 5</button>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
            {
                showTopicOne && <StreamTable stream={topicOne} topic={topicOneTitle} />
            }
            {
                showTopicTwo && <StreamTable stream={topicTwo} topic={topicTwoTitle} />
            }
            {
                showTopicThree && <StreamTable stream={topicThree} topic={topicThreeTitle} />
            }
            {
                showTopicFour && <StreamTable stream={topicFour} topic={topicFourTitle} />
            }
            {
                showTopicFive && <StreamTable stream={topicFive} topic={topicFiveTitle} />
            }
        </div >
    )

}

export default Streams;