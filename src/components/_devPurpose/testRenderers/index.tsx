// goal: Object.entries로 렌더 시 퍼포먼스의 차이를 확인하기 위함.

import { memo } from "react";
import ArrayRenderer from "./ArrayRenderer";
import ObjectRenderer from "./ObjectRenderer";

export type RedditPostType = {
  id: string;
  title: string;
  content: string | null;
  imageUrl: string | null;
  author: string;
  subreddit: string;
  upvotes: string;
  comments: string;
  createdAt: Date;
};

export const ArrowUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-arrow-up"
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

export const MessageCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucude-message-circle"
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULTS_POSTS = [
  {
    id: "1",
    title: "Excited about the new AI models!",
    content:
      "Just saw the latest advancements in language models and image generation. The future is here!",
    author: "AIEnthusiast",
    subreddit: "ArtificialIntelligence",
    upvotes: "1.2k",
    comments: "234",
    imageUrl: "https://placehold.co/600x300/a0aec0/ffffff?text=AI+Models",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Beautiful sunset over the mountains",
    content:
      "Caught this stunning view on my evening hike today. Nature never ceases to amaze me.",
    author: "MountainExplorer",
    subreddit: "NaturePhotography",
    upvotes: "5.8k",
    comments: "789",
    imageUrl: "https://placehold.co/600x300/fbd38d/ffffff?text=Sunset+View",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "What are your favorite productivity hacks?",
    content:
      "Looking for tips to stay productive while working from home. Share your secrets!",
    author: "ProductivityGuru",
    subreddit: "LifeHacks",
    upvotes: "890",
    comments: "150",
    imageUrl: null,
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "React Hooks: A deep dive into useEffect",
    content:
      "Exploring the ins and outs of the useEffect hook for side effects in functional components. Any advanced patterns you recommend?",
    author: "CodeWizard",
    subreddit: "reactjs",
    upvotes: "3.1k",
    comments: "400",
    imageUrl: "https://placehold.co/600x300/667eea/ffffff?text=React+Hooks",
    createdAt: new Date(),
  },
];

export const RedditLikePost = memo(
  ({ post, onClick }: { post: RedditPostType; onClick: () => void }) => {
    const { title, content, imageUrl, author, subreddit, upvotes, comments } =
      post;

    return (
      <div
        onClick={onClick}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden mb-6 mx-auto w-full max-w-2xl border border-gray-200 dark:border-gray-700"
      >
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={`https://placehold.co/40x40/cbd5e1/4a5568?text=${subreddit[0]}`}
              alt={`${subreddit} icon`}
              className="w-10 h-10 rounded-full mr-3 border border-gray-300 dark:border-gray-600"
              onError={(e) => {
                if (e.target instanceof Image) {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/40x40/cbd5e1/4a5568?text=R";
                }
              }}
            />
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                r/{subreddit}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Posted by u/{author}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          {content && (
            <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
              {content}
            </p>
          )}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Post image"
              className="w-full h-auto rounded-lg mb-4 object-cover"
              onError={(e) => {
                if (e.target instanceof Image) {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x300/a0aec0/2d3748?text=Image+Not+Available";
                }
              }}
            />
          )}
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex items-center justify-start space-x-6">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <ArrowUpIcon />
            <span className="font-medium text-sm">{upvotes}</span>
            <span className="ml-1 text-xs">Upvotes</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MessageCircleIcon />
            <span className="font-medium text-sm">{comments}</span>
            <span className="ml-1 text-xs">Comments</span>
          </div>
        </div>
      </div>
    );
  }
);

// eslint-disable-next-line react-refresh/only-export-components
export const generateMockPost = (id: string): RedditPostType => {
  return {
    id: id,
    title: `Stress Test Post ${id}`,
    content: `This is a dynamically generated post for stress testing. Sequence: ${id}`,
    author: `TesterBot${Math.floor(Math.random() * 100)}`,
    subreddit: `TestSub${Math.floor(Math.random() * 10)}`,
    upvotes: `${Math.floor(Math.random() * 1000) + 10}k`,
    comments: `${Math.floor(Math.random() * 500) + 10}`,
    imageUrl:
      Math.random() > 0.5
        ? `https://placehold.co/600x300/${Math.floor(
            Math.random() * 16777215
          ).toString(16)}/ffffff?text=Generated+Post+${id}`
        : null,
    createdAt: new Date(),
  };
};

function TestRenderers() {
  return (
    <div className="flex">
      <ObjectRenderer />
      <ArrayRenderer />
    </div>
  );
}

export default TestRenderers;
