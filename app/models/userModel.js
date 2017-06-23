var Q = require('q');

var auctionDb = require('../../app-helpers/dbHelper');

module.exports = {
    // create: function (user, callback) {
    //     // var salt = bcrypt.genSaltSync(saltRounds);
    //     // user.password = bcrypt.hashSync(user.password, salt);
    //     db.query('insert into users(name, username, email, phone, password) values ($1, $2,$3,$4,$5)',
    //         [user.name, user.username, user.email, user.phonenumber, user.password],
    //         function (err, result) {
    //             callback(err);
    //         });


    // },
    // getUserByUserName: function (username, callback) {
    //     db.query('select * from users where username = $1', [username],
    //         function (err, result) {

    //             callback(err, result.rows[0]);
    //         });

    // },
    getUserByEmail: function (email) {
        var deffered = Q.defer();
        var sql = 'select * from clients where Email = ' + '\'' + email + '\'';
        auctionDb.load(sql).then(function (rows) {
            deffered.resolve(rows[0]);
        });
        return deffered.promise;
    },
    getUserByID: function (id, callback) {
        var deffered = Q.defer();
        var sql = 'select * from clients where ID = ' + id;
        auctionDb.load(sql).then(function (rows) {
            deffered.resolve(rows[0]);
        });
        return deffered.promise;
    }
    // getAllUsers: function (curr_id, callback) {
    //     db.query('select id,name,username,email,phone from  users where id <> $1 and id not in(select user2 from friends where user1 = $1)', [curr_id],
    //         function (err, result) {
    //             callback(err, result.rows);
    //         });
    // },

    // getFriends: function (curr_id, callback) {
    //     db.query('select id,name,username,email,phone from  users u  join friends f on f.user2 = u.id where user1 = $1', [curr_id],
    //         function (err, result) {
    //             callback(err, result.rows);
    //         });
    // },
    // addFriend: function (id_user, id_added, callback) {
    //     console.log(id_user);
    //     console.log(id_added);
    //     db.query('insert into friends(user1, user2) values ($1, $2)', [id_user, id_added],
    //         function (err, result) {
    //             callback(err);
    //         });
    // }
};