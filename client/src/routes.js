const host = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy=%22$key%22&limitToFirst=5';

export default {
  getLatestNews: () => host,
  getCardInfo: (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
};
