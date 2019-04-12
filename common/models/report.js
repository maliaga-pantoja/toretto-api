'use strict';

module.exports = function(Report) {

    //** Get current day rides
    async function getTotalTodayRides(companyId) {
        try {
            const Rides = Report.app.models.ride;
            const start = getDate('start');
            const end = getDate('end');

            let rides = await Rides.find({
                where: {
                    date: {
                        between: [start, end]
                    }
                }
            });

            rides = companyId ?
                rides.filter(r => String(r.companyId) === companyId) :
                rides;

            return {
                total: rides.length,
                rides: rides
            };

        } catch (e) {
            return e.message;
        }
    }

    //** Get finished rides from current day
    async function getTotalTodaysFinishedRides(companyId) {
        try {
            const Rides = Report.app.models.ride;
            const start = getDate('start');
            const end = getDate('end');

            let rides = await Rides.find({
                where: {
                    and: [{
                            date: {
                                between: [start, end]
                            }
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

            return {
                total: rides.length,
                rides: rides
            };
        } catch (e) {
            return e.message;
        }
    }

    //** Get tomorrow rides
    async function getTotalTomorrowRides(companyId) {
        try {
            const Rides = Report.app.models.ride;
            const start = getDate('startTomorrow');
            const end = getDate('endTomorrow');

            let rides = await Rides.find({
                where: {
                    date: {
                        between: [start, end]
                    }
                }
            });

            rides = companyId ?
                rides.filter(r => String(r.companyId) === companyId) :
                rides;

            return {
                total: rides.length,
                rides: rides
            };

        } catch (e) {
            return e.message;
        }
    }

    //** Get total destinies from today  */
    async function getTotalTodayDestinies(companyId) {
        try {
            const today = await getTotalTodayRides(companyId);
            let destinies = 0;

            today.rides.map(ride => {
                destinies += ride.destinyIds.length;
            })

            return destinies;

        } catch (e) {
            return e.message;
        }
    }

    //** Get finished destinies from current day
    async function getTodaysFinishedDestinies(companyId) {
        try {
            const today = await getTotalTodaysFinishedRides(companyId);
            let destinies = 0;

            today.rides.map(ride => {
                destinies += ride.destinyIds.length;
            })

            return destinies;

        } catch (e) {
            return e.message;
        }
    }

    //** Get total destinies from tomorrow  */
    async function getTotalTomorrowDestinies(companyId) {
        try {
            const today = await getTotalTomorrowRides(companyId);
            let destinies = 0;

            today.rides.map(ride => {
                destinies += ride.destinyIds.length;
            })

            return destinies;

        } catch (e) {
            return e.message;
        }
    }

    //** Get total fixed rides from current day*/
    async function getTotalFixedRides(companyId, type) {
        try {
            const today = await getTotalTodayRides(companyId);

            const fixedRides = today.rides.filter(ride => ride.type === type);

            return fixedRides.length;

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

    //** Get total onboard passengers*/
    async function getTotalOnboardPassengers(companyId) {
        try {
            const todayRides = await getTotalTodayRides(companyId);

            todayRides = companyId ?
                todayRides.filter(r => String(r.companyId) === companyId) :
                todayRides;

            activeRides = todayRides.filter(r => r.status === 1);

            return activeRides.length;

        } catch (e) {
            return e.message
        }
    }

    Report.getDashboard = async companyId => {
        return {
            rides: {
                today: (await getTotalTodayRides(companyId)).total,
                finishedToday: (await getTotalTodaysFinishedRides(companyId)).total,
                tomorrow: (await getTotalTomorrowRides(companyId)).total
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
                onBoard: await getTotalOnboardPassengers(companyId),
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

// helper function for get proper date
function getDate(type) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    switch (type) {
        case 'start':
            return start;
            break;

        case 'end':
            return end;
            break;

        case 'startTomorrow':
            return start.setDate(start.getDate() + 1);
            break;

        case 'endTomorrow':
            return end.setDate(end.getDate() + 1);
            break;
    }
}
