'use strict';

module.exports = Company => {
    Company.getZones = (id, cb) => {
        const Destiny = Company.app.models.destiny;
        Destiny.find({},
            (err, destinies) => {

                destinies = destinies.filter(d => String(d.companyId) === id);

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

    Company.remoteMethod('getZones', {
        description: 'Get company zones',
        http: {
            path: '/:id/zones',
            verb: 'get',
        },
        accepts: {
            arg: 'id',
            type: 'string',
        },
        returns: {
            arg: 'zones',
            type: 'array',
        },
    });
};
