import Messages from '/lib/collections/messages';

Meteor.publish("messages", function (rid) {
  if (! Meteor.userId()) {
    throw new Meteor.Error("not-authorized");
  }

  console.log('room id ', rid)
  console.log('user id ', Meteor.userId());
  return Messages.find({rid: rid});
});