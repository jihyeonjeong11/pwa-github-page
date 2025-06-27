import { useCallback, useState } from "react";
import {
  DEFAULTS_POSTS,
  generateMockPost,
  RedditPost,
  RedditPostType,
} from ".";
import useRenderTime from "./useRenderTime";

const ArrayRenderer = () => {
  const [posts, setPosts] = useState<RedditPostType[]>(DEFAULTS_POSTS);
  const [prevAction, setPrevAction] = useState<string>("None");
  const [actionDuration, setActionDuration] = useState<number>(0);
  useRenderTime(`array-${prevAction}`);
  // todo: useRef id카운터

  const setNewPosts = (
    actionName: string,
    actionFn: () => RedditPostType[]
  ) => {
    const newList = actionFn();
    setPosts(newList);
    setPrevAction(`${actionName}`);
  };

  const handleAddPosts = (count: number, atRandomIndex: boolean) => {
    setNewPosts(`Added ${count} posts`, () => {
      const newPostsToAdd: RedditPostType[] = [];
      for (let i = 0; i < count; i++) {
        newPostsToAdd.push(generateMockPost(`array-${posts.length + i}`));
      }

      let currentPosts = [...posts];
      if (atRandomIndex) {
        newPostsToAdd.forEach((p) => {
          const randomIndex = Math.floor(
            Math.random() * (currentPosts.length + 1)
          );
          currentPosts.splice(randomIndex, 0, p);
        });
      } else {
        currentPosts = [...currentPosts, ...newPostsToAdd];
      }
      return currentPosts;
    });
  };

  const handleRemovePosts = (count: number) => {
    setNewPosts(`Removed ${count} posts`, () => {
      const currentPosts = [...posts];

      if (currentPosts.length === 0) return currentPosts;

      if (count >= currentPosts.length) {
        return [];
      }

      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * currentPosts.length);
        currentPosts.splice(randomIndex, 1);
      }
      return currentPosts;
    });
  };

  const consoleFunction = useCallback(() => {
    console.log("consoleFunction");
  }, []);

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4 flex flex-col items-center overflow-y-scroll">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 mt-4">
        Reddit Feed Stress Test (Array Renderer)
      </h1>
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-md mb-6 w-full max-w-2xl text-blue-800 dark:text-blue-200 text-center border border-blue-200 dark:border-blue-700">
        <p className="text-lg font-semibold">
          Current Posts: <span className="font-bold">{posts.length}</span>
        </p>
        <p className="text-sm">
          Last Action: <span className="font-medium">{prevAction}</span>
        </p>
        <p className="text-sm">
          Duration:{" "}
          <span className="font-medium">{actionDuration.toFixed(3)} ms</span>
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8 w-full max-w-2xl flex flex-wrap justify-center gap-4 border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => handleAddPosts(100, false)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Add 100 Posts (End)
        </button>
        <button
          onClick={() => handleAddPosts(10, true)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
        >
          Add 10 Posts (Random)
        </button>
        <button
          onClick={() => handleRemovePosts(1)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Remove 1 Post (Random)
        </button>
        <button
          onClick={() => handleRemovePosts(10)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        >
          Remove 10 Posts (Random)
        </button>
        <button
          onClick={() => handleRemovePosts(posts.length)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          Clear All Posts
        </button>
      </div>

      <div className="w-full max-w-2xl">
        {posts.map((post) => (
          <RedditPost key={post.id} post={post} onClick={consoleFunction} />
        ))}
      </div>
    </div>
  );
};

export default ArrayRenderer;
