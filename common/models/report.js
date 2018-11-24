'use strict';

module.exports = function(Report) {
  async function members_enabled_in_company (company) {
    try {
      const Model = Report.app.models.Member;
      let query = null;
      if (company) {
        query = [
          {
            company: company
          },
          {
            status: true
          },
        ]
      } else {
        query = [
          {
            status: true
          },
        ]
      }
      const members = await Model.find({
        where: {
          and: query
        }
      })
      let enable = 0, disable = 0;
      members.forEach(ride => {
        if (ride.status == true) {
          enable ++
        } else {
          disable++
        }
      });
      return {
        total: members.length,
        enable, disable
      };
    } catch (e) {
      return e.message;
    }
  }
  async function travels_in_date_range (company, from, to, cb) {
    try {
      const yesterday = from || `${new Date().getFullYear()}-${new Date().getMonth() +1 }-${new Date().getDate() -1}`
      const tomorrow = to || `${new Date().getFullYear()}-${new Date().getMonth() +1 }-${new Date().getDate() +1}`
      const Model = Report.app.models.Travel;
      let query = null;
      if (company) {
        query = [
          {
            company: company
          },
          {
            created_at: {
              gt: new Date(yesterday)
            }
          },
          {
            created_at: {
              lt: new Date(tomorrow)
            }
          },
        ]
      } else {
        query = [
          {
            created_at: {
              gt: new Date(yesterday)
            }
          },
          {
            created_at: {
              lt: new Date(tomorrow)
            }
          },
        ]
      }
      const travels = await Model.find({
        where: {
          and: query
        }
      })
      let done = 0, pendent = 0,  in_progress = 0;
      travels.forEach(travel => {
        if (travel.status == 0) {
          pendent ++
        } else if (travel.status == 1) {
          in_progress++
        } else {
          done++
        }
      });
      return {
        total: travels.length,
        done, pendent, in_progress
      };
    } catch (e) {
      return e.message;
    }
  }
  async function rides_in_date_range (company, from, to, cb) {
    try {
      const yesterday = from || `${new Date().getFullYear()}-${new Date().getMonth() +1 }-${new Date().getDate() -1}`
      const tomorrow = to || `${new Date().getFullYear()}-${new Date().getMonth() +1 }-${new Date().getDate() +1}`
      const Model = Report.app.models.Ride;
      let query = null;
      if (company) {
        query = [
          {
            company: company
          },
          {
            created_at: {
              gt: new Date(yesterday)
            }
          },
          {
            created_at: {
              lt: new Date(tomorrow)
            }
          },
        ]
      } else {
        query = [
          {
            created_at: {
              gt: new Date(yesterday)
            }
          },
          {
            created_at: {
              lt: new Date(tomorrow)
            }
          },
        ]
      }
      const rides = await Model.find({
        where: {
          and: query
        }
      })
      let done = 0, pendent = 0,  in_progress = 0;
      rides.forEach(ride => {
        if (ride.status == 0) {
          pendent ++
        } else if (ride.status == 1) {
          in_progress++
        } else {
          done++
        }
      });
      return {
        total: rides.length,
        done, pendent, in_progress
      };
    } catch (e) {
      return e.message;
    }
  }
  async function events_in_date (company, from, to, cb) {
    try {
      const yesterday = from || `${new Date().getFullYear()}-${new Date().getMonth() +1 }-${new Date().getDate() -1}`
      const tomorrow = to || `${new Date().getFullYear()}-${new Date().getMonth() +1 }-${new Date().getDate() +1}`
      const Model = Report.app.models.Event;
      let query = null;
      if (company) {
        query = [
          {
            company: company
          },
          {
            created_at: {
              gt: new Date(yesterday)
            }
          },
          {
            created_at: {
              lt: new Date(tomorrow)
            }
          },
        ]
      } else {
        query = [
          {
            created_at: {
              gt: new Date(yesterday)
            }
          },
          {
            created_at: {
              lt: new Date(tomorrow)
            }
          },
        ]
      }
      const events = await Model.find({
        where: {
          and: query
        }
      })
      let passenger_up = 0, passengers_down = 0, passenger_count = 0;
      events.forEach(event => {
        event.customers.forEach(customer => {
          passenger_count ++;
          if (customer.status == 0) {
            passenger_up ++
          } else {
            passengers_down++
          }
        })
      });
      return {
        passenger_count, passenger_up, passengers_down
      };
    } catch (e) {
      return e.message;
    }
  }
  Report.dashboard = async (company, from, to) => {
    try {
      let members_enabled_in_company_f = await members_enabled_in_company(company);
      let travels_in_date_range_f = await travels_in_date_range(company, from, to);
      let rides_in_date_range_f = await rides_in_date_range(company, from, to);
      let events_in_date_f = await events_in_date(company, from, to);
      return {
        members_enabled_in_company: members_enabled_in_company_f,
        travels_in_date_range: travels_in_date_range_f,
        rides_in_date_range: rides_in_date_range_f,
        events_in_date: events_in_date_f
      }
    } catch (e) {
      return e.message
    }
  }
  Report.remoteMethod('dashboard', {
    accepts: [
      {arg: 'company', type: 'string', required: false, description: "company id. If not set, get all"},
      {arg: 'from', type: 'string', required: false, description: "format: YYYY-MM-DD. If not set, default yesterday date"},
      {arg: 'to', type: 'string', required: false, description: "format: YYYY-MM-DD. If not set, default tomorrow date"}
    ],
    description: "get all members from company",
    http: {
      verb: "get"
    },
    returns: {root: true, type: 'object'}
  });
  //
  Report.report = async (company, from, to) => {
    try {
      if (!company) {
        return 'from and to are required';
      } else {
        const CompanyModel = Report.app.models.Company;
        const TravelModel = Report.app.models.Travel;
        const RideModel = Report.app.models.Ride;
        const VehicleModel = Report.app.models.Vehicle;
        const EventModel = Report.app.models.Event;

        let CompanyData = await CompanyModel.find({
          where: {
            id: company
          }
        })
        CompanyData = CompanyData.map(async companyItem => {
          //getting travels
          let travels = await TravelModel.find({
            where: {
              companyId: company,
              //include: ['member', 'company']
            }
          });
          // getting rides
          const travel_ids = travels.map(travel => {
            return travel.id
          })
          let rides = await RideModel.find({
            include: {
              relation: 'travel',
              scope: {
                where: {
                  id: {
                    '$in': travel_ids
                  }
                }
              }
            }
          })
          //getting events
          let events = await EventModel.find({
            where: {
              ride: rides.map(ride => {
                return ride.id
              })
            }
          })
          console.log(0)
          /*
          // getting rides
          travels = await new Promise((resolve, reject) => {
            const p = travels.map(async travel => {
              let rides = await RideModel.find({
                travel: travel,
                include: ['member']
              });
              rides = await new Promise((resolve, reject) => {
                let ridesData = rides.map(async ride => {
                  let events = await EventModel.find({
                    where: {
                      rideId: ride.id
                    }
                  });
                  ride.events = events;
                  return ride;
                })
                return Promise.all(ridesData);
              })
              travel.rides = rides;
              return travel;
            });
            resolve(Promise.all(p));
          })
          companyItem.travels = travels;
          return companyItem; */
        });
      }
    } catch (e) {
      return e.message
    }
  }
  Report.remoteMethod('report', {
    accepts: [
      {arg: 'company', type: 'string', required: false, description: "company id. If not set, get all"},
      {arg: 'from', type: 'string', required: false, description: "format: YYYY-MM-DD. If not set, default yesterday date"},
      {arg: 'to', type: 'string', required: false, description: "format: YYYY-MM-DD. If not set, default tomorrow date"}
    ],
    description: "get all members from company",
    http: {
      verb: "get"
    },
    returns: {root: true, type: 'object'}
  });

};
