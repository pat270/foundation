/*
 * jQuery Equal Heights Plugin for Foundation by Zurb v0.1
 * by Patrick Yeo @ http://www.yeti-media.com
 * Copyright 2012, Patrick Yeo
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*
make panels equal height if in desktop view, otherwise no equal heights
need to add or remove depending on window size
*/

(function( $ ) {

  $.fn.mkEqual = function(el, remove) {
    if ( (remove === true) || ($(window).width() <= 768) ) {
      this.each(function() {
        $(this).find(el).css('height', '');
      });
    } 
    else {
      return this.each(function() {
        var panelHeights = [];
        $(this).find(el).each(function() {
          var panelHeight = $(this).outerHeight();
          panelHeights.push(panelHeight);
        });
        var highest = Math.max.apply(Math, panelHeights);
        $(this).find(el).each(function() {
          $(this).css('height', highest);
        });
      });
    }
  };

  $.fn.zfeqh = function(el) {
    var that = this;
    var ws_zone;

    $(window).resize(function() {
      var ws = $(this).width();
      if (ws <= 768 && ws_zone !== 1) {
        ws_zone = 1;
        that.mkEqual(el, true);
      }
      if (ws > 768 && ws < 960 && ws_zone !== 2) {
        ws_zone = 2;
        that.mkEqual(el, true);
        that.mkEqual(el);
      }
      if (ws >= 960 && ws_zone !== 3) {
        ws_zone = 3;
        that.mkEqual(el, true);
        that.mkEqual(el);
      }
    });

    /* do this on page load */
    if ($(window).width() <= 768) {
      ws_zone = 1;
    }
    if (($(window).width() > 768) && ($(window).width() < 960)) {
      ws_zone = 2;
      that.mkEqual(el);
    }
    if ($(window).width() >= 960) {
      ws_zone = 3;
      that.mkEqual(el);
    }
  };

})(jQuery);

$(document).ready(function() {
  $('.zfeqh').zfeqh('.granel');
});