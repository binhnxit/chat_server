import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Channels from '/lib/collections/channels'
import Messages from '/lib/collections/messages'
import './main.html';

Meteor.subscribe('getChannels', {
  onReady: function () {
    console.log(Channels.find().fetch());
  }
});


var autoScrollingIsActive = false;
var thereAreUnreadMessages = new ReactiveVar(false);
scrollToBottom = function scrollToBottom (duration) {
  var messageWindow = $(".message-window");
  var scrollHeight = messageWindow.prop("scrollHeight");
  messageWindow.stop().animate({scrollTop: scrollHeight}, duration || 0);
};

  // This code only runs on the client
  Meteor.subscribe("messages", '6THWDQENYrgoyYeR9', {
    onReady: function () {
      scrollToBottom();
      autoScrollingIsActive = true;
    }
  });

  Template.body.helpers({
    recentMessages: function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    },
    thereAreUnreadMessages: function () {
      return thereAreUnreadMessages.get();
    },
  });

  Template.message.helpers({
    meId: function () {
      return Meteor.userId();
    },
    meClass: function (userIdOfMsg) {
      return (Meteor.userId() == userIdOfMsg) ? 'msg-right' : '';
    },
  });

  Template.message.onRendered(function () {
    if (autoScrollingIsActive) {
      scrollToBottom(250);
    } else {
      if (Meteor.user() && this.data.username !== Meteor.user().username) {
        thereAreUnreadMessages.set(true);
      }
    }
  });


  Template.body.events({
    "submit .new-message": function (event) {
      var text = event.target.text.value;

      Meteor.call("sendMessage", text);
      scrollToBottom(250);

      event.target.text.value = "";
      event.preventDefault();
    },

    "scroll .message-window": function () {
      var howClose = 80;  // # pixels leeway to be considered "at Bottom"
      var messageWindow = $(".message-window");
      var scrollHeight = messageWindow.prop("scrollHeight");
      var scrollBottom = messageWindow.prop("scrollTop") + messageWindow.height();
      var atBottom = scrollBottom > (scrollHeight - howClose);
      autoScrollingIsActive = atBottom ? true : false;
      if (atBottom) {        // <--new
        thereAreUnreadMessages.set(false);
      }
    },

    "click .more-messages": function () {
      scrollToBottom(500);
      thereAreUnreadMessages.set(false);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });  