"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_1 = require("./kafka");
function createKafkaChecker(conf, service, timeout) {
  var kafka = kafka_1.createKafka(conf.username, conf.password, conf.brokers);
  var producer = kafka.producer();
  return new KafkaChecker(producer, service, timeout);
}
exports.createKafkaChecker = createKafkaChecker;
var KafkaChecker = (function () {
  function KafkaChecker(producer, service, timeout) {
    this.producer = producer;
    this.timeout = (timeout && timeout > 0 ? timeout : 4200);
    this.service = (service && service.length > 0 ? service : 'kafka');
    this.check = this.check.bind(this);
    this.name = this.name.bind(this);
    this.build = this.build.bind(this);
  }
  KafkaChecker.prototype.check = function () {
    var _this = this;
    var obj = {};
    var promise = new Promise(function (resolve, reject) {
      return _this.producer.connect().then(function () { return resolve(obj); }).catch(function (err) { return reject("Database down!"); });
    });
    if (this.timeout > 0) {
      return promiseTimeOut(this.timeout, promise);
    }
    else {
      return promise;
    }
  };
  KafkaChecker.prototype.name = function () {
    return this.service;
  };
  KafkaChecker.prototype.build = function (data, err) {
    if (err) {
      if (!data) {
        data = {};
      }
      data['error'] = err;
    }
    return data;
  };
  return KafkaChecker;
}());
exports.KafkaChecker = KafkaChecker;
function promiseTimeOut(timeoutInMilliseconds, promise) {
  return Promise.race([
    promise,
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject("Timed out in: " + timeoutInMilliseconds + " milliseconds!");
      }, timeoutInMilliseconds);
    })
  ]);
}
