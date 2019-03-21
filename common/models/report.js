'use strict';

module.exports = function(Report) {
    //** Get current day rides
    async function getTodayRides(companyId) {
        try {
            const Rides = Report.app.models.ride;

            let rides = await Rides.find({
                where: {
                    date: new Date()
                }
            });

            rides = companyId ?
                rides.filter(r => String(r.companyId) === companyId) :
                rides;

            return rides.length;

        } catch (e) {
            return e.message;
        }
    }

    //** Get finished rides from current day
    async function getTodaysFinishedRides(companyId) {
        try {
            const Rides = Report.app.models.ride;

            const rides = await Rides.find({
                where: {
                    and: [{
                            date: new Date()
                        },
                        {
                            status: '2'
                        }
                    ]
                }
            });
            return rides.length;
        } catch (e) {
            return e.message;
        }
    }

    //** Get tomorrow rides
    async function getTomorrowRides(companyId) {
        try {
            const Rides = Report.app.models.ride;

            // Calculate tomorrow date
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const rides = await Rides.find({
                where: {
                    date: tomorrow
                }
            });
            return rides.length;
        } catch (e) {
            return e.message;
        }
    }

    //** Get total destinies from today  */
    async function getTotalTodayDestinies(companyId) {

        try {
            const Destinies = Report.app.models.destinies

            const destinies = await Destinies.find({
                where: {
                    date: new Date()
                }
            });

            destinies = companyId ?
                destinies.filter(d => String(d.companyId) === companyId) :
                destinies;

            return destinies.length;

        } catch (e) {
            return e.message;
        }
    }

    Report.getDashboard = async companyId => {
        return {
            rides: {
                today: await getTodayRides(companyId),
                finishedToday: await getTodaysFinishedRides(companyId),
                tomorrow: await getTomorrowRides(companyId)
            },
            destinies: {
                today: await getTotalTodayDestinies(companyId),
                finishedToday: 0,
                tomorrow: 0
            },
            mobile: {
                base: 0,
                additional: 0,
                baseTomorrow: 0,
                additionalTomorrow: 0
            },
            passengers: {
                today: 0,
                onBoard: 0,
                tomorrow: 0
            }
        };
    };

    Report.remoteMethod('getDashboard', {
        description: 'Get dashboard',
        http: {
            path: '/dashboard',
            verb: 'get'
        },
        accepts: {
            arg: 'companyId',
            type: 'string',
            required: false,
            description: 'CompanyId Id. If not set, get all data.'
        },
        returns: {
            root: true,
            type: 'object'
        }
    });
};
