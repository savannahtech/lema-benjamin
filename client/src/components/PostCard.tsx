import { DeleteIcon } from '../assets';
import { useDeletePost } from '../hooks/usePosts';

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  onEdit?: () => void;
}

const PostCard = ({ id, title, content, onEdit }: PostCardProps) => {
  const { mutate: deletePost } = useDeletePost();

  return (
    <div
      className='relative flex flex-col gap-4 p-3 sm:p-6 rounded-lg bg-white border border-[#D5D7DA] text-[#535862] text-left cursor-pointer w-[270px] h-[293px]'
      onClick={onEdit}>
      <div className='absolute top-1 right-1 flex gap-2'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deletePost(id);
          }}>
          <img src={DeleteIcon} alt='delete' />
        </button>
      </div>
      <h1 className='text-lg font-medium line-clamp-2 break-all pr-[21px]'>
        {title}
      </h1>
      <p className='text-sm leading-normal line-clamp-[8] break-all'>
        {content}
      </p>
    </div>
  );
};

export default PostCard;
