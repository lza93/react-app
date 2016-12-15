const db = require('./db');
const User = require('./user');
const Role = require('./role');

console.log("USER:", User)
console.log("ROLE:", Role)

// DEFINE ALL DB RELATIONSHIPS HERE
User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });


module.exports = db;
