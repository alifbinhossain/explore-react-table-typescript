import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import mockup from '../../public/data.json';
import { COLUMNS } from '../columns/index';
const BasicTable: React.FC = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mockup, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className='min-h-screen bg-gray-700 p-8'>
      <h1 className='text-center text-3xl text-gray-200 mb-4'>Basic Table</h1>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
