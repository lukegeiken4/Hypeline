// Handle queueing

var amqp = require('amqplib');
var queuingServer = sails.config.queuing.URL;
var queuingQueue = sails.config.queuing.QUEUE;
var when = require('when');
var request = require('request');
var appUrlOptions = sails.config.app['PROCESS'];

module.exports = {

  ensure_queue: function(){
    console.log('ensuring queue');
    //amqp.connect(queuingServer).then(function(queue){
    return amqp.connect();
  },

  get_connection: function(){
    return amqp.createConnection({host: 'localhost'});
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
            processMessage(channel, msg);
          })
        });

        return queueReady.then(function(_consumer){
          console.log(' [*] Waiting for messages. To exit press CTRL+C');
        });

      })
    }).then(null, console.warn);
  },

  process_message: function(channel, message){
    console.log(" [o] Received '%s'", message.content.toString());

    var requestOptions = appUrlOptions;
    requestOptions.json = JSON.parse(message.content.toString());
    console.log(appUrlOptions);

    request(requestOptions, function(err, response, body){
      if(err){
        console.error("QUEUEING [CONSUMER] - Post failed [%s]", message.content.toString());
      } else {
        console.log("QUEUEING [CONSUMER] - Message [%s] posted for processing, received %s", message.content.toString(), JSON.stringify(body));
        channel.ack(message);
      }
    });
  }

};
