// Generated by CoffeeScript 1.9.3
var ChangeLog, semver, xre;

xre = require('xregexp').XRegExp;

semver = require('semver');

ChangeLog = (function() {
  function ChangeLog(blob) {
    this.blob = blob;
  }

  ChangeLog.prototype.parseBody = function(stanza) {
    var bodyRe, matches;
    bodyRe = xre('\\*\\s(?<body>[^\\*-]*)', 'img');
    matches = [];
    xre.forEach(stanza, bodyRe, function(match, i) {
      return matches.push(match.body.trim());
    });
    return matches;
  };

  ChangeLog.prototype.splitLogs = function() {
    var bodyRe, currentIdx, matches;
    bodyRe = xre('[-\+]\\d{4}', 'mg');
    matches = [];
    currentIdx = 0;
    xre.forEach(this.blob, bodyRe, function(match, i) {
      var endIdx;
      endIdx = match.index + 4;
      matches.push(match.input.slice(currentIdx, +endIdx + 1 || 9e9).trim());
      return currentIdx = endIdx + 1;
    });
    return matches;
  };

  ChangeLog.prototype.parse = function(stanza) {
    var entryRe, match, model;
    entryRe = xre('^(?<pkgname>\\w+)' + '\\s' + '\\(' + '(?<version>\\d+\\.\\d+\\.?\\d+?-\\d+)' + '(?<versionExtra>.*)\\)' + '\\s' + '(?<series>\\w+);\\surgency=(?<priority>\\w+)' + '\\s[^]*' + '--\\s(?<firstname>\\w+)' + '\\s' + '(?<lastname>\\w+)' + '\\s' + '(?<email><.*>)' + '\\s+' + '(?<timestamp>.*)', 'img');
    match = xre.exec(stanza, entryRe);
    model = {
      pkgname: match.pkgname,
      major: parseInt(match.major, 10),
      minor: parseInt(match.minor, 10),
      patchLevel: parseInt(match.patchLevel, 10) || void 0,
      version: match.version,
      versionExtra: match.versionExtra,
      series: match.series,
      priority: match.priority,
      firstname: match.firstname,
      lastname: match.lastname,
      email: match.email,
      timestamp: match.timestamp
    };
    model.body = this.parseBody(stanza);
    return model;
  };

  return ChangeLog;

})();

module.exports = ChangeLog;
