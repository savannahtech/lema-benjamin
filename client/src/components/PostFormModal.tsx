import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '../components';
import { useAddPost, useUpdatePost } from '../hooks/usePosts';
import { PostType } from '../types/posts';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  body: z.string().min(10, 'Content must be at least 10 characters long'),
});

type PostFormInputs = z.infer<typeof postSchema>;

interface PostFormProps {
  initialData?: PostType | null;
  isEditing?: boolean;
  onClose: () => void;
  isOpen: boolean;
}

const PostFormModal = ({
  initialData,
  isEditing = false,
  isOpen,
  onClose,
}: PostFormProps) => {
  const userId =
    new URLSearchParams(window.location.search).get('userId') || '';
  const { mutate: addPost, isPending: isAddingPost } = useAddPost();
  const { mutate: updatePost, isPending: isUpdatingPost } = useUpdatePost();
  const location = useLocation();
  const postToEdit = location.state?.post;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<PostFormInputs>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: postToEdit?.title || initialData?.title || '',
      body: postToEdit?.body || initialData?.body || '',
    },
  });

  const [formData, setFormData] = useState<PostFormInputs>({
    title: postToEdit?.title || initialData?.title || '',
    body: postToEdit?.body || initialData?.body || '',
  });

  useEffect(() => {
    if (postToEdit || initialData) {
      const data = postToEdit || initialData;
      setFormData({
        title: data.title,
        body: data.body,
      });
      reset({
        title: data.title,
        body: data.body,
      });
    }
  }, [postToEdit, initialData, reset]);

  const resetForm = () => {
    setFormData({
      title: '',
      body: '',
    });
    reset({
      title: '',
      body: '',
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const isPending = isAddingPost || isUpdatingPost;

  const onSubmit = async (data: PostFormInputs) => {
    const requestData: PostType = {
      ...data,
      userId,
    };

    if (isEditing && (postToEdit?.id || initialData?.id)) {
      const postId = postToEdit?.id || initialData?.id;
      updatePost(
        { postId, post: requestData },
        {
          onSuccess: () => {
            handleClose();
          },
        }
      );
    } else {
      addPost(requestData, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

  return (
    <div
      className='flex items-center justify-center fixed inset-0 bg-black bg-opacity-30 z-10'
      onClick={handleClose}>
      <div
        className='bg-white rounded-lg shadow-lg p-6 w-[679px]'
        onClick={(e) => e.stopPropagation()}>
        <div className='space-y-6 text-left'>
          <h1 className='text-black text-3xl font-medium'>
            {isEditing ? 'Edit Post' : 'New Post'}
          </h1>
          <form
            className='space-y-6 text-sm'
            role='form'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-[10px]'>
              <label htmlFor='title' className='text-lg font-medium'>
                Post title
              </label>
              <input
                id='title'
                type='text'
                className='rounded'
                {...register('title')}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  clearErrors('title');
                }}
                disabled={isPending}
                value={formData.title}
                placeholder='Give your post a title'
              />
              {errors.title && (
                <p className='text-red-500 text-xs'>{errors.title.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-[10px]'>
              <label htmlFor='content' className='text-lg font-medium'>
                Post content
              </label>
              <textarea
                id='content'
                className='min-h-[179px] resize-none rounded'
                {...register('body')}
                onChange={(e) => {
                  setFormData({ ...formData, body: e.target.value });
                  clearErrors('body');
                }}
                disabled={isPending}
                value={formData.body}
                placeholder='Write something mind-blowing'
              />
              {errors.body && (
                <p className='text-red-500 text-xs'>{errors.body.message}</p>
              )}
            </div>

            <div className='flex justify-end gap-2 text-sm'>
              <button
                className='px-4 py-[11.5px] rounded-md border'
                disabled={isPending}
                type='button'
                onClick={handleClose}>
                Cancel
              </button>
              <button
                className='flex items-center gap-2 px-4 py-[9.5px] rounded-md bg-[#334155] text-white font-semibold font-manrope'
                disabled={isPending}
                type='submit'>
                <span>{isEditing ? 'Update' : 'Publish'}</span>
                {isPending && <Loader type='small' />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostFormModal;
