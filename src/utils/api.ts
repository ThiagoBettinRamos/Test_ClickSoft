const BASE_URL = 'https://api.github.com/users';

export async function fetchUserData(username: string) {
  try {
    const response = await fetch(`${BASE_URL}/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function fetchUserRepos(username: string) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/repos`);
    if (!response.ok) {
      throw new Error('Failed to fetch user repositories');
    }
    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    throw error;
  }
}
