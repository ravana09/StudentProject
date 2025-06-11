const sample = require('express');
const { route } = require('./Routers/studentrouter');

const AppServer =sample()

AppServer.use('/api',require('./Routers/studentrouter'),require('./Routers/markrouter'))
AppServer.use('/library',require('./Routers/libraryrouter'),require('./Routers/borrowingrouter'))



module.exports=AppServer

