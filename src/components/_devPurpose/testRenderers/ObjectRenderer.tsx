import { useCallback, useRef, useState } from "react";
import {
  DEFAULTS_POSTS,
  generateMockPost,
  RedditLikePost,
  RedditPostType,
} from ".";

type RedditPostsObject = {
  [key: string]: RedditPostType;
};

const ObjectRenderer = () => {
  const [postsObject, setPostsObject] = useState<RedditPostsObject>(
    DEFAULTS_POSTS.reduce<RedditPostsObject>((acc, post) => {
      acc[post.id] = post;
      return acc;
    }, {})
  );
  const [prevAction, setPrevAction] = useState<string>("None");
  const idCount = useRef(0);

  const setNewPosts = (
    actionName: string,
    actionFn: () => RedditPostsObject
  ) => {
    const newPostsObject = actionFn();
    setPostsObject(newPostsObject);
    setPrevAction(`${actionName}`);
  };

  const handleAddPostsToHead = (count: number) => {
    setNewPosts(`Added ${count} posts to head`, () => {
      const newPostsArray: RedditPostType[] = [];
      console.time("object-add");
      for (let i = 0; i < count; i++) {
        const id = idCount.current++;
        const post = generateMockPost(`object-${id}`);
        newPostsArray.unshift(post);
      }
      console.timeEnd("object-add");
      console.time("object-merge");
      const currentPosts = Object.values(postsObject);
      const mergedArray = [...newPostsArray, ...currentPosts];
      const merged = mergedArray.reduce<RedditPostsObject>((acc, post) => {
        acc[post.id] = post;
        return acc;
      }, {});
      console.timeEnd("object-merge");

      return merged;
    });
  };

  const handleRemoveRandomPosts = (count: number) => {
    setNewPosts(`Removed ${count} random posts`, () => {
      const currentPostIds = Object.keys(postsObject);
      const current = { ...postsObject };
      for (let i = 0; i < count && currentPostIds.length > 0; i++) {
        const randIndex = Math.floor(Math.random() * currentPostIds.length);
        const idToRemove = currentPostIds[randIndex];
        delete current[idToRemove];
        currentPostIds.splice(randIndex, 1);
      }
      return current;
    });
  };

  const consoleFunction = useCallback(() => {
    console.log("console");
  }, []);

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4 flex flex-col items-center overflow-y-scroll">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 mt-4">
        Object feed performance tester
      </h1>

      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-md mb-6 w-full max-w-2xl text-blue-800 dark:text-blue-200 text-center border border-blue-200 dark:border-blue-700">
        <p className="text-lg font-semibold">
          Current Posts:{" "}
          <span className="font-bold">{Object.keys(postsObject).length}</span>
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
        <button
          onClick={() =>
            handleRemoveRandomPosts(Object.keys(postsObject).length)
          }
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Clear All Posts
        </button>
      </div>

      <div className="w-full max-w-2xl">
        {Object.entries(postsObject)
          .sort(([, a], [, b]) => b.createdAt.getTime() - a.createdAt.getTime())
          .map(([key, post]) => (
            <RedditLikePost key={key} post={post} onClick={consoleFunction} />
          ))}
      </div>
    </div>
  );
};

export default ObjectRenderer;
