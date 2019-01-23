'use strict';

module.exports = Destiny => {
    Destiny.getZones = (cb) => {
        Destiny.find({},
            (err, destinies) => {
                const zones = [];
                destinies.forEach(destiny => {
                    if (!zones.includes(destiny.zone)) {
                        zones.push(destiny.zone);
                    }
                });
                cb(null, zones);
            }
        );
    };

    Destiny.remoteMethod('getZones', {
        description: 'Get destiny zones',
        http: {
            path: '/zones',
            verb: 'get',
        },
        returns: {
            arg: 'zones',
            type: 'array',
        },
    });
    // Destiny.afterRemote('find', (ctx, destiny, next) => {
    //   const Company = Destiny.app.models.company;

    //   destiny.forEach((v, index) => {
    //     Company.findById(v.companyId, (err, company) => {
    //       v.company = company;
    //       if (index === destiny.length - 1) {
    //         next();
    //       }
    //     });
    //   });
    // });

    // Destiny.afterRemote('findById', (ctx, destiny, next) => {
    //   const Company = Destiny.app.models.company;

    //   Company.findById(destiny.companyId, (err, company) => {
    //     destiny.company = company;
    //     next();
    //   });
    // });
};
