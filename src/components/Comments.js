import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from '@firebase/firestore';
import { firestore } from 'fbInstance';
import Comment from './Comment';
import { Span } from './atoms/Typo';

function Comments({ cogowitObj }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const listener = onSnapshot(
      collection(firestore, `/cogowit/${cogowitObj.id}/comments`),
      {
        next: (snapshot) => {
          const commentArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(commentArray);
          setComments(commentArray);
        },
        error: (error) => {
          console.log(error);
        },
      }
    );

    return () => {
      listener();
    };
  }, []);

  return (
    <>
      <Span fontSize="large" bold align="left">
        댓글 {comments.length}개
      </Span>
      {comments.map((comment) => {
        return <Comment key={comment.id} commentObj={comment} />;
      })}
    </>
  );
}

export default Comments;

//
