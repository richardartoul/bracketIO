var Sequelize = require("sequelize");

//no password
var connect = function(dbPath) {
	var sequelize = new Sequelize('database', 'root', '', {
		host:'localhost',
		dialect: 'sqlite',

		//not sure exactly what this does, copying config documentation
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},

		logging: false,

		storage: dbPath
	});

	return sequelize;
}

//construct is just a boolean input - allows same function to be used for testing and the actual server
var createSchemas = function(dbConnection, construct) {
	var tableConfig = {
		underscored: true,
		timestamps: true,
		freezeTableName: false
	}

	var User = require('./db/models/User')(dbConnection, tableConfig);
	var League = require('./db/models/League')(dbConnection, tableConfig);
	var LeagueCharacter = require('./db/models/LeagueCharacter')(dbConnection, tableConfig);
	var LeagueEvent = require('./db/models/LeagueEvent')(dbConnection, tableConfig);
	var UserLeague = require('./db/models/UserLeague')(dbConnection, tableConfig);
	var UserRoster = require('./db/models/UserRoster')(dbConnection, tableConfig);
	var CharacterEvent = require('./db/models/CharacterEvent')(dbConnection, tableConfig);

	// associations - define relationships between tables here
	LeagueCharacter.belongsTo(League)
	League.hasMany(LeagueCharacter)

	//user league associations
	User.belongsToMany(League, { through: UserLeague })
	League.belongsToMany(User, { through: UserLeague })

	//league event associatoons
	LeagueEvent.belongsTo(League);
	League.hasMany(LeagueEvent);

	//associations for the CharacterEvent table
	CharacterEvent.belongsTo(League);
	CharacterEvent.belongsTo(LeagueCharacter);
	CharacterEvent.belongsTo(LeagueEvent);
	League.hasMany(CharacterEvent);
	LeagueCharacter.hasMany(CharacterEvent);
	LeagueEvent.hasMany(CharacterEvent);

	//Basically check if tables exists, if not, creates it
	if (construct) {
		User.sync();
		UserLeague.sync();
		UserRoster.sync();
		League.sync();
		LeagueCharacter.sync();
		LeagueEvent.sync();
		CharacterEvent.sync();
	}

	return {
		User: User,
		League: League,
		LeagueCharacter: LeagueCharacter,
		LeagueEvent: LeagueEvent,
		UserLeague: UserLeague,
		UserRoster: UserRoster,
		CharacterEvent: CharacterEvent
	}
}

exports.connect = connect;
exports.createSchemas = createSchemas;


