import { Meteor } from 'meteor/meteor';
import './seeds/channelsSeed';

import './publistions';
import './methods';

Meteor.startup(() => {
  Meteor.call('seedChannels');
});