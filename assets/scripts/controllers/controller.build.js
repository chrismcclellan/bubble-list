/*
 * Controller
 * These should all map to routes in /assets/scripts/controllers/router.js
 * To code split webpack needs these require definitions written this way as far as I can tell
 */

module.exports = {

	page: function() { var args = _args(arguments); require.ensure([], function(require) { require(["../views/pages/page"], function(P) { _init(P, args); }); }); },
	post: function() { var args = _args(arguments); require.ensure([], function(require) { require(["../views/pages/post"], function(P) { _init(P, args); }); }); },
	search: function() { var args = _args(arguments); require.ensure([], function(require) { require(["../views/pages/search"], function(P) { _init(P, args); }); }); },
	homepage: function() { var args = _args(arguments); require.ensure([], function(require) { require(["../views/pages/homepage"], function(P) { _init(P, args); }); }); },
	error404: function() { var args = _args(arguments); require.ensure([], function(require) { require(["../views/pages/404"], function(P) { _init(P, args); }); }); },


};

function _init(Page, args) {
    App.currentPage = new Page({options: args});
}

function _args(args) {
    return Array.prototype.slice.call(args);
}

