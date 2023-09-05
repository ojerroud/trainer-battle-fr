const validZoneKeys = [
	'NEILOPOLIS',
	'HEDAK',
	'VALLEE ARC',
	'FORET BRUMEUSE',
	'COTE ENSOLEILLEE',
	'VOLCAN GRONDANT',
	'CANYON DU TONNERRE',
	'DESERT SENENITE',
	'PLAINES ETOILEES',
	'VALLEE CDL',
	'MONTAGNE ENNEIGEE',
	"ILE D'AUBEVILLE",
	'PLATEAU DESTINEE',
	'MARECAGE OUBLIE',
	'LAC CRISTAL',
	'TUMULUS DU DRAGON',
];

const zonesDefaultValue = validZoneKeys.reduce((obj, zoneKey) => {
	obj[zoneKey] = 0;
	return obj;
}, {});

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Player',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			zones: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: zonesDefaultValue,
				validate: {
					isValidZones(value) {
						for (const key in value) {
							if (!validZoneKeys.includes(key)) {
								throw new Error(`Zone incorrect: ${key}.`);
							}
							if (!Number.isInteger(value[key]) && value[key] < 0) {
								throw new Error(
									`Valeur incorrect pour la Zone ${key}: ${value[key]}`
								);
							}
						}
					},
				},
			},
			rewards: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: zonesDefaultValue,
				validate: {
					isValidZones(value) {
						for (const key in value) {
							if (!validZoneKeys.includes(key)) {
								throw new Error(`Zone incorrect: ${key}.`);
							}
							if (value[key] < 0) {
								throw new Error(
									`Valeur incorrect pour la Zone ${key}: ${value[key]}`
								);
							}
						}
					},
				},
			},
		},
		{
			timestamps: true,
			createdAt: 'created',
			updatedAt: false,
		}
	);
};
