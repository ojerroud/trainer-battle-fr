import React, { useEffect, useState } from 'react';
import './TableGDG.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleZone } from '../../actions';
import { voiceSpeech } from '../../utils/voiceSpeech';

function TableGDG() {
	const { player, zone } = useSelector((state) => state);
	const [data, setData] = useState(); // test api
	const dispatch = useDispatch();

	// test api
	const fetchData = async () => {
		try {
			const res = await fetch('http://localhost:3000/api/player');
			const jsonData = await res.json();
			setData(jsonData);
		} catch (error) {
			console.error('Erreur lors de la récupération des données:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []); // test api

	const handleZoneSpeechClick = (zone) => {
		const playersInZone = player
			.filter((e) => e.zones[zone] === 1)
			.map((e) => e.name);

		const playerList =
			playersInZone.length > 0 ? playersInZone.join(', ') : 'aucun joueur';
		const textSpeech = `${zone}: ${playerList}`;

		console.log(textSpeech);

		voiceSpeech(textSpeech);
	};

	const handleMultiZoneSpeechClick = () => {
		let textSpeechMultipleZone = '';
		console.log(player);

		for (const elem of zone) {
			const playersInZone = player
				.filter((e) => e.zones[elem] === 1)
				.map((e) => e.name);

			const playerList =
				playersInZone.length > 0 ? playersInZone.join(', ') : 'aucun joueur';

			const zoneString = `${elem}: ${playerList}`;
			textSpeechMultipleZone += zoneString + ', ';
		}

		textSpeechMultipleZone = textSpeechMultipleZone.slice(0, -2); // Pour supprimer la dernière virgule et l'espace

		voiceSpeech(textSpeechMultipleZone);
	};

	return (
		<div className="table_gdg">
			{console.log({ data })}
			{/* test api */}
			<table>
				<thead className="players">
					<tr>
						{['', ...player].map(({ name }, index) => (
							<th className={`${index ? 'player__header' : ''}`} key={name}>
								{name}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{zone.map((zone) => (
						<tr key={zone}>
							<th
								className="zone__header"
								key={zone}
								onClick={() => handleZoneSpeechClick(zone)}
							>
								{zone}
							</th>
							{player.map((elem) => {
								const currentPlayerZone = player.find(
									(players) => players.name === elem.name
								).zones[zone];

								return (
									<td key={elem.name}>
										<button
											className={`zone__reward ${currentPlayerZone === 1}`}
											onClick={() =>
												dispatch(toggleZone({ id: elem.id, zone }))
											}
										>
											{currentPlayerZone}
										</button>
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
			<button
				onClick={() => handleMultiZoneSpeechClick()}
				style={{ padding: '10px' }}
			>
				full
			</button>
		</div>
	);
}

export default TableGDG;
