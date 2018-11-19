import Messages from '/lib/collections/messages';

Meteor.methods({
  sendMessage: function (message) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Messages.insert({
      messageText: message,
      createdAt: new Date(),
      rid: '6THWDQENYrgoyYeR9',
      u: {
        _id: Meteor.user()._id,
        username:  Meteor.user().username,  // <-add real username,
      },
    });
  }
});