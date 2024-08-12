export interface UserData {
    id: number;
    avatar_url: string;
    name: string;
    bio: string;
    email: string;
    login: string;
}
  
export interface RepoData {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage?: string;
}

export interface IUser {
    id: number;
    login: string;
}
  
export interface MainLeftProps {
    lastSearchedUser: IUser | null;
}
  