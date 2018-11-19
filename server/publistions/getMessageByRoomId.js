import Messages from '/lib/collections/messages';

Meteor.publish("messages", function (rid) {
  return Messages.find({rid: rid});
});