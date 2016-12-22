const APIUtil = require('./api_util');

class InfiniteTweets {
  constructor($el) {
    this.$el = $el;
    this.maxCreatedAt = null;
    this.fetchTweets();
    this.handleFetch();
    this.handleInsert();
  }

  handleInsert() {
    $('#feed').on('insert-tweet', (e, tweet) => {
      this.insertTweet(tweet);
    });
  }

  handleFetch() {
    $('.fetch-more').click((e) => {
      return this.fetchTweets();
    });
  }

  fetchTweets() {
    let data;
    if (this.maxCreatedAt !== null) { data = this.maxCreatedAt; }
    APIUtil.fetchTweets(data).then((result) => this.insertTweets(result));
  }

  insertTweets(result) {
    if (result.length < 20) {
      $('.fetch-more').remove();
      $('.infinite-tweets').append('<p>No more tweets :(</p>');
    }

    result.forEach((el) => {
      this.insertTweet(el);
    });
    return false;
  }

  insertTweet(tweet) {
    $('#feed').append(`<li>${JSON.stringify(tweet)}</li>`);
    this.maxCreatedAt = tweet.created_at;
  }
}

module.exports = InfiniteTweets;
