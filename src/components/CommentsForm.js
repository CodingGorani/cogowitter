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
    <FlexBox
      direction="row"
      wrapper
      margin="1em 0"
      as="form"
      onSubmit={handleCommentSubmit}
    >
      <Input
        withButton
        borderRadius="1em 0 0 1em"
        type="text"
        value={comment}
        onChange={handleCommentChange}
        placeholder="댓글을 입력하세요"
      />
      <Button
        primary
        noShadow
        margin="0"
        borderRadius="0 1em 1em 0"
        as="input"
        type="submit"
        value="게시"
      />
    </FlexBox>
  );
}

export default CommentsForm;
