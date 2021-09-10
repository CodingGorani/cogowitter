import React, { useState } from 'react';
import { firestore } from 'fbInstance';
import { addDoc, collection } from 'firebase/firestore';
import { FlexBox, Container } from './atoms/Container';
import { Input } from './atoms/Input';
import { Button } from './atoms/Button';

function CommentsForm({ userObj, cogowitObj }) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      return;
    }
    const commentObj = {
      text: comment,
      createdAt: new Date(),
      creatorId: userObj.uid,
      creator: userObj.displayName,
    };
    try {
      await addDoc(
        collection(firestore, `/cogowit/${cogowitObj.id}/comments`),
        commentObj
      );
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container wrapper as="form" onSubmit={handleCommentSubmit}>
      <Input
        withButton
        type="text"
        value={comment}
        onChange={handleCommentChange}
        placeholder="댓글을 입력하세요"
      />
      <Button
        relative
        top="4px"
        left="-40px"
        noShadow
        as="input"
        type="submit"
        value="게시"
      />
    </Container>
  );
}

export default CommentsForm;
