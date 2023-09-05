import React, { useState } from 'react';
import './TablePointGDG.scss';
import { useDispatch, useSelector } from 'react-redux';
import { generateKey } from '../../utils/generateKey';
import { updateRewardsValues } from '../../actions';

function TablePointsGDG() {
	const player = useSelector((state) => state.player);
	const zone = useSelector((state) => state.zone);
	const [formSubmitted, setFormSubmitted] = useState(false); // État pour suivre si le formulaire a été soumis

	const dispatch = useDispatch();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		setFormSubmitted(true);

		const formData = new FormData(e.target);
		console.log({ formData, elem: e.target });
		const updatedPlayers = JSON.parse(JSON.stringify(player));

		for (const [name, value] of formData) {
			const [id, currZone] = name.split('-');
			const newValue = value;

			const currPlayer = updatedPlayers.find(
				(currPlayer) => +currPlayer.id === +id
			);

			if (currPlayer) {
				currPlayer.rewards[currZone] = newValue;
			}
		}

		dispatch(updateRewardsValues(updatedPlayers));
	};

	const handleResetRewards = () => {
		// Utilisez la fonction window.confirm pour demander la confirmation de l'utilisateur
		const isConfirmed = window.confirm(
			'Êtes-vous sûr de vouloir réinitialiser toutes les récompenses ?'
		);

		if (isConfirmed) {
			const tmpPlayers = JSON.parse(JSON.stringify(player));
			tmpPlayers.forEach((currPlayer) => {
				zone.forEach((currZone) => (currPlayer.rewards[currZone] = 0));
			});

			dispatch(updateRewardsValues(tmpPlayers));
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
									).rewards[currZone];

									return (
										<td key={generateKey(currPlayer.name)}>
											<input
												name={`${currPlayer.id}-${currZone}`}
												key={generateKey(currPlayer.name, currZone)}
												className={'zone__points'}
												defaultValue={currentPlayerZone}
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
				<button type="submit">Valider</button> {/* Bouton de validation */}
			</form>
			{formSubmitted && <p>Le formulaire a été soumis avec succès.</p>}
		</div>
	);
}

export default TablePointsGDG;
