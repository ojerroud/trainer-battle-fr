import React from 'react';
import './TableGDG.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleZone } from '../../actions';
import { voiceSpeech } from '../../utils/voiceSpeech';

function TableGDG() {
	const { player, zone } = useSelector((state) => state);
	const dispatch = useDispatch();

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
