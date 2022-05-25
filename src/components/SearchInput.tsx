import { useRef, useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { FcSearch } from 'react-icons/fc';

const SearchInput: React.FC<{
  filter: string;
  setFilter: Function;
}> = ({ filter, setFilter }) => {
  //   const inputRef = useRef(null);
  const [value, setValue] = useState(filter);
  const handleOnChange = useAsyncDebounce((value) => setFilter(value), 500);

  return (
    <div className=' mx-auto mb-6 px-4  py-3 rounded-[100px] overflow-hidden flex items-center bg-gray-200 w-max'>
      <input
        // ref={inputRef}
        className=' text-center border-none focus:outline-none bg-transparent text-gray-800 placeholder:text-gray-500'
        placeholder='Search by words'
        type='text'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          handleOnChange(e.target.value);
        }}
        // onChange={(e) => setFilter(e.target.value)}
      />

      {/* <button onClick={() => setFilter(inputRef.current.value)}>
        <FcSearch className='text-2xl ' />
      </button> */}
    </div>
  );
};

export default SearchInput;
