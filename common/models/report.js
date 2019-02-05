'use strict';

module.exports = function(Report) {

    //** Get current day rides
    async function getTodayRides() {
        try {
            const Rides = Report.app.models.ride;

            const rides = await Rides.find({
                where: {
                    date: new Date()
                }
            })
            return rides;

        } catch (e) {
            return e.message;
        }
    }

    //** Get finished rides from current day
    async function getTodaysFinishedRides() {
        try {
            const Rides = Report.app.models.ride;

            const rides = await Rides.find({
                where: {
                    and: [{
                        date: new Date()
                    }, {
                        status: "2"
                    }]
                }
            })
            return rides;

        } catch (e) {
            return e.message;
        }
    }


    //** Get tomorrow rides
    async function getTomorrowRides() {
        try {
            const Rides = Report.app.models.ride;

            // Calculate tomorrow date
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const rides = await Rides.find({
                where: {
                    date: tomorrow
                }
            })
            return rides;

        } catch (e) {
            return e.message;
        }
    }



    Report.getDashboard = async () => {

        return {
            rides: {
                today: await getTodayRides(),
                finishedToday: await getTodaysFinishedRides(),
                tomorrow: await getTomorrowRides()
            },
            destinies: {
                today: 0,
                finishedToday: 0,
                finished: 0
            },
            drivers: {
                base: 0,
                additional: 0,
                yesterday: [],
                today: []
            },
            passengers: {
                total: 0,
                onBoard: 0
            },
            panic: [],


        }
    }

    Report.remoteMethod('getDashboard', {
        description: 'Get company zones',
        http: {
            path: '/dashboard',
            verb: 'get',
        },
        returns: {
            arg: 'dashboard',
            type: 'object',
        },
    });

};
