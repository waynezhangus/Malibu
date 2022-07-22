interface Entity {
  userName: string;
  screenName?: string;
  profileImg: string;
}

interface Quote {
  author: Entity;
  text: string;
}

interface Section {
  text: string;
  quotes: Quote[];
}

export interface Tweet {
  _id: string;
  title: string;
  subtitle?: string;
  time: string;
  publisher: Entity;
  author: Entity;
  image?: string;
  sections?: Section[];
}
