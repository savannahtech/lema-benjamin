import { AddIcon } from '../assets';

interface PostCardType {
  onClick: () => void;
}

const NewPostCard = ({ onClick }: PostCardType) => {
  return (
    <div
      className='flex flex-col items-center justify-center gap-2 bg-white border border-dashed border-[#D5D7DA] text-[#535862] rounded-lg cursor-pointer py-24 w-[270px] h-[293px]'
      onClick={onClick}>
      <img src={AddIcon} alt='add' width={24} height={24} />
      <span className='text-sm font-semibold'>New Post</span>
    </div>
  );
};

export default NewPostCard;
