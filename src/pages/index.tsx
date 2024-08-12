import React, { useState } from 'react';
import styled from 'styled-components';
import MainLeft from '../components/MainLeft';
import MainRight from '../components/MainRight';
import GlobalStyles from '../styles/GlobalStyles';
import { IUser } from '../interfaces';

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const HomePage: React.FC = () => {
  const [lastSearchedUser, setLastSearchedUser] = useState<IUser | null>(null);

  const updateLastSearchedUser = (user: IUser) => {
    setLastSearchedUser(user);
  };

  return (
    <>
      <GlobalStyles />
      <PageContainer>
        <MainLeft lastSearchedUser={lastSearchedUser} />
        <MainRight onUserSearch={updateLastSearchedUser} />
      </PageContainer>
    </>
  );
};

export default HomePage;
