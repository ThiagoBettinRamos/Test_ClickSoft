import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchUserData, fetchUserRepos } from '../../utils/api';
import { RepoData, UserData } from '../../interfaces/index';

const ProfileContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #E7C29D;
  min-height: 100vh;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
`;

const Name = styled.h1`
  margin-top: 20px;
  font-size: 2rem;
`;

const Bio = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin: 10px 0 20px;
`;

const RepoList = styled.ul`
  list-style: none;
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 20px; 
`;

const RepoItem = styled.li`
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #8A5E41;
  background-color: #8A5E41;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;

  & div {
    color: #EFECE6;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  & a {
    padding: 5px 10px;
    border-radius: 6px;
    border: 2px solid #af8d6a;
    background-color: transparent;
    color: #EFECE6;
    text-align: center;
    text-decoration: none;
    font-size: 0.9rem;
  }

  & a:hover {
    background-color: #8A5E41;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #af8d6a;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;

  &:hover{
    background-color: #8A5E41;
  }
`;

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);

  useEffect(() => {
    if (typeof username === 'string') {
      fetchUserData(username).then(setUserData);
      fetchUserRepos(username).then(setRepos);
    }
  }, [username]);

  if (!userData) return <div>Loading...</div>;

  return (
    <ProfileContainer>
      <Avatar src={userData.avatar_url} alt={userData.name} />
      <Name>{userData.name}</Name>
      <Bio>{userData.bio || 'No bio available.'}</Bio>
      <RepoList>
        {repos.map(repo => (
          <RepoItem key={repo.id}>
            <div>{repo.name}</div>
            <div>{repo.description || 'No description.'}</div>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">Repositório</a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer">Demo</a>
            )}
          </RepoItem>
        ))}
      </RepoList>
      <Button onClick={() => router.push('/')}>Trocar de usuário</Button>
    </ProfileContainer>
  );
};

export default UserProfile;
