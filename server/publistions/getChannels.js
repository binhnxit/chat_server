import Channels from '/lib/collections/channels'

Meteor.publish('getChannels', function () {
  return Channels.find();
}) 