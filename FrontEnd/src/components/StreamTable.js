import React, { useEffect } from 'react';
import { useState } from 'react';


const StreamTable = ({ stream, topic, activeStreams }) => {
    const [col, setCol] = useState("col s12")
    // Change class columns
    useEffect(() => {
        if (activeStreams === 1) {
            setCol("col s12 stream-col")
        } else if (activeStreams === 2) {
            setCol("col s12 m6 stream-col")
        } else if (activeStreams === 3) {
            setCol("col s12 m4 stream-col")
        } else if (activeStreams === 4) {
            setCol("col s12 m3 stream-col")
        } else if (activeStreams === 5) {
            setCol("col s12 m2 five-topics stream-col")
        }
    }, [activeStreams])

    return (
        <div className={col}>
            <h5 className="table-title left">{topic}</h5>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {stream &&
                        stream.slice(0).reverse().map((stream, index) => {
                            return (
                                <tr key={index}>
                                    <td>{stream.data}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default StreamTable;