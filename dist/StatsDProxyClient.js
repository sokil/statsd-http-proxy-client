(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.StatsDProxyClient = mod.exports;
  }
})(this, function (_exports) {
  'use strict';

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  let StatsDProxyClient =
  /*#__PURE__*/
  function () {
    /**
     * @param {string} proxyHost in format "https://server.com:8080/"
     * @param {string} jwtToken
     */
    function StatsDProxyClient(proxyHost, jwtToken) {
      this.proxyHost = proxyHost;
      this.jwtToken = jwtToken;
    }
    /**
     * @param {string} name
     * @param {int} value Negative to decrease
     * @param {double} sampleRate Sample rate to skip metrics from 0 to 1
     */


    var _proto = StatsDProxyClient.prototype;

    _proto.count = function count(name, value, sampleRate) {
      this._send('count', name, {
        value,
        sampleRate
      });
    }
    /**
     * @param {string} name
     * @param {int} value
     * @param {int} shift Signed int, relative to previously stored value
     */
    ;

    _proto.gauge = function gauge(name, value, shift) {
      this._send('gauge', name, {
        value,
        shift
      });
    }
    /**
     * @param {string} name
     * @param {int} time Time in milliseconds
     * @param {double} sampleRate Sample rate to skip metrics from 0 to 1
     */
    ;

    _proto.timing = function timing(name, time, sampleRate) {
      this._send('timing', name, {
        time,
        sampleRate
      });
    }
    /**
     * @param {string} name
     * @param {int} value
     */
    ;

    _proto.set = function set(name, value) {
      this._send('timing', name, {
        value
      });
    }
    /**
     * @private
     *
     * @param {string} metricType One of 'count', 'gauge', 'timing', 'set'
     * @param {string} metricName Metric name in dot-notation like "cluster1.node2.cpu.load"
     * @param {object} metric
     *
     * @returns promise
     */
    ;

    _proto._send = function _send(metricType, metricName, metric) {
      let headers = {};

      if (this.jwtToken) {
        headers['X-JWT-Token'] = this.jwtToken;
      } // build query string


      let query = [];

      for (let key in metric) {
        if (metric[key]) {
          query.push(key + '=' + metric[key]);
        }
      } // build url


      let url = this.proxyHost + '/' + metricType + '/' + metricName;
      let body = query.length > 0 ? query.join('&') : null;
      return this.fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-cache',
        redirect: 'error'
      });
    };

    return StatsDProxyClient;
  }();

  var _default = StatsDProxyClient;
  _exports.default = _default;
});