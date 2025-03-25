import CommentCard from './commentCard.jsx';
import { useState, useEffect } from 'react';
import PostCard from './postCard.jsx';
import { ChildrenCards } from './childrenCards.jsx';
import settings from "../../settings.json";

async function fetchCommentsFromPost(postid) {
  try {
    const response = await fetch(`${settings.REACT_APP_BACKEND_URI}/r/sub/comments/${postid}/`);
    const data = await response.json();

    if (Array.isArray(data.children)) {
      return data; // Ensure the result is an array
    } else {
      console.error('Unexpected response format:', data);
      return []; // Return empty array if data is not an array
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // Return empty array in case of an error
  }
}


// const posts = await fetchPosts();
// console.log(posts);

const CommentCards = ({ postid }) => {
  const [comments, setComments] = useState();
 const [post, setPost] = useState(null);
  const [items, setItems] = useState();
  const [children, setChildren] = useState(1);

  useEffect(() => {
    const temp = async () => {
        const postRes = await fetchCommentsFromPost(postid);
        setPost(postRes);
        setComments(postRes?.children);
        
        
    };
    temp();
  }, []);

  useEffect(() => {
    if (!comments)
      return;
    const func = async () => {
      setItems(await comments.map((item, index) => {

        return (
            <div>
                <CommentCard key={index} comment={item} />
                <div className = "pl-8">
                  <button onClick = "setChildren" className = "inline">fwascf</button>
                    {(children) ? (item.children && <ChildrenCards comments = {item.children} />) : ""}
                </div>
            </div>
            
        ) // Create an 'Item' component for each item
    
      }));
    }

    func();
  }, [comments]);

  

  return (

    <div>
        {post && (  <PostCard post = {post}/>)}
      
        {/* {console.log("i am here",post)}; */}
        {/* {post} */}
        {items}

    </div>

  );

};

export {CommentCards};
