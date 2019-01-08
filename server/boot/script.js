'use strict';

module.exports = app => {
    // var Member = app.models.member;
    // var Company = app.models.company;
    // var Role = app.models.Role;
    // var RoleMapping = app.models.RoleMapping;
    // var Vehicle = app.models.vehicle;

    // RoleMapping.belongsTo(Member);
    // Member.hasMany(RoleMapping, {
    //     foreignKey: 'principalId',
    // });
    // Role.hasMany(Member, {
    //     through: RoleMapping,
    //     foreignKey: 'roleId',
    // });

    //   Company.create(
    //       [{
    //           name: 'Compañia 1',
    //         },
    //         {
    //           name: 'Compañia 2',
    //         },
    //         {
    //           name: 'Compañia 3',
    //         },
    //         {
    //           name: 'Compañia 4',
    //         },
    //       ],
    //         (err, companies) => {
    //           Member.create(
    //               [{
    //                   companyId: companies[0].id,
    //                   username: 'Giacomo',
    //                   name: 'Giacomo',
    //                   lastname: 'Giacomo',
    //                   email: 'admin@admin.com',
    //                   password: '123123a',
    //                 },
    //                 {
    //                   companyId: companies[0].id,
    //                   username: 'Hugo',
    //                   name: 'Hugo',
    //                   lastname: 'Hugo',
    //                   email: 'contacto_admin@company.com',
    //                   password: '123123a',
    //                 },
    //                 {
    //                   companyId: companies[0].id,
    //                   username: 'Pedro',
    //                   name: 'Pedro',
    //                   lastname: 'Pedro',
    //                   email: 'contacto@seguridad.com',
    //                   password: '123123a',
    //                 },
    //                 {
    //                   companyId: companies[0].id,
    //                   username: 'Paco',
    //                   name: 'Paco',
    //                   lastname: 'Paco',
    //                   email: 'chofer@company.com',
    //                   password: '123123a',
    //                 },
    //                 {
    //                   companyId: companies[0].id,
    //                   username: 'Luis',
    //                   name: 'Luis',
    //                   lastname: 'Luis',
    //                   email: 'pasajero@hospital.com',
    //                   password: '123123a',
    //                 },
    //               ],
    //                 (err, members) => {
    //                   if (err) throw err;

    //                     // create the admin role
    //                   Role.create({
    //                       name: 'admin',
    //                     },
    //                         (err, role) => {
    //                           if (err) throw err;

    //                             // make Giacomo an admin
    //                           role.principals.create({
    //                               principalType: RoleMapping.USER,
    //                               principalId: members[0].id,
    //                             },
    //                                 (err, principal) => {
    //                                   if (err) throw err;
    //                                 }
    //                             );
    //                         }
    //                     );

    //                     // create the contact_admin role
    //                   Role.create({
    //                       name: 'contact_admin',
    //                     },
    //                         (err, role) => {
    //                           if (err) throw err;

    //                             // make Giacomo an admin
    //                           role.principals.create({
    //                               principalType: RoleMapping.USER,
    //                               principalId: members[1].id,
    //                             },
    //                                 (err, principal) => {
    //                                   if (err) throw err;
    //                                 }
    //                             );
    //                         }
    //                     );
    //                     // create the contact role
    //                   Role.create({
    //                       name: 'contact',
    //                     },
    //                         (err, role) => {
    //                           if (err) throw err;

    //                             // make Giacomo an admin
    //                           role.principals.create({
    //                               principalType: RoleMapping.USER,
    //                               principalId: members[2].id,
    //                             },
    //                                 (err, principal) => {
    //                                   if (err) throw err;
    //                                 }
    //                             );
    //                         }
    //                     );
    //                     // create the driver role
    //                   Role.create({
    //                       name: 'driver',
    //                     },
    //                         (err, role) => {
    //                           if (err) throw err;

    //                             // make Giacomo an admin
    //                           role.principals.create({
    //                               principalType: RoleMapping.USER,
    //                               principalId: members[3].id,
    //                             },
    //                                 (err, principal) => {
    //                                   if (err) throw err;
    //                                 }
    //                             );
    //                         }
    //                     );
    //                     // create the passenger role
    //                   Role.create({
    //                       name: 'passenger',
    //                     },
    //                         (err, role) => {
    //                           if (err) throw err;

    //                             // make Giacomo an admin
    //                           role.principals.create({
    //                               principalType: RoleMapping.USER,
    //                               principalId: members[4].id,
    //                             },
    //                                 (err, principal) => {
    //                                   if (err) throw err;
    //                                 }
    //                             );
    //                         }
    //                     );

    //                   Vehicle.create({
    //                       color: 'Gris',
    //                       created_at: new Date(),
    //                       driverId: members[3].id,
    //                       km: '90000',
    //                       model: 'Sentra',
    //                       numberChasis: '981273',
    //                       numberMotor: '812637',
    //                       plate: 'ABC-123',
    //                       soat: '761523761',
    //                       soatName: 'Rimac',
    //                       status: true,
    //                       tradeMark: 'Nissan',
    //                       type: 'Coupé',
    //                       year: '2015',
    //                     });

    //                   Vehicle.create({
    //                       color: 'Negro',
    //                       created_at: new Date(),
    //                       driverId: members[3].id,
    //                       km: '90000',
    //                       model: 'Yaris',
    //                       numberChasis: '951273',
    //                       numberMotor: '813637',
    //                       plate: 'ABD-123',
    //                       soat: '761553761',
    //                       soatName: 'Rimac',
    //                       status: true,
    //                       tradeMark: 'Toyota',
    //                       type: 'Coupé',
    //                       year: '2014',
    //                     });
    //                   Vehicle.create({
    //                       color: 'Rojo',
    //                       created_at: new Date(),
    //                       driverId: members[3].id,
    //                       km: '90000',
    //                       model: 'Model S',
    //                       numberChasis: '951273',
    //                       numberMotor: '813637',
    //                       plate: 'ABD-123',
    //                       soat: '761553761',
    //                       soatName: 'Rimac',
    //                       status: true,
    //                       tradeMark: 'Tesla',
    //                       type: 'Coupé',
    //                       year: '2016',
    //                     });
    //                 }
    //             );
    //         }
    //     );
};
