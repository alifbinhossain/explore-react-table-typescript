import React, { useMemo } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import mockup from '../../public/data.json';
import { COLUMNS } from '../columns/index';
import SearchInput from './SearchInput';

const FilteringTable: React.FC = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mockup, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <div className='min-h-screen max-w-screen overflow-x-hidden bg-gray-700 p-4 lg:p-8'>
      <h1 className='text-center text-3xl text-gray-200 mb-4'>
        Filtering Table
      </h1>

      <SearchInput filter={globalFilter} setFilter={setGlobalFilter} />

      <div className='overflow-x-auto'>
        <table className='sb' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
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
    </div>
  );
};

export default FilteringTable;
