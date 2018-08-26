'use strict';

module.exports = function(Autochofer) {
  Autochofer.validatesPresenceOf('roleName');
  Autochofer.validatesInclusionOf('roleName', {in: ['conductor', 'empresa']});
  // validate phone
  Autochofer.validatesLengthOf('phone', {min: 9, max: 11, message: {min: 'Phone is too short', max: 'Phone is too long'}});
  // validate dni
  Autochofer.validatesLengthOf('dni', {length: 8, message: {length: 'Dni must have only 8 digits'}});
  Autochofer.afterRemote('create', async (context, saved, next) => {
    try {
      const Role = Autochofer.app.models.Role;
      const RoleMapping = Autochofer.app.models.RoleMapping;
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
      console.log(e)
    }
  });
};
