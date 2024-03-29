Meteor.publish('chatworksMessages', function(room, limit) {
  check(room, String);
  check(limit, Number);
  var count = ChatworksMessages.find({
    room: room
  }).count();
  var boundary = count - count;
  //calculate boundary: the messages that we pull from the end of the collection
  if (count > 100) {
    boundary = count - 100;
  }
  return ChatworksMessages.find({
    room: room
  }, {
    sort: {
      ts: 1
    },
    skip: boundary,
    fields: {
      handle: 1,
      message: 1,
      ts: 1
    }
  });
});

Meteor.publish('chatworksRooms', function() {
  return ChatworksRooms.find();
});

Meteor.publish('chatworksUsers', function(ts) {
  check(ts, Number);
  return ChatworksUsers.find({
    lastSeen: {
      $gte: ts
    }
  }, {
    fields: {
      handle: 1
    }
  });
});
