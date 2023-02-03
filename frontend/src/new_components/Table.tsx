import React from 'react';

const Table = ({headers = [], rows = []}: { headers: string[], rows: any[] }) => {
    console.log(headers, rows)
    return (
        <table>
            <thead>
            <tr>
                {headers.map((header, index) => (<th key={index}>{header}</th>))}
            </tr>
            </thead>
            <tbody>

            {rows.map(({row, index}: { row: any, index: number }) => (
                <tr key={index}>{row.map((cell: any, index: number) => (<td key={index}>{cell}</td>))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};
export default Table;
