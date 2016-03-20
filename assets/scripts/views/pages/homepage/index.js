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
        this.$list = this.$('.company-list');
        this.$miniRanks = this.$('.mini.ranks .inner');
        this.$miniNames = this.$('.mini.names .inner');

        this._onResize();
        // console.log('pages/homepage.onAttach');
    },

    _onResize: function(event) {
        this._docHeight = $document.outerHeight() - $window.height();
        this._miniRanksHeight = this.$miniRanks.outerHeight() - $window.height();
        this._miniNamesHeight = this.$miniNames.outerHeight() - $window.height();
    },

    _onScroll: function(event) {

        // if (this.scrollLock) return console.log('scrollLocked - return');

        this._docScrollTop = $document.scrollTop();
        this._percentScrolled = this._docScrollTop / this._docHeight * 100;

        var innerHeight;
        var pixels

        // scrollRanks
        innerHeight = this._miniRanksHeight;
        pixels = innerHeight * this._percentScrolled / 100;
        this.$miniRanks.parent().scrollTop(pixels);


        // crollNames
        innerHeight = this._miniNamesHeight;
        pixels = innerHeight * this._percentScrolled / 100;
        this.$miniNames.parent().scrollTop(pixels);
    },

    _onScrollStop: function(event) {

        if (this.scrollLock) return console.log('scrollLocked - return');
        this.scrollLock = true;

        // find nearest company and vertically center it in the viewport
        var self = this;
        var list = $('.company', this.$list);

        var centered = _.find(list, function(item) {

            var $item = $(item);
            var scrollTop = $document.scrollTop() + ($window.height() / 2);
            var offset = $item.offset().top;
            var min = offset;
            var max = offset + $item.outerHeight();

            if (scrollTop > min && scrollTop < max) {
                return true;
            }
        });

        var $centered = $(centered);

        // $('.company', this.$list)
        //     .removeClass('current')
        //     .removeClass('prev')
        //     .removeClass('next');

        // $centered.prev().addClass('prev');
        // $centered.addClass('current');
        // $centered.next().addClass('next');

        // $('html, body').animate({ scrollTop: $centered.offset().top + ($window.height()/2)}, 100, function() {
        //     // allow for scroll binding again
        //     console.log('scroll callback');
        //     self.scrollLock = false;
        // });
    }
});
