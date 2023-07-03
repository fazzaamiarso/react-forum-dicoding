export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  owner: Omit<User, "email">;
  upVotesBy: string[];
  downVotesBy: string[];
}

export interface ThreadBase {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  upVotesBy: string[];
  downVotesBy: string[];
}

export interface Thread extends ThreadBase {
  totalComments: number;
  ownerId: string;
}

export interface ThreadWithOwner extends Thread {
  owner: User;
}

export interface ThreadDetail extends ThreadBase {
  owner: Omit<User, "email">;
  comments: Comment[];
}
