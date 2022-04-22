const postgres = require('postgres');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("calendardb", "sqlite", "sqlite", {
    dialect: "sqlite",
    storage: "./database/database.sqlite"
  });

  try {
    sequelize.authenticate().then(()=> {
        console.log('Connection has been established successfully.');
    });
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

module.exports = sequelize;