export interface Tweet extends TweetBody {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TweetBody {
  text: string;
  username: string;
  profileImg: string;
  image?: string;
}

export interface Comment extends CommentBody {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentBody {
  text: string;
  username: string;
  profileImg: string;
  tweetId: any;
}
