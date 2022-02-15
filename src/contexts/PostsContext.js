import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map(
        (doc) => {
          return {
            message: doc.data().message,
            id: doc.id,
            fav: doc.data().fav,
            likes: doc.data().likes,
            autor: doc.data().autor,
            email: doc.data().email,
            uid: doc.data().uid,
            date: doc.data().date,
            dateUNIX: doc.data().dateUNIX,
          };
        },
        (error) => {
          console.log(error, "error de escucha");
        }
      );
      setPosts(postsData);
      setIsLoading(false)
    });

    return () => {
      unsub();
    };
  }, [setPosts]);
  
  return (
    <PostsContext.Provider value={{ posts, setPosts, isLoading, setIsLoading }}>
      {children}
    </PostsContext.Provider>
  );
};