import { Meteor } from 'meteor/meteor'
import Channels from '/lib/collections/channels'

Meteor.methods({
  "seedChannels"() {
    if (Channels.find().count() == 0) {
      Channels.insert({
        name: "random",
        type: "channel",
        members: ['binh', 'nguyen']
      });
      Channels.insert({
        name: "general",
        type: "channel",
        members: ['xuan', 'ha', 'thu']
      });
    }
  }
})
