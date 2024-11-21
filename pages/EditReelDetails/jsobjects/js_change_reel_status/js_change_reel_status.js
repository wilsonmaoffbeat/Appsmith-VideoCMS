export default {
	async changeStatus() {
		button_status_change_confirm.setDisabled(true);
		await api_patch_reel_status.run({isActive: !api_get_reel_admin.data.isActive});
		await api_get_reel_admin.run();
		closeModal(Modal2.name);
		showAlert("Video status changed!", "success");
		button_status_change_confirm.setDisabled(false);
	}
}