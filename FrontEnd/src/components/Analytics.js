import React, { useContext, useState } from 'react';
import { TopicContext } from '../contexts/TopicContext';
import {
    Container,
    Grid,
    Typography,
    Button,
    LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AnalyticsData from './AnalyticsData';


const useStyles = makeStyles(() => ({
    topicBtn: {
        margin: "1rem",
        textTransform: "none",
        backgroundColor: '#e0f7fa',
        '&:hover': {
            background: "#b2ebf2",
        },
    },
    topicBtnActive: {
        margin: "1rem",
        backgroundColor: "black",
        color: "white",
        textTransform: "none",
        '&:hover': {
            background: "#00838f",
        },
    },
    title: {
        marginTop: "2rem"
    },
}));

const Analytics = () => {
    const classes = useStyles();
    const [showTopicOne, setShowTopicOne] = useState(false)
    const [showTopicTwo, setShowTopicTwo] = useState(false)
    const [showTopicThree, setShowTopicThree] = useState(false)
    const [showTopicFour, setShowTopicFour] = useState(false)
    const [showTopicFive, setShowTopicFive] = useState(false)
    // Topic Context
    const { showConnect, showButton, handleConnect, topicOne, topicTwo, topicThree, topicFour, topicFive, handleDisconnect, topics } = useContext(TopicContext)

    const handleShowTopic = (e) => {
        switch (e.currentTarget.value) {
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
        switch (e.currentTarget.value) {
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

    const changeTopics = () => {
        handleDisconnect()
        setShowTopicOne(false);
        setShowTopicTwo(false);
        setShowTopicThree(false);
        setShowTopicFour(false);
        setShowTopicFive(false);
    }

    return (
        <Container>
            <Grid
                container
                spacing={3}
                direction="column"
                justify="center"
                alignItems="center"
            >
                {
                    showButton &&
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom className={classes.title}>
                            Connect to Analytic Topics
                    </Typography>
                        <Button variant="outlined" onClick={handleConnect}> Connect</Button>
                    </Grid>
                }
                {
                    showConnect && <Grid item xs={12}>
                        <Button variant="outlined" className={classes.topicBtnActive} onClick={changeTopics} > Disconnect </Button>
                        <Typography variant="h5" gutterBottom className={classes.titleConnected}>
                            Connected To Topics
                    </Typography>
                        <LinearProgress />
                        {topics[0] && <>
                            {
                                showTopicOne ? <Button variant="outlined" className={classes.topicBtnActive} value="TopicOne" onClick={handleHideTopic}>{topics[0]}</Button> :
                                    <Button variant="outlined" className={classes.topicBtn} value="TopicOne" onClick={handleShowTopic}>{topics[0]}</Button>
                            }
                        </>}
                        {topics[1] && <>
                            {
                                showTopicTwo ? <Button variant="outlined" className={classes.topicBtnActive} value="TopicTwo" onClick={handleHideTopic}>{topics[1]}</Button> :
                                    <Button variant="outlined" className={classes.topicBtn} value="TopicTwo" onClick={handleShowTopic}>{topics[1]}</Button>
                            }
                        </>}
                        {topics[2] && <>
                            {
                                showTopicThree ? <Button variant="outlined" className={classes.topicBtnActive} value="TopicThree" onClick={handleHideTopic}> {topics[2]}</Button> :
                                    <Button variant="outlined" className={classes.topicBtn} value="TopicThree" onClick={handleShowTopic}> {topics[2]}</Button>
                            }
                        </>}
                        {topics[3] && <>
                            {
                                showTopicFour ? <Button variant="outlined" className={classes.topicBtnActive} value="TopicFour" onClick={handleHideTopic}>{topics[3]}</Button> :
                                    <Button variant="outlined" className={classes.topicBtn} value="TopicFour" onClick={handleShowTopic}>{topics[3]}</Button>
                            }
                        </>}
                        {topics[4] && <>
                            {
                                showTopicFive ? <Button variant="outlined" className={classes.topicBtnActive} value="TopicFive" onClick={handleHideTopic}>{topics[4]}</Button> :
                                    <Button variant="outlined" className={classes.topicBtn} value="TopicFive" onClick={handleShowTopic}>{topics[4]}</Button>
                            }
                        </>}
                    </Grid>
                }
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    {
                        showTopicOne && <AnalyticsData stream={topicOne} topic={topics[0]} />
                    }
                    {
                        showTopicTwo && <AnalyticsData stream={topicTwo} topic={topics[1]} />
                    }
                    {
                        showTopicThree && <AnalyticsData stream={topicThree} topic={topics[2]} />
                    }
                    {
                        showTopicFour && <AnalyticsData stream={topicFour} topic={topics[3]} />
                    }
                    {
                        showTopicFive && <AnalyticsData stream={topicFive} topic={topics[4]} />
                    }
                </Grid>
            </Grid>
        </Container>
    )
}
export default Analytics;