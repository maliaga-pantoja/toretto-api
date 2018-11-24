'use strict';
var loopback = require('loopback');

module.exports = function(Member) {
  Member.validatesInclusionOf('role', {in: ['admin', 'driver', 'company_contact', 'company_admin']});
  Member.photo_upload = async (req) => {
    try {
      const cloudinary = req.cloudinary;

      return 'ok'
    } catch (e) {
      return e.message
    }
  }
  Member.remoteMethod('photo_upload', {
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } }, // pass the request object to remote method
    ],
    returns: { root: true, type: 'object' },
    http: { path: '/upload_photo', verb: 'post' },
  });
  Member.observe('before save', (ctx, next) => {
    next()
  }) 
};
