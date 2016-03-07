var dataLayer = dataLayer || [];
//global jQuery
(function($) {
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };
  // Demo itself features
  $("#loginForm").on("submit", function(event) {
    var eventData;

    event.preventDefault();

    eventData = $(this).serializeObject();
    eventData.formId = "loginForm";
    eventData.event = "loginFormSent";

    measure(eventData);
    this.reset();
  });

  $("#leadForm").on("submit", function(event) {
    var eventData;

    event.preventDefault();

    eventData = $(this).serializeObject();
    eventData.formId = "leadForm";
    eventData.event = "loginFormSent";

    measure(eventData);
    this.reset();
  });

  $("#contactForm").on("submit", function(event) {
    var eventData;

    event.preventDefault();

    eventData = $(this).serializeObject();
    eventData.formId = "contactForm";
    eventData.event = "contactFormSent";

    measure(eventData);
    this.reset();
  });

  $(".download").on("click", function(event) {
    var $target,
      linkHref,
      fileType;

    event.preventDefault();

    $target = $(event.target);
    linkHref = $target.attr("href");
    fileType = linkHref.split(".").pop().toUpperCase();

    measure({event: "fileDownload", fileName: linkHref, fileType: fileType});
    setTimeout(function() {
      window.location = linkHref;
    }, 500);
  });

})(jQuery);