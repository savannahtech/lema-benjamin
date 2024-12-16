import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import PostFormModal from '../components/PostFormModal';
import { useAddPost, useUpdatePost } from '../hooks/usePosts';
import { useLocation } from 'react-router-dom';

// Mock the hooks
jest.mock('../hooks/usePosts', () => ({
  useAddPost: jest.fn(),
  useUpdatePost: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

const mockWindowLocation = {
  search: '?userId=1',
};

Object.defineProperty(window, 'location', {
  value: mockWindowLocation,
  writable: true,
});

describe('PostFormModal Component', () => {
  const mockOnClose = jest.fn();
  const mockAddPost = jest.fn();
  const mockUpdatePost = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAddPost as jest.Mock).mockReturnValue({
      mutate: mockAddPost,
      isPending: false,
    });

    (useUpdatePost as jest.Mock).mockReturnValue({
      mutate: mockUpdatePost,
      isPending: false,
    });

    (useLocation as jest.Mock).mockReturnValue({
      state: { post: null },
    });
  });

  it('should not render when isOpen is false', () => {
    render(<PostFormModal isOpen={false} onClose={mockOnClose} />);

    const modalTitle = screen.queryByText('New Post');
    expect(modalTitle).not.toBeInTheDocument();
  });

  it('should render new post form when isOpen is true', () => {
    render(<PostFormModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('New Post')).toBeInTheDocument();
    expect(screen.getByLabelText('Post title')).toBeInTheDocument();
    expect(screen.getByLabelText('Post content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Publish' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('should render edit form with initial data', () => {
    const initialData = {
      id: '1',
      title: 'Test Title',
      body: 'Test Content',
      userId: '1',
    };

    render(
      <PostFormModal
        isOpen={true}
        onClose={mockOnClose}
        initialData={initialData}
        isEditing={true}
      />
    );

    expect(screen.getByText('Edit Post')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });

  it('should show validation errors for empty form submission', async () => {
    render(<PostFormModal isOpen={true} onClose={mockOnClose} />);

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    if (form) {
      await act(async () => {
        fireEvent.submit(form);
      });
    }

    await waitFor(() => {
      expect(
        screen.getByText('Title must be at least 3 characters long')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Content must be at least 10 characters long')
      ).toBeInTheDocument();
    });
  });

  it('should show validation error for short title', async () => {
    render(<PostFormModal isOpen={true} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText('Post title');

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'ab' } });
      fireEvent.blur(titleInput);
    });

    const form = screen.getByRole('form');
    if (form) {
      await act(async () => {
        fireEvent.submit(form);
      });
    }

    await waitFor(() => {
      expect(
        screen.getByText('Title must be at least 3 characters long')
      ).toBeInTheDocument();
    });
  });

  it('should show validation error for short content', async () => {
    render(<PostFormModal isOpen={true} onClose={mockOnClose} />);

    const contentInput = screen.getByLabelText('Post content');

    await act(async () => {
      fireEvent.change(contentInput, { target: { value: 'short' } });
      fireEvent.blur(contentInput);
    });

    const form = screen.getByRole('form');
    if (form) {
      await act(async () => {
        fireEvent.submit(form);
      });
    }

    await waitFor(() => {
      expect(
        screen.getByText('Content must be at least 10 characters long')
      ).toBeInTheDocument();
    });
  });

  it('should submit new post successfully', async () => {
    render(<PostFormModal isOpen={true} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText('Post title');
    const contentInput = screen.getByLabelText('Post content');

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'New Test Title' } });
      fireEvent.blur(titleInput);
    });

    await act(async () => {
      fireEvent.change(contentInput, {
        target: { value: 'New Test Content Long Enough' },
      });
      fireEvent.blur(contentInput);
    });

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    if (form) {
      await act(async () => {
        fireEvent.submit(form);
      });
    }

    await waitFor(() => {
      expect(mockAddPost).toHaveBeenCalledWith(
        {
          title: 'New Test Title',
          body: 'New Test Content Long Enough',
          userId: '1',
        },
        expect.any(Object)
      );
    });
  });

  it('should update existing post successfully', async () => {
    const initialData = {
      id: '1',
      title: 'Original Title',
      body: 'Original Content',
      userId: '1',
    };

    render(
      <PostFormModal
        isOpen={true}
        onClose={mockOnClose}
        initialData={initialData}
        isEditing={true}
      />
    );

    const titleInput = screen.getByLabelText('Post title');
    const contentInput = screen.getByLabelText('Post content');

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
      fireEvent.blur(titleInput);
    });

    await act(async () => {
      fireEvent.change(contentInput, {
        target: { value: 'Updated Content Long Enough' },
      });
      fireEvent.blur(contentInput);
    });

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    if (form) {
      await act(async () => {
        fireEvent.submit(form);
      });
    }

    await waitFor(() => {
      expect(mockUpdatePost).toHaveBeenCalledWith(
        {
          postId: '1',
          post: {
            title: 'Updated Title',
            body: 'Updated Content Long Enough',
            userId: '1',
          },
        },
        expect.any(Object)
      );
    });
  });

  it('should close modal when clicking cancel button', () => {
    render(<PostFormModal isOpen={true} onClose={mockOnClose} />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should close modal when clicking outside', () => {
    const { container } = render(
      <PostFormModal isOpen={true} onClose={mockOnClose} />
    );

    const modalBackdrop = container.firstChild as HTMLElement;
    expect(modalBackdrop).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'fixed',
      'inset-0',
      'bg-black',
      'bg-opacity-30',
      'z-10'
    );

    fireEvent.click(modalBackdrop);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should disable form controls during submission', async () => {
    (useAddPost as jest.Mock).mockReturnValue({
      mutate: mockAddPost,
      isPending: true,
    });

    render(<PostFormModal isOpen={true} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText('Post title');
    const contentInput = screen.getByLabelText('Post content');
    const submitButton = screen.getByRole('button', { name: 'Publish' });

    expect(titleInput).toBeDisabled();
    expect(contentInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it('should clear form when modal is closed and reopened', () => {
    const { rerender } = render(
      <PostFormModal isOpen={true} onClose={mockOnClose} />
    );

    const titleInput = screen.getByLabelText('Post title');
    const contentInput = screen.getByLabelText('Post content');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });

    rerender(<PostFormModal isOpen={false} onClose={mockOnClose} />);
    rerender(<PostFormModal isOpen={true} onClose={mockOnClose} />);

    const newTitleInput = screen.getByLabelText('Post title');
    const newContentInput = screen.getByLabelText('Post content');

    expect(newTitleInput).toHaveValue('');
    expect(newContentInput).toHaveValue('');
  });
});
