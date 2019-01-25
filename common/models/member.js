'use strict';

module.exports = function(Member) {
    Member.afterRemote('login', (ctx, result, next) => {
        const RoleMapping = Member.app.models.RoleMapping;
        const Role = Member.app.models.Role;
        const Vehicle = Member.app.models.Vehicle;

        Member.findById(result.userId, (err, member) => {
            RoleMapping.find({
                    where: {
                        principalId: result.userId,
                    },
                },
                (err, mapping) => {
                    Role.findById(mapping[0].roleId, (err, role) => {
                        Vehicle.find({},
                            (err, vehicles) => {
                                const vehicle = vehicles.find(v => v.driverId = result.userId);

                                result.member = member;
                                result.vehicle = vehicle;

                                next();
                            }
                        );
                    });
                }
            );
        });
    });

    Member.afterRemote('create', (ctx, member, next) => {
        const RoleMapping = Member.app.models.RoleMapping;
        const Role = Member.app.models.Role;
        // Get role id
        Role.find({
                where: {
                    name: member.role,
                },
            },
            (err, role) => {
                if (err) throw err;
                // create a new record on rolemapping
                RoleMapping.create({
                        principalType: 'USER',
                        principalId: member.id,
                        roleId: role.id,
                    },
                    (err, principal) => {
                        if (err) throw err;
                        next();
                    }
                );
            }
        );
    });

    // Member.getRides = (id, cb) => {
    //   const Rides = Member.app.models.ride;
    //   const Company = Member.app.models.company;
    //   const Destiny = Member.app.models.destiny;

    //   Member.findById(id, (err, member) => {
    //     Rides.find(
    //       {
    //         where: {
    //           driverId: id,
    //         },
    //       },
    //       (err, rides) => {
    //         const companyIds = rides.map(ride => ride.companyId);
    //         const passengerIds = rides.map(ride => ride.passengerId);
    //         let destinyIds = [];
    //         rides
    //           .map(ride => ride.destinyIds)
    //           .forEach(destiny => {
    //             destiny.forEach(item => {
    //               if (!destinyIds.includes(item)) {
    //                 destinyIds.push(item);
    //               }
    //             });
    //           });

    //         Company.find(
    //           {
    //             where: {
    //               id: {
    //                 inq: companyIds,
    //               },
    //             },
    //           },
    //           (err, companies) => {
    //             const companiesFound = companies;
    //             Member.find(
    //               {
    //                 where: {
    //                   id: {
    //                     inq: passengerIds,
    //                   },
    //                 },
    //               },
    //               (err, passengers) => {
    //                 const passengersFound = passengers;
    //                 Destiny.find(
    //                   {
    //                     where: {
    //                       id: {
    //                         inq: destinyIds,
    //                       },
    //                     },
    //                   },
    //                   (err, destinies) => {
    //                     const destiniesFound = destinies;

    //                     const fullRides = [];

    //                     rides.forEach(ride => {
    //                       ride.company = companiesFound.filter(company => {
    //                         if (String(company.id) === ride.companyId) {
    //                           return company;
    //                         }
    //                       });

    //                       ride.passenger = passengersFound.filter(passenger => {
    //                         if (String(passenger.id) === ride.passengerId) {
    //                           return passenger;
    //                         }
    //                       });

    //                       const currentDestinies = [];

    //                       destiniesFound.forEach(destiny => {
    //                         ride.destinyIds.forEach(item => {
    //                           if (String(item) === String(destiny.id)) {
    //                             currentDestinies.push(destiny);
    //                           }
    //                         });
    //                       });

    //                       const newRide = {
    //                         companies: ride.company,
    //                         destinies: currentDestinies,
    //                         driver: member,
    //                         passenger: ride.passenger,
    //                         route: ride.route,
    //                         type: ride.type,
    //                       };

    //                       fullRides.push(newRide);
    //                     });
    //                     cb(null, fullRides);
    //                   }
    //                 );
    //               }
    //             );
    //           }
    //         );
    //       }
    //     );
    //   });
    // };

    // Member.remoteMethod('getRides', {
    //   description: 'Get driver rides.',
    //   http: {
    //     path: '/:id/rides',
    //     verb: 'get',
    //   },
    //   accepts: {
    //     arg: 'id',
    //     type: 'string',
    //   },
    //   returns: {
    //     arg: 'rides',
    //     type: 'array',
    //   },
    // });

    // Member.remoteMethod('getMembersByRole', {
    //   description: 'Get members by role.',
    //   http: {
    //     path: '/role/:id',
    //     verb: 'get',
    //   },
    //   accepts: {
    //     arg: 'id',
    //     type: 'string',
    //   },
    //   returns: {
    //     arg: 'rides',
    //     type: 'array',
    //   },
    // });
};
