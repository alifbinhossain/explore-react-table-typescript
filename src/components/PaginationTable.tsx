import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import mockup from '../../public/data-2.json';
import { COLUMNS } from '../columns/index';
import * as IoIcons from 'react-icons/io';

const PaginationTable: React.FC = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mockup, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const { pageIndex, pageSize } = state;

  console.log(pageSize);

  return (
    <div className='min-h-screen bg-gray-700 p-8'>
      <h1 className='text-center text-3xl text-gray-200 mb-4'>
        Pagination Table
      </h1>

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
          {page.map((row) => {
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

      <span className='block text-center text-gray-400 mt-6'>
        Page {pageIndex + 1} of {pageOptions.length}
      </span>
      <div className='w-max mt-4 mx-auto flex items-center space-x-4'>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className='text-2xl text-gray-300 transition-all duration-200 ease-in hover:text-gray-200 disabled:text-gray-500'
        >
          <IoIcons.IoIosArrowDropleft />
        </button>
        <button
          disabled={!canNextPage}
          onClick={() => nextPage()}
          className='text-2xl text-gray-300 transition-all duration-200 ease-in hover:text-gray-200 disabled:text-gray-500'
        >
          <IoIcons.IoIosArrowDropright />
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;
