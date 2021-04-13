import React, { useContext } from 'react';
import {
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ResponsiveRadar } from '@nivo/radar';
import { TopicContext } from '../contexts/TopicContext';

const useStyles = makeStyles(() => ({
    box: {
        width: "100wh",
        height: "50vh",
        overflow: "hidden",
    }
}));

const Radar = () => {
    const classes = useStyles();
    const { total } = useContext(TopicContext)

    const chart = total
    const keys = ['Player'];

    return (
        total.length > 0 &&
        <Box className={classes.box} >
            <ResponsiveRadar
                data={chart}
                keys={keys}
                indexBy="title"
                maxValue="auto"
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                curve="linearClosed"
                borderWidth={2}
                borderColor={{ from: 'color' }}
                gridLevels={5}
                gridShape="circular"
                gridLabelOffset={36}
                enableDots={true}
                dotSize={10}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                dotBorderColor={{ from: 'color' }}
                enableDotLabel={true}
                dotLabel="value"
                dotLabelYOffset={-12}
                colors={{ scheme: 'pink_yellowGreen' }}
                fillOpacity={0.25}
                blendMode="multiply"
                animate={true}
                motionConfig="wobbly"
                isInteractive={true}
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        translateX: -50,
                        translateY: -40,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#999',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </Box>
    )
}
export default Radar;