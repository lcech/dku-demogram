/*global digitalData*/
var digitalData = digitalData || {};
digitalData._log = digitalData._log || [];
/**
 * Update the Instance Variable with the new functionality
 * @param measure {function} The original function with page data
 * @param measure.q {Array}
 */
var measure = (function (measure) {
  /**
   * New function to operate the gathered data
   * @method measureInterface
   * @param data {object} Object with data to measure
   */
  var measureInterface = function (data) {
    if (typeof data.event !== "undefined") {
      measureInterface._fired = true;
      digitalData = measureInterface._deepMerge(digitalData, data);
      digitalData._log.push(data);
      measureInterface._process(data);
    } else {
      throw "Missing Action ID";
    }
  };

  /**
   * Fired flag to fallback to the automatic URL-based measurement
   * @private
   */
  measureInterface._fired = false;

  /**
   * Function to merge objects recursively
   * @param target
   * @param src
   * @returns {boolean|*|Boolean|Array|{}}
   * @private
   */
  measureInterface._deepMerge = function (target, src) {
    var array = Array.isArray(src);
    var dst = array && [] || {};

    if (array) {
      target = target || [];
      dst = dst.concat(target);
      src.forEach(function(e, i) {
        if (typeof dst[i] === "undefined") {
          dst[i] = e;
        } else if (typeof e === "object") {
          dst[i] = measureInterface._deepMerge(target[i], e);
        } else {
          if (target.indexOf(e) === -1) {
            dst.push(e);
          }
        }
      });
    } else {
      if (target && typeof target === "object") {
        Object.keys(target).forEach(function (key) {
          dst[key] = target[key];
        })
      }
      Object.keys(src).forEach(function (key) {
        if (typeof src[key] !== "object" || !src[key]) {
          dst[key] = src[key];
        }
        else {
          if (!target[key]) {
            dst[key] = src[key];
          } else {
            dst[key] = measureInterface._deepMerge(target[key], src[key]);
          }
        }
      });
    }

    return dst;
  };

  /**
   * Default measure process function to override
   * @method _process
   * @private
   * @param data {object} Object with data to measure
   * @param data.contact {String}
   * @param data.error {String}
   * @param data.fileNAme {String}
   * @param data.username {String}
   */
  measureInterface._process = function (data) {
    var digitalDataSnapshot;
    digitalDataSnapshot = JSON.parse(JSON.stringify(digitalData));
    delete digitalDataSnapshot._log;
    console.log("Event captured. Available data:");
    console.log(JSON.stringify(digitalDataSnapshot, null, 4));
    console.log("==================================================");
    /*
    switch (data.event) {
    case "pageview":
      if (data.error) {
        //_paq.push(["setCustomDimension", 3, data.server]);
        _paq.push(["setDocumentTitle",  data.error + "/URL = " +  encodeURIComponent(document.location.pathname + document.location.search) + "/From = " + encodeURIComponent(document.referrer)]);
      }
      _paq.push(["trackPageView"]);
      break;
    case "leadFormSent":
      _paq.push(["trackEvent", "Lead Form", "submit", null, null, {dimension2: data.contact}]);
      break;
    case "loginFormSent":
      _paq.push(["trackEvent", "Login Form", "submit", null, null, {dimension1: data.username}]);
      break;
    case "contactFormSent":
      _paq.push(["trackEvent", "Contact Form", "submit", null, null, {dimension2: data["email"]}]);
      break;
    case "fileDownload":
      _paq.push(["trackEvent", "File Download", "click", data.fileName]);
    break;
    }
    */
  };
  return measureInterface;
}(measure));
/*
// Piwik Configuration
var _paq = _paq || [];
_paq.push(["setTrackerUrl", "//104.155.112.68/analytics/piwik.php"]);
_paq.push(["setSiteId", 2]);
_paq.push(["setCookieDomain", ".demogram.local"]);
_paq.push(["setDomains", [".demogram.cz", ".demogram.local"]]);
_paq.push(["removeDownloadExtensions", ["pdf", "doc", "docx", "xls", "xlsx"]]);
_paq.push(["enableLinkTracking"]);
(function() {
  var d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];

  g.type="text/javascript";
  g.async=true;
  g.defer=true;
  g.src="/js/piwik.js";
  s.parentNode.insertBefore(g, s);
})();
*/
measure({event: "pageview"});
