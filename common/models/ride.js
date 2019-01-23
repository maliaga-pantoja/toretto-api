'use strict';

module.exports = Ride => {
    // Ride.afterRemote('find', (ctx, rides, next) => {
    //     const Member = Ride.app.models.member;
    //     const Company = Ride.app.models.company;
    //     const Destiny = Ride.app.models.destiny;

    //     rides.forEach((ride, index) => {
    //         Member.find({}, (err, members) => {
    //             Company.findById(ride.companyId, (err, company) => {
    //                 Destiny.find({
    //                         where: {
    //                             id: {
    //                                 inq: ride.destinyIds,
    //                             },
    //                         },
    //                     },
    //                     (err, destinies) => {
    //                         console.log(destinies.length)
    //                         ride.driver = members.find(
    //                             member => String(member.id) === ride.driverId
    //                         );

    //                         ride.passenger = members.find(
    //                             member => String(member.id) === ride.passengerId
    //                         );

    //                         ride.company = company;

    //                         const destiniesFound = [];
    //                         destinies.forEach(destiny => {
    //                             destiniesFound.push(destiny);
    //                         });

    //                         ride.destinies = destiniesFound;

    //                         if (index === rides.length - 1) {
    //                             next();
    //                         }
    //                     }
    //                 );
    //             });
    //         });
    //     });
    // });

    // Ride.afterRemote('findById', (ctx, ride, next) => {
    //     const Member = Ride.app.models.member;
    //     const Company = Ride.app.models.company;
    //     const Destiny = Ride.app.models.destiny;

    //     Member.findById(ride.driverId, (err, driver) => {
    //         Member.findById(ride.passengerId, (err, passenger) => {
    //             Company.findById(ride.companyId, (err, company) => {
    //                 Destiny.find({
    //                         where: {
    //                             id: {
    //                                 inq: ride.destinyIds,
    //                             },
    //                         },
    //                     },
    //                     (err, destinies) => {
    //                         const destiniesFound = [];
    //                         destinies.forEach(destiny => {
    //                             destiniesFound.push(destiny);
    //                         });
    //                         ride.driver = driver;
    //                         ride.company = company;
    //                         ride.passenger = passenger;
    //                         ride.destinies = destiniesFound;
    //                         next();
    //                     }
    //                 );
    //             });
    //         });
    //     });
    // });
};
