var View = require('../../layouts/base.js');
var _ = require('underscore');

module.exports = View.extend({

    template: false,

    initialize: function(options) {

        console.log('pages/homepage.initialize');

        View.prototype.initialize.apply(this, arguments);

        $window.bind('scroll.homepage', _.bind(this._onScroll, this));
        $window.bind('resize.homepage', _.bind(this._onResize, this));

        $window.on('scroll.homepageStop', _.debounce(_.bind(this._onScrollStop, this), 100));
    },

    onAttach: function() {
        this.$list = this.$('.company-list .company');
        this.$miniRanks = this.$('.mini.ranks .inner');
        this.$miniNames = this.$('.mini.names .inner');
        this.$bgWrapper = this.$('.background-wrapper');

        var bound = _.bind(this._setCurrentBg, this);
        this.debounced_bg_setter = _.debounce(bound, 300);

        this._onResize();
        // console.log('pages/homepage.onAttach');
    },

    _onResize: function(event) {
        this._doc_height = $document.outerHeight() - $window.height();
        this._mini_ranks_height = this.$miniRanks.outerHeight() - $window.height();
        this._mini_names_height = this.$miniNames.outerHeight() - $window.height();
    },

    _onScroll: function(event) {

        // if (this.locked) return;

        // console.log('_onScroll', this.locked);

        // if (this.scrollLock) return console.log('scrollLocked - return');

        var self = this;

        // Set scroll contextual information
        this._scroll_top = $document.scrollTop();
        this._percent_scrolled = this._scroll_top / this._doc_height * 100;
        this._scroll_direction = this._scroll_top > this._last_scroll_top ? 'down' : 'up';

        // SCROLL LEFT COLUMNS
        this._scrollRanks();
        this._scrollNames();

        this.$list.each(function(index) {

            var $this = $(this);
            var offset = $this.offset().top;
            var height = $this.outerHeight();
            var center = offset + (height/2);
            var win_height = $window.height();
            var win_center = self._scroll_top + (win_height/2);
            var threshold = offset + height;
            var is_current = false;
            var scale = 1;

            if (offset > self._scroll_top + (win_height*1.5)) { return false; }

            // find prev, current, and next
            if (win_center > offset && win_center < threshold && !$this.hasClass('current')) {

                self.$list.removeClass('previous').removeClass('current');
                $this.prev().addClass('previous');
                $this.addClass('current');

                self._current_bg = $this.attr('data-blurry-bg');

                self.debounced_bg_setter();
            }

            var to_center = center - win_center;
            if (to_center < 0) {
                to_center *= -1;
            }

            var percent = 1 - (to_center / win_height);
            percent = percent > 1 ? 1 : percent;
            percent = percent < 0 ? 0 : percent;

            var rule = 'scale(' + percent + ')'; // rotateX(' + ((1 - percent)*100) + 'deg)';
            var rules = {
                '-webkit-transform': rule,
                '-moz-transform': rule,
                '-o-transform': rule,
                'transform': rule
            };

            $('.thumbnail', $this).css(rules);

        });
    },

    _setCurrentBg: function() {

        var bg_path = this._current_bg;

        if (!bg_path) return;

        var $backgrounds = this.$bgWrapper.find('.background');
        if ($backgrounds.length > 2) {
            $backgrounds.first().remove();
        }

        var $div = $('<div class="background" />').css({
            'background-image': 'url("'+ bg_path + '")'
        });

        this.$bgWrapper.append($div);

        window.setTimeout(function() {
            $div.addClass('fade-in');
        }, 30);

    },

    _scrollToCurrent: function() {

        this.locked = true;

        var self = this;
        var $current = this.$('.company.current');
        var offset = $current.offset().top;
        var height = $current.outerHeight();
        var center = offset + (height/2);

        $("html, body").stop().animate({scrollTop: offset - (height/2)}, '200', 'swing', function() {
            self.locked = false;
           // alert("Finished animating");
        });
    },

    _scrollRanks: function() {
        var inner_height = this._mini_ranks_height;
        var pixels = inner_height * this._percent_scrolled / 100;
        this.$miniRanks.parent().scrollTop(pixels);
    },

    _scrollNames: function() {
        var inner_height = this._mini_names_height;
        var pixels = inner_height * this._percent_scrolled / 100;
        this.$miniNames.parent().scrollTop(pixels);
    },

    _onScrollStop: function(event) {

        if (this.locked) return;

        // console.log('onScrollStop');
        this._scrollToCurrent();
    }
});
