/**
 * HomepageController
 *
 * @description :: Server-side logic for managing Homepage
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var sails = global.sails || {};
var config = sails.config || {};
var nook = config.nook || {};
var util = nook.util || {};

var companies = require('../../lib/companies.json');

module.exports = {

    index: function(req, res) {

        var params = req.params.all() || {};
        var data = {};
        data.classes = util.getClasses('homepage', params);
        data.config = util.getConfig(nook);
        data.companies = companies;

        res.view('pages/homepage/page', data);
    }

};

