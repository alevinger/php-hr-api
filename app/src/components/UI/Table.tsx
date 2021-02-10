import React, { FunctionComponent } from 'react';
import { TableInstance, useTable } from 'react-table';
import styled from 'styled-components';

export const StyledTd = styled.td`
    position: relative;
    padding: 8px;
    vertical-align: middle;
`;

export const StyledTh = styled.td`
    position: relative;
    padding: 8px;
    vertical-align: middle;
    font-weight: 900;
`;

interface TableProps {
    columns: TableInstance['columns'];
    data: TableInstance['data'];
}

const Table: FunctionComponent<TableProps> = ({ columns, data }) => {
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data,
    });

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <StyledTh {...column.getHeaderProps()}>{column.render('Header')}</StyledTh>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <StyledTd {...cell.getCellProps()}>{cell.render('Cell')}</StyledTd>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
