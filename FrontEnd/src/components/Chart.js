import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ResponsiveLine } from "@nivo/line";
import { TopicContext } from '../contexts/TopicContext';


const useStyles = makeStyles(() => ({
    chart: {
        marginTop: "2rem",
    },
    box: {
        width: "100wh",
        height: "40vh",
        overflow: "hidden",
    }
}));

const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;

const Chart = ({ title, data }) => {
    const classes = useStyles();
    const [showGraph, setShowGraph] = useState(false)
    const [dataArray, setDataArray] = useState([])
    const [currentAvg, setCurrentAvg] = useState('')
    const { buildRadarData } = useContext(TopicContext)

    const chart = [{
        id: "Player",
        data: dataArray
    }]

    //Organize chart data object  
    const setChartData = (dataArray) => {
        let dataPoints = [];
        let averageArray = []
        for (let i = 0; i < dataArray.length; i++) {
            let dataPoint = {
                x: dataArray[i].label,
                y: dataArray[i].value,
            };
            dataPoints.push(dataPoint);
            averageArray.push(Number(dataArray[i].value))
        }
        setDataArray(dataPoints)
        let avg = Math.round(average(averageArray))
        setCurrentAvg(avg)
        let totalData = {
            title: title,
            Player: avg
        }
        buildRadarData(totalData)
    }
    // Show Graph
    useEffect(() => {
        if (data.length > 0) {
            setChartData(data)
            setShowGraph(true)
        }// eslint-disable-next-line
    }, [data])

    return (
        showGraph &&
        <Grid item xs={12} sm={6} className={classes.chart} >
            <Typography variant="h6" gutterBottom className={classes.title}>
                {title}
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
                Current Average: {currentAvg}%
            </Typography>
            <Box className={classes.box} >
                <ResponsiveLine
                    data={chart}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: 0,
                        max: 100,
                        stacked: false,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Time in Game Round",
                        legendOffset: 36,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "left",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Percentage",
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    //enableSlices="x"
                    enableGridX={true}
                    enableGridY={true}
                    colors={{ scheme: "pink_yellowGreen" }}
                    pointSize={4}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: "top",
                            direction: "row",
                            justify: false,
                            translateX: 0,
                            translateY: -30,
                            itemsSpacing: 10,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 30,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </Box>
        </Grid>
    )
}
export default Chart;