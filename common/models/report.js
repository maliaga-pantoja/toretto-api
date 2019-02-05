'use strict';

module.exports = function(Report) {

    //** Get rides from current day
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

    //** Get rides from current day
    async function getTodayFinishedRides() {
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



    Report.getDashboard = async () => {

        return {
            rides: {
                today: await getTodayRides(),
                todayFinished: await getTodayFinishedRides()
            }


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
