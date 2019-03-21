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

            rides = companyId ?
                rides.filter(r => String(r.companyId) === companyId) :
                rides;

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

            rides = companyId ?
                rides.filter(r => String(r.companyId) === companyId) :
                rides;

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

    //** Get finished destinies from current day
    async function getTodaysFinishedDestinies(companyId) {
        try {
            const todayRides = await getTodaysFinishedRides(companyId);

            let totalTodayFinishedDestinies = 0;

            todayRides = companyId ?
                todayRides.filter(r => String(r.companyId) === companyId) :
                todayRides;

            todayRides.forEach(ride => {
                totalTodayFinishedDestinies += ride.destinyIds.length;
            });

            return totalTodayFinishedDestinies;

        } catch (e) {
            return e.message;
        }
    }

    //** Get total destinies from tomorrow  */
    async function getTotalTomorrowDestinies(companyId) {
        try {
            const Destinies = Report.app.models.destinies

            // Calculate tomorrow date
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const destinies = await Destinies.find({
                where: {
                    date: tomorrow
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
                finishedToday: await getTodaysFinishedDestinies(companyId),
                tomorrow: await getTotalTomorrowDestinies(companyId)
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
