// Handle queueing

var amqp = require('amqplib');
var queuingServer = sails.config.queuing.URL;
var queuingQueue = sails.config.queuing.QUEUE;
var when = require('when');

module.exports = {

  ensure_queue: function(){
    console.log('ensuring queue');
    //amqp.connect(queuingServer).then(function(queue){
    return amqp.connect();
  },

  consume_message: function(){

    var connection = this.ensure_queue();
    var processMessage = this.process_message;

    connection.then(function(queue){
      process.once('SIGNIT', function(){
        queue.close();
      });

      return queue.createChannel().then(function(channel){
        var queueReady = channel.assertQueue(queuingQueue, {durable: true});

        queueReady = queueReady.then(function(_queueExists){
          return channel.consume(queuingQueue, function(msg){
            processMessage(msg);
          }, {noAck: true})
        });

        return queueReady.then(function(_consumer){
          console.log(' [*] Waiting for messages. To exit press CTRL+C');
        });

      })
    }).then(null, console.warn);
  },

  process_message: function(message){
    console.log(" [o] Received '%s'", message.content.toString());
  }

};
