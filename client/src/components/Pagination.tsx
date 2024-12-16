import { ArrowIcon } from '../assets';

interface PaginationType {
  totalData: number;
  current: number;
  dataPerPage?: number;
  onPageClick: (page: number) => void;
}

const Pagination = ({
  totalData,
  current,
  dataPerPage,
  onPageClick,
}: PaginationType) => {
  const end = Math.ceil(totalData / (dataPerPage || 10));

  const getPageNumbers = () => {
    if (end <= 7) {
      const numbers = [];
      for (let i = 1; i <= end; i++) {
        numbers.push(i);
      }
      return numbers;
    }

    if (current <= 2 || current >= end - 1) {
      return [1, 2, 3, '...', end - 2, end - 1, end];
    } else if (current === end - 2) {
      return [1, '...', end - 4, end - 3, end - 2, end - 1, end];
    } else if (current === 3) {
      return [1, 2, 3, 4, 5, '...', end];
    } else if (current === end - 3) {
      return [1, '...', end - 4, end - 3, end - 2, end - 1, end];
    } else {
      return [1, '...', current - 1, current, current + 1, '...', end];
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className='flex justify-end flex-wrap items-center gap-[42px] sm:gap-10 text-xs font-medium sm:text-sm'
      role='navigation'>
      <button
        className={`flex gap-1 sm:gap-2 font-semibold ${
          current <= 1 ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={current <= 1}
        onClick={() => onPageClick(current - 1)}>
        <img src={ArrowIcon} alt='previous' className='w-4 sm:w-5' />
        <span className='hidden sm:inline'>Previous</span>
      </button>
      <div className='space-x-[2px] sm:space-x-1'>
        {(pageNumbers.length ? pageNumbers : [1]).map((val, i: number) => (
          <button
            key={i}
            className={`${
              val == current && 'bg-[#F9F5FF] rounded-lg text-[#7F56D9]'
            } w-8 sm:w-10 h-8 sm:h-10`}
            disabled={val == current || val == '...'}
            onClick={() => onPageClick(val as number)}>
            {val}
          </button>
        ))}
      </div>
      <button
        className={`flex gap-1 sm:gap-2 font-semibold ${
          current >= end ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={current >= end}
        onClick={() => onPageClick(current + 1)}>
        <span className='hidden sm:inline'>Next</span>
        <img src={ArrowIcon} alt='next' className='rotate-180 w-4 sm:w-5' />
      </button>
    </div>
  );
};

export default Pagination;
