const {Sequelize, Model, DataTypes} = require("sequelize");
const sequelize = require("../dbconfig/database");

const Course = sequelize.define("courses", {
    courseId: {
        // type:DataTypes.INTEGER,
        // autoIncrement:true,
        // allowNull:false,
        // primaryKey:true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        require: true
    },
    price: {
        type: DataTypes.STRING,
        require: true
    },
    description: {
        type: DataTypes.STRING,
    },
    courseDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});

sequelize.sync({force: false});

module.exports = Course;



