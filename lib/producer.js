"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connect_1 = require("./connect");
var kafka_1 = require("./kafka");
function createKafkaProducer(conf, log) {
  var kafka = kafka_1.createKafka(conf.username, conf.password, conf.brokers);
  var producer = kafka.producer();
  connect_1.connect(producer, 'Producer', log);
  return producer;
}
exports.createKafkaProducer = createKafkaProducer;
exports.createKafkaPublisher = createKafkaProducer;
exports.createKafkaWriter = createKafkaProducer;
exports.createKafkaSender = createKafkaProducer;
function createProducer(conf, log) {
  var p = createKafkaProducer(conf.client, log);
  var s = new Producer(p, conf.topic);
  return s;
}
exports.createProducer = createProducer;
exports.createPublisher = createProducer;
exports.createWriter = createProducer;
exports.createSender = createProducer;
var Producer = (function () {
  function Producer(producer, topic) {
    this.producer = producer;
    this.topic = topic;
    this.produce = this.produce.bind(this);
    this.send = this.send.bind(this);
    this.put = this.put.bind(this);
    this.write = this.write.bind(this);
    this.publish = this.publish.bind(this);
  }
  Producer.prototype.send = function (data, headers) {
    return this.produce(data, headers);
  };
  Producer.prototype.put = function (data, headers) {
    return this.produce(data, headers);
  };
  Producer.prototype.write = function (data, headers) {
    return this.produce(data, headers);
  };
  Producer.prototype.publish = function (data, headers) {
    return this.produce(data, headers);
  };
  Producer.prototype.produce = function (data, headers) {
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
exports.Publisher = Producer;
exports.Sender = Producer;
exports.Writer = Producer;
function createTopicProducer(conf, log) {
  var p = createKafkaProducer(conf, log);
  var s = new TopicProducer(p);
  return s;
}
exports.createTopicProducer = createTopicProducer;
exports.createTopicPublisher = createTopicProducer;
exports.createTopicWriter = createTopicProducer;
exports.createTopicSender = createTopicProducer;
var TopicProducer = (function () {
  function TopicProducer(producer) {
    this.producer = producer;
    this.produce = this.produce.bind(this);
    this.send = this.send.bind(this);
    this.put = this.put.bind(this);
    this.write = this.write.bind(this);
    this.publish = this.publish.bind(this);
  }
  TopicProducer.prototype.send = function (topic, data, headers) {
    return this.produce(topic, data, headers);
  };
  TopicProducer.prototype.put = function (topic, data, headers) {
    return this.produce(topic, data, headers);
  };
  TopicProducer.prototype.write = function (topic, data, headers) {
    return this.produce(topic, data, headers);
  };
  TopicProducer.prototype.publish = function (topic, data, headers) {
    return this.produce(topic, data, headers);
  };
  TopicProducer.prototype.produce = function (topic, data, headers) {
    var msg = {
      value: (typeof data === 'string' ? data : JSON.stringify(data)),
      headers: headers
    };
    return this.producer.send({
      topic: topic,
      messages: [msg],
      acks: 1,
    });
  };
  return TopicProducer;
}());
exports.TopicProducer = TopicProducer;
exports.TopicPublisher = TopicProducer;
exports.TopicSender = TopicProducer;
exports.TopicWriter = TopicProducer;
