export default {
	async rankUp()
	{
		console.log('Ranking Up starting...');
		button_rank_up_confirm.setDisabled(true);
		button_rank_up_confirm.setLabel('Loading...');
		await api_patch_reel_order_add.run();
		//Query done
		button_rank_up_confirm.setDisabled(false);
		showAlert('Ranking changed!','success');
		closeModal(modal_ranking_up.name);
		button_rank_up_confirm.setLabel('Confirm');
		await api_get_reels_admin.run();
	},
	async rankDown()
	{
		console.log('Ranking Down starting...');
		button_rank_down_confirm.setDisabled(true);
		button_rank_down_confirm.setLabel('Loading...');
		await api_patch_reel_order_minus_one.run();
		//Query done
		button_rank_down_confirm.setDisabled(false);
		showAlert('Ranking changed!','success');
		closeModal(modal_ranking_down.name);
		button_rank_down_confirm.setLabel('Confirm');
		await api_get_reels_admin.run();
	}
}