/*global digitalData,measure*/
var digitalData = digitalData || {};
var measure = measure || function () {};

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
measure._process = function (data) {
  switch (data.event) {
    case 'pageview':
      ga('send', 'pageview');
      break;
    case 'login':
      loginFormOverovanie();
      break;
    case 'leadSent':
      leadFormOverovanie();
      break;
    case 'fileDownload':
      ga('send', 'event', 'download', 'done');
      break;
    case 'contactFormSent':
      contactFormOverovanie();
      break;
  }
  //
  function loginFormOverovanie() {
    if (data.username == '' && data.password == '') {
      ga('send', 'event', 'Sing in', 'fail', 'both');
    } else if (data.username == '') {
      ga('send', 'event', 'Sing in', 'fail', 'username');
    } else if (data.password == '') {
      ga('send', 'event', 'Sing in', 'fail', 'password');
    } else {
      ga('send', 'event', 'Sing in', 'done');
    }
  }
  //
  function leadFormOverovanie() {
    if (data.contact == '') {
      ga('send', 'event', 'newsletter', 'fail', 'email');
      } else {
      ga('send', 'event', 'newsletter', 'done');
    }
  }
  //
  function contactFormOverovanie() {
    if (data.name == '' && data.email == '' && data.message == '') {
      ga('send', 'event', 'contact Form', 'fail'); // fial
    } else if (data.name == '' && data.email == '') {
      ga('send', 'event', 'contact Form', 'fail', 'just message');
    } else if (data.name == '' && data.message == '') {
      ga('send', 'event', 'contact Form', 'fail', 'just email');
    } else if (data.email == '' && data.message == '') {
      ga('send', 'event', 'contact Form', 'fail', 'just name');
    } else if (data.email == '') {
      ga('send', 'event', 'contact Form', 'fail', 'no email');
    } else if (data.name == '') {
      ga('send', 'event', 'contact Form', 'done No Name', data.topic);
    } else if (data.massage == '') {
      ga('send', 'event', 'contact Form', 'done No Message', data.topic);
    } else
    ga('send', 'event', 'contact Form', 'done', data.topic);
  }
};

// GA script
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-74905935-1', 'auto');
ga('set', 'forceSSL', true);
