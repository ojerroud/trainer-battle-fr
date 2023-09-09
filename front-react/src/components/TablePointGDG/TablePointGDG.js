import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateKey } from '../../utils/generateKey';
import { updateZonesValues } from '../../actions';
import './TablePointGDG.scss';
// import { initialZones, rewardsPerZone } from '../../data/initialDatas';

function TablePointsGDG() {
	const player = useSelector((state) => state.player);
	const zone = useSelector((state) => state.zone);
	const [formSubmitted, setFormSubmitted] = useState(false); // État pour suivre si le formulaire a été soumis

	const dispatch = useDispatch();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		setFormSubmitted(true);

		const formData = new FormData(e.target);
		const updatedPlayers = JSON.parse(JSON.stringify(player));

		for (const [name, value] of formData) {
			const [id, currZone] = name.split('-');
			const newValue = value;

			const currPlayer = updatedPlayers.find(
				(currPlayer) => +currPlayer.id === +id
			);

			if (currPlayer) {
				currPlayer.zones[currZone] = newValue;
			}
		}

		dispatch(updateZonesValues(updatedPlayers));
	};

	const handleResetRewards = () => {
		// Utilisez la fonction window.confirm pour demander la confirmation de l'utilisateur
		const isConfirmed = window.confirm(
			'Êtes-vous sûr de vouloir réinitialiser toutes les récompenses ?'
		);

		if (isConfirmed) {
			const tmpPlayers = JSON.parse(JSON.stringify(player));
			tmpPlayers.forEach((currPlayer) => {
				zone.forEach((currZone) => (currPlayer.zones[currZone] = 0));
			});

			dispatch(updateZonesValues(tmpPlayers));
		}
	};

	return (
		<div className="table_point_gdg">
			<form onSubmit={handleFormSubmit}>
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
						{zone.map((currZone) => (
							<tr key={generateKey(currZone)}>
								<th className="zone__header" key={generateKey(currZone)}>
									{currZone}
								</th>
								{player.map((currPlayer) => {
									const currentPlayerZone = player.find(
										(players) => players.name === currPlayer.name
									).zones[currZone];

									return (
										<td
											className="td__input"
											key={generateKey(currPlayer.name)}
										>
											<input
												name={`${currPlayer.id}-${currZone}`}
												key={generateKey(currPlayer.name, currZone)}
												className={'zone__points'}
												defaultValue={currentPlayerZone}
												onClick={(e) => e.target.select()}
											/>
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
				<button type="reset" onClick={handleResetRewards}>
					reset
				</button>
				{/* TODO: put the reward button when validate is done */}
				<button type="submit">Valider</button> {/* Bouton de validation */}
			</form>
			{formSubmitted && <p>Le formulaire a été soumis avec succès.</p>}
		</div>
	);
}

export default TablePointsGDG;
