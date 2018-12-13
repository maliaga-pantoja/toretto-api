// User.create([
//   {username: 'John', email: 'john@doe.com', password: 'opensesame'},
//   {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
//   {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
// ], function(err, users) {
//   if (err) return cb(err);

//   //create the admin role
//   Role.create({
//     name: 'admin'
//   }, function(err, role) {
//     if (err) cb(err);

//     //make bob an admin
//     role.principals.create({
//       principalType: RoleMapping.USER,
//       principalId: users[2].id
//     }, function(err, principal) {
//       cb(err);
//     });
//   });
// });
