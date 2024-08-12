import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useGithubData from '@/hooks/useGithubData';
import { IUser } from '@/interfaces';

const RightSection = styled.div`
  width: 50%;
  background-color: #E7C29D;
  padding: 20px;
  float: right;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 35%;
  margin-left: 25%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 25rem;
  width: 100%;

  & label{
    color: #EFECE6;
    margin-bottom: 5px;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 2px solid #af8d6a;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #af8d6a;
  border-radius: 6px;
  color: #EFECE6;
  border: none;
  cursor: pointer;

  &:hover{
    background-color: #8A5E41;
  }
`;

interface MainRightProps {
  onUserSearch: (user: IUser) => void;
}

const MainRight: React.FC<MainRightProps> = ({ onUserSearch }) => {
  const [username, setUsername] = useState('');
  const { data, loading, fetchUserData } = useGithubData();
  const router = useRouter();

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      await fetchUserData(username);
      if (data) {
        console.log('User data:', data);
        onUserSearch(data); 
        router.push(`/profile/${username}`);
      }
    }
  };

  return (
    <RightSection>
      <Div>
        <Form onSubmit={handleSearch}>
          <label htmlFor="username">Digite o usuário desejado:</label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite um usuário do GitHub aqui..."
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Ver perfil do GitHub'}
          </Button>
        </Form>
      </Div>
    </RightSection>
  );
};

export default MainRight;
