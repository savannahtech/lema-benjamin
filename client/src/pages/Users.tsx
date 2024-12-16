import { useEffect, useState } from 'react';
import { Loader, Pagination } from '../components';
import { useNavigate } from 'react-router-dom';
import { useUsers, useUsersCount } from '../hooks/useUsers';
import { UserType } from '../types/users';
import toast from 'react-hot-toast';

const Users = () => {
  const dataPerPage = 4;
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const urlPage = urlParams.get('page') || 1;
  const [currentPage, setCurrentPage] = useState(Number(urlPage));
  const {
    data: userCount,
    isError: isErrorCount,
    error: errorCount,
  } = useUsersCount();
  const {
    data: usersData,
    isLoading,
    isError: isErrorUsers,
    error: errorUsers,
  } = useUsers(currentPage - 1, dataPerPage);

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/users?page=${page}`);
  };

  useEffect(() => {
    if (isErrorCount || isErrorUsers) {
      const message = errorUsers?.message || errorCount?.message || '';
      toast.error(message);
    }
  }, [isErrorUsers, isErrorUsers]);

  return (
    <div className='flex flex-col items-center text-left  py-4 md:py-10'>
      <div className='space-y-6 '>
        <h1 className='text-black font-medium text-[60px]'>Users</h1>
        <div className='border rounded-lg w-[400px] sm:w-auto overflow-auto'>
          <table className='  text-xs text-[#535862] w-full '>
            <thead>
              <tr>
                <th className='px-[18px] md:px-6 py-3 font-normal  sm:w-[124px] max-w-[124px] md:w-[200px]'>
                  Full Name
                </th>
                <th className='px-[18px] md:px-6 py-3 font-normal  sm:w-[124px] md:w-[264px]'>
                  Email Address
                </th>
                <th className='px-[18px] md:px-6 py-3 font-normal w-[392px]'>
                  Address
                </th>
              </tr>
            </thead>

            <tbody>
              {!isLoading &&
                usersData &&
                usersData.map((item: UserType, index: number) => (
                  <tr
                    key={item.user_id}
                    className={`${
                      index !== usersData.length - 1 && 'border-b'
                    } cursor-pointer hover:bg-slate-50 `}
                    onClick={() =>
                      navigate(
                        `posts?userId=${item.user_id}&name=${item.name}&email=${item.email}`
                      )
                    }>
                    <td className='px-6 py-[26px] sm:w-[124px] sm:max-w-[124px] md:w-[200px] md:max-w-[200px] overflow-auto whitespace-nowrap text-ellipsis'>
                      {item.name}
                    </td>
                    <td className='px-6 py-[26px] sm:w-[124px] sm:max-w-[124px] md:w-[264px] md:max-w-[264px] overflow-auto text-ellipsis whitespace-nowrap'>
                      {item.email}
                    </td>
                    <td className='px-6 py-[26px] w-[392px] max-w-[392px]'>
                      <p className='text-ellipsis whitespace-nowrap overflow-auto '>
                        {item.address}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isLoading && (
            <div className='flex justify-center py-20 '>
              <Loader />
            </div>
          )}
        </div>

        <Pagination
          totalData={userCount?.count || 0}
          current={currentPage}
          onPageClick={handleOnPageChange}
          dataPerPage={dataPerPage}
        />
      </div>
    </div>
  );
};

export default Users;
