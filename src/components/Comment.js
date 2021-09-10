import React from 'react';
import { FlexBox } from './atoms/Container';
import { Span } from './atoms/Typo';

function Comment({ commentObj }) {
  const { text, creator, createdAt } = commentObj;
  const date = createdAt.toDate().toString().split(' ', 5).join(' ');
  return (
    <FlexBox styled>
      <FlexBox right>
        <Span fontSize="x-small" margin="0 0.5em">
          {date}
        </Span>
      </FlexBox>
      <FlexBox>
        <Span margin="0 0.5em">{creator}</Span>
        <Span margin="0 0.5em">{text}</Span>
      </FlexBox>
    </FlexBox>
  );
}

export default Comment;
