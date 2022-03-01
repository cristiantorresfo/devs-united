import { useContext } from "react";
import { PostsContext } from "../contexts/PostsContext";
import { deletePost } from "../firebase";

 export function useDeletePost(){
    const { posts, setPosts } = useContext(PostsContext);

    const handlerDelete = (e) => {
        window.confirm("Are you sure you want to delete this post?") && 
        deletePost(e.target.id).then((id) => {
          const newPosts = posts.filter((post) => {
            return post.id !== id;
          });
          setPosts(newPosts);
        });
      };

      return handlerDelete;
 }