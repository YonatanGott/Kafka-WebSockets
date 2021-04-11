import React, { useState } from 'react';


const StreamAction = ({ topic }) => {
    const [showTopic, setShowTopic] = useState(false)

    const handleShowTopic = () => {
        setShowTopic(true);
    }

    const handleHideTopic = () => {
        setShowTopic(false);
    }


    return (
        <>
            {
                showTopic ? <button className="waves-effect waves-light btn-small blue-grey lighten-5 black-text topic-btn" onClick={handleHideTopic}>{topic}</button> :
                    <button className="waves-effect waves-light btn-small blue-grey darken-4 topic-btn" onClick={handleShowTopic}>{topic}</button>
            }
        </>
    )
}
export default StreamAction;