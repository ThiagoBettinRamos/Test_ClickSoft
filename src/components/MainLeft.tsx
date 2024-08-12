import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const LeftSection = styled.div`
  width: 50%;
  float: left;
  background-color: #af8d6a;
  padding: 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 34%;
  margin-left: 10%;
`;

const Title = styled.h1`
  color: #EFECE6;
`;

const Subtitle = styled.h3`
  color: #EFECE6;
`;

const RecentUsersList = styled.div`
  margin-top: 20px;
`;

const UserLink = styled.a`
  display: block;
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

interface IUser {
  id: number;
  login: string;
}

interface MainLeftProps {
  lastSearchedUser: IUser | null;
}

const MainLeft: React.FC<MainLeftProps> = ({ lastSearchedUser }) => {
  const router = useRouter();
  const [recentUsers, setRecentUsers] = useState<IUser[]>([]);

  const addUserToRecent = (user: IUser) => {
    setRecentUsers(prevUsers => {
      const filteredUsers = prevUsers.filter(u => u.id !== user.id);
      const newUsers = [user, ...filteredUsers];
      return newUsers.slice(0, 3);
    });
  };

  useEffect(() => {
    if (lastSearchedUser) {
      addUserToRecent(lastSearchedUser);
    }
  }, [lastSearchedUser]);

  const handleUserClick = (username: string) => {
    router.push(`/profile/${username}`);
  };

  return (
    <LeftSection>
      <Div>
        <Title>Git Search</Title>
        <Subtitle>Encontre e se conecte com profissionais de forma rápida e fácil!</Subtitle>
        <RecentUsersList>
          {recentUsers.map(user => (
            <UserLink key={user.id} onClick={() => handleUserClick(user.login)}>
              {user.login}
            </UserLink>
          ))}
        </RecentUsersList>
      </Div>
    </LeftSection>
  );
};

export default MainLeft;
