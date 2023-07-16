import React from 'react'
export const Table = ({ headers, data }) => {
    return (
        <table className="table table-striped table-bordered" >
            <thead style={{ backgroundColor: "rgb(91, 177, 235)", color: "white" }}>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((row, index) => (
                    <tr key={index}>
                        {headers?.map((header, index) => (
                            <td key={index}>{row[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
