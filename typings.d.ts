interface User {
  theme: boolean; // light false, dark true
  autoExtend: boolean;
  autoShowFeed: boolean;
  tweetNum: number;
}

interface Entity {
  userName: string;
  screenName?: string;
  profileImg: string;
}

interface Point {
  author: Entity;
  text: string;
}

interface Section {
  image?: string;
  points: Point[]; // quotes will be on level of sub-sections --> points
}

export interface Tweet {
  _id: string;
  URL: string;
  updatedAt: string;
  visitedCnt: number;
  numWords: number;
  title: string;
  subtitle?: string;
  time: string;
  publisher: Entity;
  author: Entity;
  image?: string;
  sections: Section[];
}
