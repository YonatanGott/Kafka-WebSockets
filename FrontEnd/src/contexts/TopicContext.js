import React, { createContext, useEffect, useState } from "react"
import io from 'socket.io-client'

export const TopicContext = createContext()

const TopicContextProvider = (props) => {
    const [showConnect, setShowConnect] = useState(false)
    const [showButton, setShowButton] = useState(true)
    // Topics Streams
    const [topicOne, setTopicOne] = useState([])
    const [topicTwo, setTopicTwo] = useState([])
    const [topicThree, setTopicThree] = useState([])
    const [topicFour, setTopicFour] = useState([])
    const [topicFive, setTopicFive] = useState([])
    // Topics Titles
    const topics = [
        'StreamOne',
        'StreamTwo',
        'StreamThree',
        'StreamFour',
        'StreamFive'
    ]
    // Charts Arrays
    const [accuracy, setAccuracy] = useState([])
    const [accuracy2, setAccuracy2] = useState([])
    const [anticipation, setAnticipation] = useState([])
    const [visualAwareness, setVisualAwareness] = useState([])
    const [clearing, setClearing] = useState([])
    const [speed, setSpeed] = useState([])
    const [reactionTime, setReactionTime] = useState([])
    const [precision, setPrecision] = useState([])
    const [targetAcquisition, setTargetAcquisition] = useState([])
    const [concentration, setConcentration] = useState([])
    const [total, setTotal] = useState([])
    // Real-Time Chart

    // Chart Data
    const buildChartData = (data) => {
        switch (data.key) {
            case 'ACCURACY':
                setAccuracy(prevItems => [...prevItems, data])
                break;
            case 'ACCURACY2':
                setAccuracy2(prevItems => [...prevItems, data])
                break;
            case 'ANTICIPATION':
                setAnticipation(prevItems => [...prevItems, data])
                break;
            case 'VISUAL_ATTENTION':
                setVisualAwareness(prevItems => [...prevItems, data])
                break;
            case 'CLEARING':
                setClearing(prevItems => [...prevItems, data])
                break;
            case 'SPEED':
                setSpeed(prevItems => [...prevItems, data])
                break;
            case 'PRECISION':
                setPrecision(prevItems => [...prevItems, data])
                break;
            case 'REACTION_TIME':
                setReactionTime(prevItems => [...prevItems, data])
                break;
            case 'TARGET_ACQUISITION_NEATRALIZING':
                setTargetAcquisition(prevItems => [...prevItems, data])
                break;
            case 'CONCENTRATION':
                setConcentration(prevItems => [...prevItems, data])
                break;
            default:
                console.log('Key Not Valid');
        }
    }

    const buildRadarData = (data) => {
        const index = total.findIndex(key => key.title === data.title)
        if (index === -1) {
            setTotal(prevItems => [...prevItems, data])
        } else {
            total[index] = data;
        }
    }

    // Reset Chart 


    // WebSocket
    const handleConnect = async () => {
        const socket = io('http://localhost:5000')
        socket.on("connect", () => {
            setShowButton(false)
            setShowConnect(true)
        });
        socket.on('greeting', (data) => {
            console.log('Greeting: ', data);
        });
        socket.on('data', (data) => {
            getStreamData(data);
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

    const getStreamData = (data) => {
        switch (data.topic) {
            case 'StreamOne':
                setTopicOne(prevItems => [...prevItems, data])
                break;
            case 'StreamTwo':
                setTopicTwo(prevItems => [...prevItems, data])
                break;
            case 'StreamThree':
                setTopicThree(prevItems => [...prevItems, data])
                break;
            case 'StreamFour':
                setTopicFour(prevItems => [...prevItems, data])
                break;
            case 'StreamFive':
                setTopicFive(prevItems => [...prevItems, data])
                break;
            case 'Dashboard':
                let indicator = JSON.parse(data.data)
                buildChartData(indicator)
                break;
            default:
                console.log('Topic Not Recognized');
        }
    }

    useEffect(() => {
        handleConnect()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const value = {
        topics,
        showConnect,
        showButton,
        topicOne,
        topicTwo,
        topicThree,
        topicFour,
        topicFive,
        handleConnect,
        handleDisconnect,
        accuracy,
        accuracy2,
        anticipation,
        visualAwareness,
        clearing,
        speed,
        reactionTime,
        precision,
        targetAcquisition,
        concentration,
        buildRadarData,
        total,
    }

    return (
        <TopicContext.Provider value={value} >
            {props.children}
        </TopicContext.Provider>
    );
}
export default TopicContextProvider;