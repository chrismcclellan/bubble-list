/*
 * Controller
 * These should all map to routes in /assets/scripts/controllers/router.js
 * To code split webpack needs these require definitions written this way as far as I can tell
 */

module.exports = {

/* functions */

};

function _init(Page, args) {
    App.currentPage = new Page({options: args});
}

function _args(args) {
    return Array.prototype.slice.call(args);
}

