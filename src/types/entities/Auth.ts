export type AuthInfos = {
    username: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    mail: string;
    bio: string;
    name: string;
    token: string;
}

export type OtherUser = Pick<User, 'id' | "email" | "mail" | "bio" | 'name'>;

export interface UserProfile extends User{
    googleId?: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

export type Sender = Pick<UserProfile, "id"|"name"|"email">