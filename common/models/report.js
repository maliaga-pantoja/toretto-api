'use strict';

module.exports = function(Report) {

    //** Get current day rides
    async function getTotalTodayRides(companyId) {
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
    async function getTotalTodaysFinishedRides(companyId) {
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
    async function getTotalTomorrowRides(companyId) {
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
            const todayRides = await getTotalTodaysFinishedRides(companyId);

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

    //** Get total fixed rides from current day*/
    async function getTotalFixedRides(companyId, type) {
        try {
            const Rides = Report.app.models.ride;

            let rides = await Rides.find({
                where: {
                    date: new Date(),
                    type: type
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

    //** Get total fixed rides from tomorrow*/
    async function getTotalTomorrowFixedRides(companyId, type) {
        try {
            const Rides = Report.app.models.ride;

            // Calculate tomorrow date
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            let rides = await Rides.find({
                where: {
                    date: tomorrow,
                    type: type
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

    //** Get total passengers from current day */
    async function getTotalPassengers(companyId) {
        try {
            const todayRides = await getTotalTodayRides(companyId);

            todayRides = companyId ?
                todayRides.filter(r => String(r.companyId) === companyId) :
                todayRides;

            const passengers = todayRides.filter((ride, i) => names.passengerId.indexOf(ride) === i)

            const uniquePassengerId = [...new Set(passengers.map(passenger => passenger.passengerId))];

            return uniquePassengerId.length;

        } catch (e) {
            return e.message;
        }
    }

    //** Get total passengers from tomorrow */
    async function getTotalTomorrowPassengers(companyId) {
        try {
            const todayRides = await getTotalTomorrowRides(companyId);

            todayRides = companyId ?
                todayRides.filter(r => String(r.companyId) === companyId) :
                todayRides;

            const passengers = todayRides.filter((ride, i) => names.passengerId.indexOf(ride) === i)

            const uniquePassengerId = [...new Set(passengers.map(passenger => passenger.passengerId))];

            return uniquePassengerId.length;

        } catch (e) {
            return e.message;
        }
    }

    Report.getDashboard = async companyId => {
        return {
            rides: {
                today: await getTotalTodayRides(companyId),
                finishedToday: await getTotalTodaysFinishedRides(companyId),
                tomorrow: await getTotalTomorrowRides(companyId)
            },
            destinies: {
                today: await getTotalTodayDestinies(companyId),
                finishedToday: await getTodaysFinishedDestinies(companyId),
                tomorrow: await getTotalTomorrowDestinies(companyId)
            },
            mobile: {
                fixed: await getTotalFixedRides(companyId, 'fijo'),
                additional: await getTotalFixedRides(companyId, 'adicional'),
                baseTomorrow: await getTotalTomorrowFixedRides(companyId, 'fijo'),
                additionalTomorrow: await getTotalTomorrowFixedRides(companyId, 'adicional'),
            },
            passengers: {
                today: await getTotalPassengers(companyId),
                onBoard: await getTotalTomorrowPassengers(companyId),
                tomorrow: await getTotalTomorrowPassengers(companyId)
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
