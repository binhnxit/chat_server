Meteor.methods({
  getListChannels: function () {
  	return Channels.find().fetch();
  }
})
