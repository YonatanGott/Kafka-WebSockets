import React, { createContext, useEffect, useState } from "react"
import io from 'socket.io-client'
import {
    getAllTopics,
    //sendAnalyticsTopics 
} from '../lib/api'


export const TopicContext = createContext()

const TopicContextProvider = (props) => {
    const [showConnect, setShowConnect] = useState(false)
    const [showButton, setShowButton] = useState(true)
    // Topics Streams
    const [topics, setTopics] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [topicOne, setTopicOne] = useState([])
    const [topicTwo, setTopicTwo] = useState([])
    const [topicThree, setTopicThree] = useState([])
    const [topicFour, setTopicFour] = useState([])
    const [topicFive, setTopicFive] = useState([])


    const handleConnect = async (analyticsTopics) => {
        // Not at Use
        // let res = await sendAnalyticsTopics(analyticsTopics)
        const socket = io('http://localhost:5000')
        setTopics(analyticsTopics)
        socket.on("connect", () => {
            setShowButton(false)
            setShowConnect(true)
        });
        socket.on('greeting', (data) => {
            console.log('Greeting: ', data);
        });
        socket.on('data', (data) => {
            console.log('Data: ', data);
            getStreamData(data, analyticsTopics);
        });
        socket.on("disconnect", () => {
            console.log('Disconnected');
            setShowButton(true)
            setShowConnect(false)
        });
    }

    const handleDisconnect = () => {
        const socket = io('http://localhost:5000')
        socket.disconnect()
        setShowButton(true)
        setShowConnect(false)
        setTopicOne([])
        setTopicTwo([])
        setTopicThree([])
        setTopicFour([])
        setTopicFive([])
    }

    const getStreamData = (data, topics) => {
        switch (data.topic) {
            case topics[0]:
                setTopicOne(prevItems => [...prevItems, data])
                break;
            case topics[1]:
                setTopicTwo(prevItems => [...prevItems, data])
                break;
            case topics[2]:
                setTopicThree(prevItems => [...prevItems, data])
                break;
            case topics[3]:
                setTopicFour(prevItems => [...prevItems, data])
                break;
            case topics[4]:
                setTopicFive(prevItems => [...prevItems, data])
                break;
            default:
                console.log('No More Than 5 Topics');
        }
    }

    const getTopics = async () => {
        const topics = await getAllTopics()
        setAllTopics(topics.topics)
        // let analyticTopic = []
        // for( i=0; i<topics.topics.length; i++){
        //      let prefix = topics.topics[i].split('analytic)
        //        (...)
        //}
        // setTopics(analyticTopic)
    }

    useEffect(() => {
        getTopics()
    }, [])

    const value = {
        showConnect,
        showButton,
        allTopics,
        topics,
        topicOne,
        topicTwo,
        topicThree,
        topicFour,
        topicFive,
        handleConnect,
        handleDisconnect,
    }

    return (
        <TopicContext.Provider value={value} >
            {props.children}
        </TopicContext.Provider>
    );
}
export default TopicContextProvider;