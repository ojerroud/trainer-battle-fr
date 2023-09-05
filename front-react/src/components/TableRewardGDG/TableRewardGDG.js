import React from 'react';
import './TableRewardGDG.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleZone } from '../../actions';
import { voiceSpeech } from '../../utils/voiceSpeech';
import { generateKey } from '../../utils/generateKey';

function TableRewardGDG() {
	const player = useSelector((state) => state.player);
	const zone = useSelector((state) => state.zone);

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
		<div className="table_reward_gdg">
			<table>
				<thead className="players">
					<tr>
						{['', ...player].map(({ name }, index) => (
							<th
								className={`${index ? 'player__header' : ''}`}
								key={generateKey(name)}
							>
								{name}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{zone.map((zone) => (
						<tr key={generateKey(zone)}>
							<th
								className="zone__header"
								key={generateKey(zone)}
								onClick={() => handleZoneSpeechClick(zone)}
							>
								{zone}
							</th>
							{player.map((elem) => {
								const currentPlayerZone = player.find(
									(players) => players.name === elem.name
								).zones[zone];

								return (
									<td key={generateKey(elem.name)}>
										<button
											className={`zone__reward${
												currentPlayerZone === 1 ? ' true' : ''
											}`}
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

export default TableRewardGDG;
