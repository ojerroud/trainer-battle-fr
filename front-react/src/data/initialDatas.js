const initialZones = [
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

const initialPlayers = ['Flowax', 'Biggie', 'Bamlet'];

const initialData = initialPlayers.map((name, index) => ({
	id: index + 1,
	name,
	zones: Object.fromEntries(initialZones.map((zone) => [zone, 0])),
	rewards: Object.fromEntries(initialZones.map((zone) => [zone, 0])),
}));

export { initialZones, initialPlayers, initialData };
