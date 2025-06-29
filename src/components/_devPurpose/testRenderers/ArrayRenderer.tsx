import { useCallback, useRef, useState } from "react";
import {
  DEFAULTS_POSTS,
  generateMockPost,
  RedditLikePost,
  RedditPostType,
} from ".";

const ArrayRenderer = () => {
  const [posts, setPosts] = useState<RedditPostType[]>(DEFAULTS_POSTS);
  const [prevAction, setPrevAction] = useState<string>("None");
  const idCount = useRef(0);

  const setNewPosts = (
    actionName: string,
    actionFn: () => RedditPostType[]
  ) => {
    const newList = actionFn();
    setPosts(newList);
    setPrevAction(`${actionName}`);
  };

  const handleAddPostsToHead = (count: number) => {
    setNewPosts(`Added ${count} posts to head`, () => {
      const newPostsToAdd: RedditPostType[] = [];
      console.time("unshift");
      for (let i = 0; i < count; i++) {
        const nextId = idCount.current++;
        newPostsToAdd.unshift(generateMockPost(`array-${nextId}`));
      }
      console.timeEnd("unshift");
      console.time("merge");
      const merged = [...newPostsToAdd, ...posts];
      console.timeEnd("merge");
      return merged;
    });
  };

  const handleRemoveRandomPosts = (count: number) => {
    setNewPosts(`Removed ${count} random posts`, () => {
      const currentPosts = [...posts];
      for (let i = 0; i < count && currentPosts.length > 0; i++) {
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
        Array feed Performance tester
      </h1>
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-md mb-6 w-full max-w-2xl text-blue-800 dark:text-blue-200 text-center border border-blue-200 dark:border-blue-700">
        <p className="text-lg font-semibold">
          Current Posts: <span className="font-bold">{posts.length}</span>
        </p>
        <p className="text-sm">
          Last Action: <span className="font-medium">{prevAction}</span>
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8 w-full max-w-2xl flex flex-wrap justify-center gap-4 border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => handleAddPostsToHead(10)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add 10 Posts (Head)
        </button>
        <button
          onClick={() => handleAddPostsToHead(1000)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add 1000 Posts (Head)
        </button>
        <button
          onClick={() => handleRemoveRandomPosts(1)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Remove 1 Post (Random)
        </button>
        <button
          onClick={() => handleRemoveRandomPosts(10)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Remove 10 Posts (Random)
        </button>
      </div>

      <div className="w-full max-w-2xl">
        {posts.map((post) => (
          <RedditLikePost key={post.id} post={post} onClick={consoleFunction} />
        ))}
      </div>
    </div>
  );
};

export default ArrayRenderer;
