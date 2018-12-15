'use strict';

module.exports = Ride => {
  Ride.afterRemote('find', (ctx, ride, next) => {
    const Company = Ride.app.models.company;

    ride.forEach((v, index) => {
      Company.findById(v.companyId, (err, company) => {
        v.company = company;
        if (index === ride.length - 1) {
          next();
        }
      });
    });
  });

  Ride.afterRemote('findById', (ctx, ride, next) => {
    const Member = Ride.app.models.member;
    const Company = Ride.app.models.company;
    const Destiny = Ride.app.models.destiny;

    Member.findById(ride.driverId, (err, driver) => {
      Member.findById(ride.passengerId, (err, passenger) => {
        Company.findById(ride.companyId, (err, company) => {
          Destiny.find(
            {
              where: {
                id: {
                  inq: ride.destinyIds,
                },
              },
            },
            (err, destinies) => {
              const destiniesFound = [];
              destinies.forEach(d => {
                destiniesFound.push(d);
              });
              ride.driver = driver;
              ride.company = company;
              ride.passenger = passenger;
              ride.destinies = destiniesFound;
              next();
            }
          );
        });
      });
    });

    Company.findById(ride.companyId, (err, company) => {
      ride.company = company;
    });
  });
};
