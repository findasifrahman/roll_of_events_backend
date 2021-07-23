var admin = require("firebase-admin");
var serviceAccount = require("./personalcalender-e341d-firebase-adminsdk-ue4xn-75ccf19199.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://personalcalender-e341d.firebaseio.com"
});

module.exports = function sendFirebaseAlarm(title, body, ttoken){
  var token = ttoken
  
  var payload = {
    data: {
      title: title,
      message: body
    }
    /*notification: {
      title: title,
      body: body
    }*/
  };
  var options = {
    priority: "high",
    timeToLive: 60 * 60 *1
  };
  admin.messaging().sendToDevice(token
  , payload, options)
    .then(function(response) {
      console.log("Successfully sent message:", response);
      console.log(response.results[0].error);
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
  });
}

module.exports.topicBasedAlarm = function sendTopicAlarm(title, body, topic){
  var topic = topic;
    console.log("topic is---", topic)
    var message = {
      data: {
        title: title,
        message: body
      },
      topic: topic.toString()
    };

    // Send a message to devices subscribed to the provided topic.
    admin.messaging().send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
}

module.exports.topicBasedAlarmWithuserdata = function sendTopicAlarm(title, body, topic, userdata){
  if(!userdata.viewDisplacementalarm && body.includes("Vibration")){
    console.log("vibration rejected for choice")
    return
  }
  else if(!userdata.viewPowercutalarm && body.includes("Power cut")){
    console.log("power cut rejected for choice")
    return
  }
      var topic = topic;
        console.log("topic is---", topic)
        var message = {
          data: {
            title: title,
            message: body
          },
          topic: topic.toString()
        };

        // Send a message to devices subscribed to the provided topic.
        admin.messaging().send(message)
          .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.log('Error sending message:', error);
        });
    
}



