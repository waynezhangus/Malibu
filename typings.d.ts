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
  points: Point[]; // quotes will be on level of sub-sections --> points
}

export interface Tweet {
  _id: string;
  title: string;
  subtitle?: string;
  time: string;
  publisher: Entity;
  author: Entity;
  image?: string;
  sections: Section[];
}
