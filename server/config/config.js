
// ===============================
//  Config Port Application
// ===============================

process.env.PORT = process.env.PORT || 3000;


// ===============================
//  Enviroment:
//  process.env.NODE_ENV generate by heroku.com 
//  Customize your variable and place it by env.NODE_ENV
// ===============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ===============================
// Connection DB:
// Create free db in https://mlab.com for develop
// ===============================

let urlDB;

    if (process.env.NODE_ENV === 'dev') {
        urlDB = 'mongodb://localhost:27017/users';
    }else{
        urlDB = 'mongodb://admin:dbuser_pass1337@ds115712.mlab.com:15712/users';
    }


process.env.URLDB = urlDB;