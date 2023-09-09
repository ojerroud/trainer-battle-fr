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

const rewardsPerZone = [
	{ NEILOPOLIS: 100 },
	{ HEDAK: 100 },
	{ 'VALLEE ARC': 40 },
	{ 'FORET BRUMEUSE': 40 },
	{ 'COTE ENSOLEILLEE': 40 },
	{ 'VOLCAN GRONDANT': 40 },
	{ 'CANYON DU TONNERRE': 40 },
	{ 'DESERT SENENITE': 20 },
	{ 'PLAINES ETOILEES': 20 },
	{ 'VALLEE CDL': 20 },
	{ 'MONTAGNE ENNEIGEE': 20 },
	{ "ILE D'AUBEVILLE": 20 },
	{ 'PLATEAU DESTINEE': 20 },
	{ 'MARECAGE OUBLIE': 20 },
	{ 'LAC CRISTAL': 20 },
	{ 'TUMULUS DU DRAGON': 20 },
];

const initialPlayers = ['Flowax', 'Biggie', 'Bamlet'];

const initialData = initialPlayers.map((name, index) => ({
	id: index + 1,
	name,
	zones: Object.fromEntries(initialZones.map((zone) => [zone, 0])),
	rewards: Object.fromEntries(initialZones.map((zone) => [zone, 0])),
}));

export { initialZones, initialPlayers, initialData, rewardsPerZone };
