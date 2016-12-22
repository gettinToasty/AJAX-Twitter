const APIUtil = require('./api_util');

class FollowToggle {
  constructor($el, options) {
    this.$el = $el;
    this.userId = $el.data('user-id') || options.userId;
    this.followState = $el.data('initial-follow-state') || options.followState;
    this.render();
    this.bindEvents();
  }

  render() {
    if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
      this.$el.prop("disabled", false);
    }
    else if (this.followState === "following" || this.followState === "unfollowing") {
      this.$el.prop('disabled', true);
    } else {
      this.$el.text("Unfollow!");
      this.$el.prop("disabled", false);
    }
  }

  toggle() {
    if (this.followState === "following") { this.followState = "followed"; }
    else if (this.followState === "unfollowing") { this.followState = "unfollowed"; }
  }

  handleClick(e) {
    e.preventDefault();
    let ajax = this.followState === "unfollowed" ? APIUtil.followUser(this.userId) : APIUtil.unfollowUser(this.userId);
    this.followState = this.followState === "unfollowed" ? "following" : "unfollowing";
    this.render();
    ajax.then(() => {
      this.toggle();
      this.render();
    });
  }

  bindEvents() {
    this.$el.click(e => {
      this.handleClick(e);
    });
  }
}

module.exports = FollowToggle;
