"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function connect(kafka, name, log) {
  var lg = (log ? log : console.log);
  if (!log) {
    log = console.log;
  }
  return kafka.connect().then(function () { return lg(name + " connected"); }).catch(function (err) { return lg(name + " connected feild: " + err); });
}
exports.connect = connect;
