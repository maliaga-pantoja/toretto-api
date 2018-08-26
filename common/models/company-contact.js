'use strict';

module.exports = function(Companycontact) {
  Companycontact.validatesPresenceOf('roleName');
  Companycontact.validatesInclusionOf('roleName', {in: ['conductor', 'empresa']});
  // validate phone
  Companycontact.validatesLengthOf('phone', {min: 9, max: 11, message: {min: 'Phone is too short', max: 'Phone is too long'}});
  // validate dni
  Companycontact.validatesLengthOf('dni', {length: 8, message: {length: 'Dni must have only 8 digits'}});
  Companycontact.afterRemote('create', async (context, saved, next) => {
    try {
      const Role = Companycontact.app.models.Role;
      const RoleMapping = Companycontact.app.models.RoleMapping;
      //getting role id
      const role = await Role.find({
        limit: 1,
        where: {
          name: saved.roleName
        }
      })
      await role[0].principals.create({
        principalType: RoleMapping.USER,
        principalId: saved.id
      });
    }  catch (e) {
      next(e)
    }
  });
};
