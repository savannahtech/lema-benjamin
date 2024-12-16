import { useNavigate } from 'react-router-dom';
import { ArrowIcon } from '../assets';
import { Loader, NewPostCard, PostCard, PostFormModal } from '../components';
import { useFetchPosts } from '../hooks/usePosts';
import { PostType } from '../types/posts';
import { useState } from 'react';

interface FormStateType {
  isOpen: boolean;
  isEditting: boolean;
  initialData: PostType | null;
}

const UserPosts = () => {
  const navigate = useNavigate();
  const userId =
    new URLSearchParams(window.location.search).get('userId') || '';
  const name =
    new URLSearchParams(window.location.search).get('name') || 'No name';
  const email =
    new URLSearchParams(window.location.search).get('email') || 'No email';

  const { data, isLoading } = useFetchPosts(userId as string);
  const [openPostForm, setOpenPostForm] = useState<FormStateType>({
    isOpen: false,
    isEditting: false,
    initialData: null,
  });

  const handleEditPost = (post: PostType) => {
    setOpenPostForm({
      isOpen: true,
      isEditting: true,
      initialData: post,
    });
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <PostFormModal
        isOpen={openPostForm.isOpen}
        onClose={() =>
          setOpenPostForm({ ...openPostForm, isOpen: false, initialData: null })
        }
        isEditing={openPostForm.isEditting}
        initialData={openPostForm.initialData}
      />
      <div className='flex justify-center text-[#535862] py-4 md:py-10'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4  text-left'>
            <button
              className='flex gap-1 items-center text-sm font-semibold'
              onClick={() => navigate(-1)}>
              <img src={ArrowIcon} alt='back' />
              <span>Back to Users</span>
            </button>
            <h1 className='text-3xl font-medium text-black'>{name}</h1>
            <div className='text-sm'>
              <span>{email}</span>
              <span> &bull; </span>
              <span className='font-medium'>
                {data?.length || 0} Post{data?.length > 1 && 's'}
              </span>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-[23px] w-fit'>
            <NewPostCard
              onClick={() =>
                setOpenPostForm({
                  isOpen: true,
                  isEditting: false,
                  initialData: null,
                })
              }
            />
            {data?.map((item: PostType, index: number) => (
              <PostCard
                id={item.id as string}
                title={item.title}
                content={item.body}
                key={index}
                onEdit={() => handleEditPost(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPosts;
