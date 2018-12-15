'use strict';

module.exports = Vehicle => {
  Vehicle.afterRemote('find', (ctx, vehicle, next) => {
    const Member = Vehicle.app.models.member;

    vehicle.forEach((v, index) => {
      Member.findById(v.driverId, (err, member) => {
        v.driver = member;
        if (index === vehicle.length - 1) {
          next();
        }
      });
    });
  });

  Vehicle.afterRemote('findById', (ctx, vehicle, next) => {
    const Member = Vehicle.app.models.member;

    Member.findById(vehicle.driverId, (err, member) => {
      vehicle.driver = member;
      next();
    });
  });
};
