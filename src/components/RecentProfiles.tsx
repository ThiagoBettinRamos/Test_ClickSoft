import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfilesContainer = styled.div`
  padding: 10px;
`;

const ProfileLink = styled(Link)`
  display: block;
  color: blue;
  margin: 5px 0;
`;

const RecentProfiles: React.FC = () => {
  const [profiles, setProfiles] = React.useState<string[]>([]);

  React.useEffect(() => {
    const loadedProfiles = JSON.parse(localStorage.getItem('recentProfiles') || '[]');
    setProfiles(loadedProfiles);
  }, []);

  return (
    <ProfilesContainer>
      {profiles.map((profile, index) => (
        <ProfileLink to={`/profile/${profile}`} key={index}>
          {profile}
        </ProfileLink>
      ))}
    </ProfilesContainer>
  );
};

export default RecentProfiles;
