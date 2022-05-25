import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import mockup from '../../public/data-2.json';
import { COLUMNS } from '../columns/index';
import * as CgIcons from 'react-icons/cg';

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
    gotoPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    pageCount,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const { pageIndex, pageSize } = state;

  console.log(pageCount);

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

      <div className='mt-6 flex justify-center items-center space-x-6'>
        <span className='block text-center text-gray-400'>
          Page {pageIndex + 1} of {pageCount}
        </span>
        <select
          defaultValue={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className='bg-gray-400 py-2 px-4 text-gray-800'
        >
          {[5, 10, 20, 50].map((number, index) => (
            <option key={index} value={number}>
              Show - {number}
            </option>
          ))}
        </select>
      </div>
      <div className='w-max mt-4 mx-auto flex items-center space-x-4'>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className='text-2xl text-gray-300 transition-all duration-200 ease-in hover:text-gray-200 disabled:text-gray-500'
        >
          <CgIcons.CgChevronDoubleLeft />
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className='text-2xl text-gray-300 transition-all duration-200 ease-in hover:text-gray-200 disabled:text-gray-500'
        >
          <CgIcons.CgChevronLeft />
        </button>
        <button
          disabled={!canNextPage}
          onClick={() => nextPage()}
          className='text-2xl text-gray-300 transition-all duration-200 ease-in hover:text-gray-200 disabled:text-gray-500'
        >
          <CgIcons.CgChevronRight />
        </button>
        <button
          disabled={!canNextPage}
          onClick={() => gotoPage(pageCount - 1)}
          className='text-2xl text-gray-300 transition-all duration-200 ease-in hover:text-gray-200 disabled:text-gray-500'
        >
          <CgIcons.CgChevronDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;
