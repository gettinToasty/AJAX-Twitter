const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose');
const InfiniteTweets = require('./infinite_tweets');

$(() => {
  $('button.follow-toggle').each((idx, el) => {
    new FollowToggle($(el));
  });

  $('nav.users-search').each((idx, el) => {
    new UsersSearch($(el));
  });

  $('.tweet-compose').each((idx, el) => {
    new TweetCompose($(el));
  });

  $('.infinite-tweets').each((idx, el) => {
    new InfiniteTweets($(el));
  });
});
