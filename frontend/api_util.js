const APIUtil = {
  followUser: id => $.ajax({
    type: `POST`,
    url: `http://localhost:3000/users/${id}/follow`,
    dataType: 'JSON',
    }),

  unfollowUser: id => $.ajax({
    type: `DELETE`,
    url: `http://localhost:3000/users/${id}/follow`,
    dataType: 'JSON',
  }),

  searchUsers: (queryVal, success) => $.ajax({
    url: `http://localhost:3000/users/search`,
    dataType: 'JSON',
    data: {
      query: queryVal
    },
    success: success
  }),

  createTweet: (formData) => $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/tweets',
    data: formData,
    dataType: 'JSON'
  }),

  fetchTweets: (max) => $.ajax({
    url: 'http://localhost:3000/feed',
    dataType: 'JSON',
    data: {
      max_created_at: max
    }
  })
};

module.exports = APIUtil;
