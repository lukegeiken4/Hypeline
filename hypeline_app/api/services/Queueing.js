// Handle queueing

var amqp = require('amqplib');
var queuingServer = sails.config.queuing.URL;
var when = require('when');

module.exports = {

  ensure_queue: function(){
    console.log('ensuring queue');
    //amqp.connect(queuingServer).then(function(queue){
    return amqp.connect();
  },

  queue_message: function(queueName, message, cb){

    if(queueName && message && cb){
      var connection = this.ensure_queue();

      connection.then(function(queue){
        return when(queue.createChannel().then(function(channel){
            var exists = channel.assertQueue(queueName, {durable: true});
            return exists.then(function(_queueExists){
              channel.sendToQueue(queueName, new Buffer(message));
              console.log("[x] put '%s' on queue '%s'", message, queueName);
              return channel.close();
            })
          })
        ).ensure(function(){ queue.close(); });
      }).then(cb);
    } else {
      console.error('wrong number of arguments for queuing');
    }
  }

};
