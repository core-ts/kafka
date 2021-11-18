"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafkajs_1 = require("kafkajs");
function createKafka(username, password, brokers) {
  var sasl = { username: username, password: password, mechanism: 'scram-sha-512' };
  var ssl = !!sasl;
  var kafkaConfig = {
    brokers: brokers,
    ssl: ssl,
    sasl: sasl,
    connectionTimeout: 30000,
  };
  var kafka = new kafkajs_1.Kafka(kafkaConfig);
  return kafka;
}
exports.createKafka = createKafka;
