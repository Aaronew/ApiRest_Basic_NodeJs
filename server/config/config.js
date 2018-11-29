
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
        urlDB = 'CONNECTION  FOR LOCAL DB';
    }else{
        urlDB = 'CONNECTION  FOR DB';
    }


process.env.URLDB = urlDB;