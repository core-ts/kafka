"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connect_1 = require("./connect");
var kafka_1 = require("./kafka");
function createKafkaProducer(conf, log) {
  var kafka = kafka_1.createKafka(conf.client.username, conf.client.password, conf.client.brokers);
  var producer = kafka.producer();
  connect_1.connect(producer, 'Producer', log);
  return producer;
}
exports.createKafkaProducer = createKafkaProducer;
function createProducer(conf, log) {
  var p = createKafkaProducer(conf, log);
  var s = new Producer(p, conf.topic);
  return s;
}
exports.createProducer = createProducer;
var Producer = (function () {
  function Producer(producer, topic) {
    this.producer = producer;
    this.topic = topic;
    this.send = this.send.bind(this);
  }
  Producer.prototype.send = function (data, headers) {
    var msg = {
      value: (typeof data === 'string' ? data : JSON.stringify(data)),
      headers: headers
    };
    return this.producer.send({
      topic: this.topic,
      messages: [msg],
      acks: 1,
    });
  };
  return Producer;
}());
exports.Producer = Producer;
