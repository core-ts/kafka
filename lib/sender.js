"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connect_1 = require("./connect");
var kafka_1 = require("./kafka");
function createProducer(conf, log) {
  var kafka = kafka_1.createKafka(conf.client.username, conf.client.password, conf.client.brokers);
  var producer = kafka.producer();
  connect_1.connect(producer, 'Producer', log);
  return producer;
}
exports.createProducer = createProducer;
function createSender(conf, log) {
  var p = createProducer(conf, log);
  var s = new Sender(p, conf.topic);
  return s;
}
exports.createSender = createSender;
var Sender = (function () {
  function Sender(producer, topic) {
    this.producer = producer;
    this.topic = topic;
    this.send = this.send.bind(this);
  }
  Sender.prototype.send = function (data, headers) {
    var msg = {
      value: JSON.parse(data),
      headers: headers
    };
    return this.producer.send({
      topic: this.topic,
      messages: [msg],
      acks: 1,
    });
  };
  return Sender;
}());
exports.Sender = Sender;
