const APIUtil = require('./api_util');

class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.handleInput();
    this.handleSubmit();
    this.handleAddMention();
    this.handleRemoveMention();
  }

  handleRemoveMention() {
    $('div').on('click', 'a.remove-mentioned-user', e => {
      return this.removeMentionedUser(e);
    });
  }

  removeMentionedUser(e) {
    let $mention = $(e.currentTarget);
    $mention.parent('div').remove();
    return false;
  }

  handleAddMention() {
    $('a.add-mentioned-user').click(e => {
      return this.addMentionedUser();
    });
  }

  addMentionedUser() {
    let html = $("script[type='text/template']").html();
    $('.mentioned-users').append(html);
    return false;
  }

  handleInput() {
    $('textarea').on('input', e => {
      let count = $(e.currentTarget).val().length;
      $('.chars-left').empty();
      $('.chars-left').text(`${140 - count} characters left`);
    });
  }

  handleSubmit() {
    this.$el.on('submit', e => {
      e.preventDefault();
      this.submit(e);
    });
  }

  submit(e) {
    let formData = $(e.currentTarget).serializeJSON();
    $(':input').prop('disabled', true);
    APIUtil.createTweet(formData).then((data) => this.handleSuccess(data));
  }

  clearInput() {
    this.$el.find("textarea, select").val("");
    $('.chars-left').empty();
    $('.chars-left').text('140 characters left');
    $('.mentioned-users').empty();
  }

  handleSuccess(data) {
    this.clearInput();
    $(':input').prop('disabled', false);
    let $ul = $(this.$el.data('tweets-ul'));
    $('#feed').trigger('insert-tweet', data);
    // $ul.prepend(`<li>${JSON.stringify(data)}</li>`);
  }
}

module.exports = TweetCompose;
