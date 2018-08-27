'use strict';

module.exports = function(Member) {
  Member.validatesInclusionOf('role', {in: ['admin', 'driver', 'company_contact']});
};
