import React from 'react';


const StreamTable = ({ stream, topic }) => {

    return (
        <div className="col s12 m6">
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