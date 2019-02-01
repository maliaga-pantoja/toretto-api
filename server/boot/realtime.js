var es = require('event-stream');
module.exports = function(app) {

    var Panic = app.models.panic;

    Panic.createChangeStream(function(err, changes) {
        changes.pipe(es.stringify()).pipe(process.stdout);
    });

    // Panic.create({
    //     foo: 'bar'
    // });
}
