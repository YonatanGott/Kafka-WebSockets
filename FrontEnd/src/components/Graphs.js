import React, {
    useState,
    useContext
} from 'react';
import Chart from './Chart';
import { TopicContext } from '../contexts/TopicContext';
import {
    Container,
    Grid,
    Button,
    Modal,
    Backdrop,
    Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Radar from './Radar';


const useStyles = makeStyles(() => ({
    chartBtn: {
        margin: "1rem"
    },
    chartBtnActive: {
        margin: "1rem",
        backgroundColor: "black",
        color: "white",
        '&:hover': {
            background: "darkgrey",
        },
    },
    header: {
        paddingLef: "0 !important",
        marginLeft: "4rem"
    },
    title: {
        marginTop: "1.2rem"
    },
    top: {
        marginTop: "1.3rem",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        height: "50vh",
        width: "50%"
    },
}));


const Graphs = () => {
    const classes = useStyles();
    const [showAccGraph, setShowAccGraph] = useState(true);
    const [showAcc2Graph, setShowAcc2Graph] = useState(true);
    const [showAntGraph, setShowAntGraph] = useState(true);
    const [showVAGraph, setShowVAGraph] = useState(true);
    const [showCCGraph, setShowCCGraph] = useState(true);
    const [showSGraph, setShowSGraph] = useState(true);
    const [showPGraph, setShowPGraph] = useState(true);
    const [showRTGraph, setShowRTGraph] = useState(true);
    const [showTANGraph, setShowTANGraph] = useState(true);
    const [showConGraph, setShowConGraph] = useState(true);
    const [open, setOpen] = useState(false);

    const { accuracy,
        accuracy2,
        anticipation,
        visualAwareness,
        clearing,
        speed,
        reactionTime,
        precision,
        targetAcquisition,
        concentration, } = useContext(TopicContext)

    const handleShowChart = (e) => {
        switch (e.currentTarget.value) {
            case 'Acc':
                setShowAccGraph(true);
                break;
            case 'Acc2':
                setShowAcc2Graph(true);
                break;
            case 'Ant':
                setShowAntGraph(true);
                break;
            case 'VA':
                setShowVAGraph(true);
                break;
            case 'CC':
                setShowCCGraph(true);
                break;
            case 'Sp':
                setShowSGraph(true);
                break;
            case 'Pr':
                setShowPGraph(true);
                break;
            case 'RT':
                setShowRTGraph(true);
                break;
            case 'TAN':
                setShowTANGraph(true);
                break;
            case 'Con':
                setShowConGraph(true);
                break;
            default:
                console.log('Something Happened');
        }
    }

    const handleHideChart = (e) => {
        switch (e.currentTarget.value) {
            case 'Acc':
                setShowAccGraph(false);
                break;
            case 'Acc2':
                setShowAcc2Graph(false);
                break;
            case 'Ant':
                setShowAntGraph(false);
                break;
            case 'VA':
                setShowVAGraph(false);
                break;
            case 'CC':
                setShowCCGraph(false);
                break;
            case 'Sp':
                setShowSGraph(false);
                break;
            case 'Pr':
                setShowPGraph(false);
                break;
            case 'RT':
                setShowRTGraph(false);
                break;
            case 'TAN':
                setShowTANGraph(false);
                break;
            case 'Con':
                setShowConGraph(false);
                break;
            default:
                console.log('Something Happened');
        }
    }

    // Modal
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth={false} className={classes.container}>
            <Grid
                className={classes.headerRow}
                container
                spacing={0}
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={11} sm={11} >
                    <Grid
                        className={classes.header}
                        container
                        spacing={0}
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} className={classes.top} >
                            {
                                showAccGraph ? <Button value="Acc" variant="outlined" className={classes.chartBtnActive} onClick={handleHideChart}>Accuracy</Button> :
                                    <Button value="Acc" variant="outlined" className={classes.chartBtn} color="secondary" onClick={handleShowChart}>Accuracy</Button>
                            }
                            {
                                showAcc2Graph ? <Button value="Acc2" variant="outlined" className={classes.chartBtnActive} onClick={handleHideChart}>Accuracy 2</Button> :
                                    <Button value="Acc2" variant="outlined" className={classes.chartBtn} color="secondary" onClick={handleShowChart}>Accuracy 2</Button>
                            }
                            {
                                showAntGraph ? <Button value="Ant" variant="outlined" className={classes.chartBtnActive} onClick={handleHideChart}>Anticipation</Button> :
                                    <Button value="Ant" variant="outlined" className={classes.chartBtn} color="secondary" onClick={handleShowChart}>Anticipation</Button>
                            }
                            {
                                showVAGraph ? <Button value="VA" variant="outlined" className={classes.chartBtnActive} onClick={handleHideChart}>Visual Awareness</Button> :
                                    <Button value="VA" variant="outlined" className={classes.chartBtn} color="secondary" onClick={handleShowChart}>Visual Awareness</Button>
                            }
                            {
                                showCCGraph ? <Button value="CC" variant="outlined" className={classes.chartBtnActive} onClick={handleHideChart}>Clearing</Button> :
                                    <Button value="CC" variant="outlined" className={classes.chartBtn} color="secondary" onClick={handleShowChart}>Clearing</Button>
                            }
                        </Grid>
                        <Grid item xs={12} className={classes.bottom} >
                            {
                                showSGraph ? <Button value="Sp" variant="outlined" className={classes.chartBtnActive} onClick={handleHideChart}>Speed</Button> :
                                    <Button value="Sp" variant="outlined" className={classes.chartBtn} color="secondary" onClick={handleShowChart}>Speed</Button>
                            }
                            {
                                showRTGraph ? <Button value="RT" variant="outlined" className={classes.chartBtnActive} onClick={handleHideChart}>Reaction Time</Button> :
                                    <Button value="RT" variant="outlined" className={classes.chartBtn} color="secondary" onClick={handleShowChart}>Reaction Time</Button>
                            }
                            {
                                showPGraph ? <Button value="Pr" variant="outlined" className={classes.chartBtnActive} onClick={handleHideChart}>Precision</Button> :
                                    <Button value="Pr" variant="outlined" className={classes.chartBtn} color="secondary" onClick={handleShowChart}>Precision</Button>
                            }
                            {
                                showTANGraph ? <Button value="TAN" variant="outlined" className={classes.chartBtnActive} onClick={handleHideChart}>Target Acquisition Neutralizing</Button> :
                                    <Button value="TAN" variant="outlined" className={classes.chartBtn} color="secondary" onClick={handleShowChart}>Target Acquisition Neutralizing</Button>
                            }
                            {
                                showConGraph ? <Button value="Con" variant="outlined" className={classes.chartBtnActive} onClick={handleHideChart}>Concentration</Button> :
                                    <Button value="Con" variant="outlined" className={classes.chartBtn} color="secondary" onClick={handleShowChart}>Concentration</Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} sm={1}  >
                    <Button value="Total" variant="outlined" className={classes.totalBtn} color="secondary" onClick={handleOpen} >Total</Button>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
            >
                {
                    showAccGraph && <Chart title="Accuracy" data={accuracy} />
                }
                {
                    showAcc2Graph && <Chart title="Accuracy 2" data={accuracy2} />
                }
                {
                    showAntGraph && <Chart title="Anticipation" data={anticipation} />
                }
                {
                    showVAGraph && <Chart title="Visual Awareness" data={visualAwareness} />
                }
                {
                    showCCGraph && <Chart title="Clearing" data={clearing} />
                }
                {
                    showSGraph && <Chart title="Speed" data={speed} />
                }
                {
                    showRTGraph && <Chart title="Reaction Time" data={reactionTime} />
                }
                {
                    showPGraph && <Chart title="Precision" data={precision} />
                }
                {
                    showTANGraph && <Chart title="Target Acquisition Neutralizing" data={targetAcquisition} />
                }
                {
                    showConGraph && <Chart title="Concentration" data={concentration} />
                }
            </Grid>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Paper className={classes.paper}>
                    <Radar />
                </Paper>
            </Modal>
        </Container>
    )
}
export default Graphs;