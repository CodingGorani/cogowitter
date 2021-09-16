import React, { useEffect, useState } from 'react';
import { Span } from './atoms/Typo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { doc, updateDoc } from '@firebase/firestore';
import { cogowitCollection } from 'fbInstance';
import { Button } from './atoms/Button';
import { FlexBox } from './atoms/Container';

function Like({ userObj, cogowitObj }) {
  const [like, setLike] = useState(cogowitObj.like);
  const [youLike, setYouLike] = useState(() => {
    if (cogowitObj.liker) {
      return cogowitObj.liker.hasOwnProperty(userObj.uid);
    }
    return false;
  });

  const handleLikeClick = async () => {
    const newLiker = { ...cogowitObj.liker };
    if (youLike) {
      delete newLiker[userObj.uid];
      try {
        await updateDoc(doc(cogowitCollection, '/', cogowitObj.id), {
          like: like - 1,
          liker: newLiker,
        });
        setLike((prev) => prev - 1);
        setYouLike(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      newLiker[userObj.uid] = true;
      try {
        await updateDoc(doc(cogowitCollection, '/', cogowitObj.id), {
          like: like + 1,
          liker: newLiker,
        });
        setLike((prev) => prev + 1);
        setYouLike(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FlexBox right>
      <Button
        margin="0.5em 1em"
        type="button"
        onClick={handleLikeClick}
        value={youLike}
      >
        {youLike ? (
          <FontAwesomeIcon icon={fasHeart} />
        ) : (
          <FontAwesomeIcon icon={farHeart} />
        )}
      </Button>
      <Span lineHeight="3em">좋아요 {like || 0}개 </Span>
    </FlexBox>
  );
}

export default Like;
