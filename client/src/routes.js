const host = 'https://hacker-news.firebaseio.com';
const prefix = 'v0';

export default {
  getLatestNews: () => [host, prefix, 'newstories.json?print=pretty&orderBy=%22$key%22&limitToFirst=100'].join('/'),
  getItem: (id) => [host, prefix, `item/${id}.json?print=pretty`].join('/'),
};
