import type {
  Comment,
  Follows,
  Like,
  Post,
  SavedPost,
  User,
} from "@prisma/client";

export type CommentWithData = Comment & { user: User };
export type LikeWithData = Like & { user: User };
export type PostListWithData = Post & {
  comments: CommentWithData;
  likes: LikeWithData;
  saveBy: SavedPost[];
  user: User;
};
export type UserWithFollows = User & {
  following: Follows[];
  followedBy: Follows[];
};

export type FollowerWithList = Follows & { follower: UserWithFollows };
export type FollowingWithList = Follows & { following: UserWithFollows };

export type UserWithExtras = User & {
  posts: Post[];
  saved: SavedPost[];
  followedBy: FollowerWithList[];
  following: FollowingWithList[];
};
