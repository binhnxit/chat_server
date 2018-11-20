Meteor.methods({
  getListChannels: function () {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
  	return Channels.find();
  }
})
