'use strict';

module.exports = function(Super) {
  Super.afterRemote('create', async (context, saved, next) => {
    try {
      const Role = Super.app.models.Role;
      const RoleMapping = Super.app.models.RoleMapping;
      //getting role id
      const role = await Role.find({
        limit: 1,
        where: {
          name: 'admin'
        }
      })
      const x = await role[0].principals.create({
        principalType: RoleMapping.USER,
        principalId: saved.id
      });
      console.log(1)
    }  catch (e) {
      console.log(e)
    }
  });
};
