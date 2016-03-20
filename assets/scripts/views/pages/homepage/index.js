var View = require('../../layouts/base.js');
var _ = require('underscore');

module.exports = View.extend({

    template: false,

    initialize: function(options) {

        console.log('pages/homepage.initialize');

        View.prototype.initialize.apply(this, arguments);

        $window.bind('scroll.homepage', _.bind(this._onScroll, this));
        $window.bind('resize.homepage', _.bind(this._onResize, this));

        $window.on('scroll.homepageStop', _.debounce(_.bind(this._onScrollStop, this), 100, {leading: false}));
    },

    onAttach: function() {
        this.$list = this.$('.company-list .company');
        this.$miniRanks = this.$('.mini.ranks .inner');
        this.$miniNames = this.$('.mini.names .inner');
        this.$bgWrapper = this.$('.background-wrapper');

        this._onResize();
        // console.log('pages/homepage.onAttach');
    },

    _onResize: function(event) {
        this._doc_height = $document.outerHeight() - $window.height();
        this._mini_ranks_height = this.$miniRanks.outerHeight() - $window.height();
        this._mini_names_height = this.$miniNames.outerHeight() - $window.height();
    },

    _onScroll: function(event) {

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
            var center = Math.round(offset + (height/2));
            var win_height = $window.height();
            var win_center = Math.round(self._scroll_top + (win_height/2));
            var threshold = offset + height;
            var is_current = false;
            var scale = 1;

            // find prev, current, and next
            if (win_center > offset && win_center < threshold && !$this.hasClass('current')) {

                self.$list.removeClass('previous').removeClass('current');
                $this.prev().addClass('previous');
                $this.addClass('current');

                self._setCurrentBg($this.attr('data-blurry-bg'));

            }

        });
    },

    _setCurrentBg: function(bg_path) {

        console.log(bg_path);

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

        console.log
    }
});
