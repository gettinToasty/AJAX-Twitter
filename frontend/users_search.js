const APIUtil = require('./api_util');
const FollowToggle = require('./follow_toggle');

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.find('input');
    this.$ul = $el.find('.users');
    this.bindEvents();
  }

  bindEvents() {
    this.$input.on('input', (e) => this.handleInput(e));
  }

  handleInput(e) {
    let queryVal = this.$input.val();
    APIUtil.searchUsers(queryVal, data => {
      this.renderResults(data);
    });
  }

  renderResults(data) {
    this.$ul.empty();
    data.forEach((el) => {
      let $button = $(`<button class="follow-toggle"></button>`);
      let followed = el.followed ? "followed" : "unfollowed";
      let options = { userId: el.id, followState: followed };
      new FollowToggle($button, options);
      let a = `<a href="/users/${el.id}">${el.username}</a>`;
      let $li = $(`<li>${a}`);
      $li.append($button);
      this.$ul.append($li);
    });
  }
}

module.exports = UsersSearch;
