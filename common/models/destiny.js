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

    Destiny.getDestiniesByCompany = (companyId, cb) => {
        Destiny.find({},
            (err, destinies) => {

                destinies = destinies.filter(destiny => String(destiny.companyId) === companyId);

                cb(null, destinies);
            }
        );
    };

    Destiny.getDestiniesByZone = (companyId, zoneId, cb) => {
        Destiny.find({},
            (err, destinies) => {

                destinies = destinies.filter(destiny => String(destiny.companyId) === companyId);
                destinies = destinies.filter(destiny => destiny.zone === zoneId);

                cb(null, destinies);
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

    Destiny.remoteMethod('getDestiniesByCompany', {
        description: 'Get destinies by company',
        http: {
            path: '/company/:id',
            verb: 'get',
        },
        accepts: {
            arg: 'id',
            type: 'string',
        },
        returns: {
            arg: 'destinies',
            type: 'array',
        },
    });

    Destiny.remoteMethod('getDestiniesByZone', {
        description: 'Get destinies by company and zone',
        http: {
            path: '/company/:id/:zone',
            verb: 'get',
        },
        accepts: [{
            arg: 'id',
            type: 'string',
        }, {
            arg: 'zone',
            type: 'string',
        }],
        returns: {
            arg: 'destinies',
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
