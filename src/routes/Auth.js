import { useState } from 'react';

import SignForm from 'components/SignForm';
import SocialSignIn from 'components/SocialSignIn';
import { FlexBox } from 'components/atoms/Container';
import { H1 } from 'components/atoms/Typo';

function Auth() {
  return (
    <FlexBox wrapper>
      <FlexBox middle direction="column">
        <H1>Auth</H1>
        <SignForm />
        <SocialSignIn />
      </FlexBox>
    </FlexBox>
  );
}

export default Auth;
