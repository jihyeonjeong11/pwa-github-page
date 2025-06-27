import { useState, useCallback } from "react";
import {
  DEFAULTS_POSTS,
  generateMockPost,
  RedditPost,
  RedditPostType,
} from ".";
import useRenderTime from "./useRenderTime";

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
  const [actionDuration, setActionDuration] = useState<number>(0);
  useRenderTime(`object-${prevAction}`);

  const setNewPosts = (
    actionName: string,
    actionFn: () => RedditPostsObject
  ) => {
    const newPostsObject = actionFn();
    setPostsObject(newPostsObject);
    setPrevAction(`${actionName}`);
  };

  const handleAddPosts = (count: number, atRandomIndex: boolean) => {
    setNewPosts(`Added ${count} posts`, () => {
      const newPostsObjectToAdd: RedditPostsObject = {};
      for (let i = 0; i < count; i++) {
        const newPost = generateMockPost(
          `object-${Object.keys(postsObject).length + i}`
        );
        newPostsObjectToAdd[newPost.id] = newPost;
      }

      if (atRandomIndex) {
        const currentPostsArray = Object.values({ ...postsObject });
        const newPostsArrayToAdd = Object.values(newPostsObjectToAdd);

        newPostsArrayToAdd.forEach((p) => {
          const randomIndex = Math.floor(
            Math.random() * (currentPostsArray.length + 1)
          );
          currentPostsArray.splice(randomIndex, 0, p);
        });

        // Convert back to object
        return currentPostsArray.reduce<RedditPostsObject>((acc, post) => {
          acc[post.id] = post;
          return acc;
        }, {});
      } else {
        return { ...postsObject, ...newPostsObjectToAdd };
      }
    });
  };

  const handleRemovePosts = (count: number) => {
    setNewPosts(`Removed ${count} posts`, () => {
      const currentPostsObject = { ...postsObject };
      const currentPostIds = Object.keys(currentPostsObject);

      if (currentPostIds.length === 0) return currentPostsObject;

      if (count >= currentPostIds.length) {
        return {};
      }

      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * currentPostIds.length);
        const idToRemove = currentPostIds[randomIndex];
        delete currentPostsObject[idToRemove];
        currentPostIds.splice(randomIndex, 1);
      }
      return currentPostsObject;
    });
  };

  const consoleFunction = useCallback(() => {
    console.log("console");
  }, []);

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4 flex flex-col items-center overflow-y-scroll">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 mt-4">
        Reddit Feed Stress Test (Object Renderer)
      </h1>

      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-md mb-6 w-full max-w-2xl text-blue-800 dark:text-blue-200 text-center border border-blue-200 dark:border-blue-700">
        <p className="text-lg font-semibold">
          Current Posts:{" "}
          <span className="font-bold">{Object.keys(postsObject).length}</span>
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
          onClick={() => handleRemovePosts(Object.keys(postsObject).length)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          Clear All Posts
        </button>
      </div>

      <div className="w-full max-w-2xl">
        {Object.entries(postsObject).map(([key, post]) => (
          <RedditPost key={key} post={post} onClick={consoleFunction} />
        ))}
      </div>
    </div>
  );
};

export default ObjectRenderer;
