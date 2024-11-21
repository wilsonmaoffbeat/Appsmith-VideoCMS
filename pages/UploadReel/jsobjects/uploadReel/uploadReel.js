export default {
	async submit()
	{
		let canUpload = true;
		if(appsmith.store.videoTc === '' || appsmith.store.videoSc === '' || appsmith.store.videoEn === '')
		{
			canUpload = false;
			showAlert('Please load all videos!', 'error');
		}
		if(appsmith.store.thumbnailEn === '' || appsmith.store.thumbnailTc === '' || appsmith.store.thumbnailSc === '')
		{
			canUpload = false;
			showAlert('Please load all thumbnails!', 'error');
		}
		if(input_store_id.text === '' || 
			 input_title_tc.text === '' || input_title_sc.text === '' || input_title_en.text === '' ||
			 input_description_tc.text === '' || input_description_sc.text === '' || input_description_en.text === '' ||
			 input_alt_text_tc.text === '' || input_alt_text_sc.text === '' || input_alt_text_en.text === ''||
			 mutli_select_video_tags.selectedOptionValues.length < 1 || input_skuIds.text === ''
			)
		{
			canUpload = false;
			showAlert('Please enter all video information!', 'error');
		}
		if(canUpload === true)
		{
			await this.uploadReel();
			navigateTo('ReelList');
		}
	},
	async uploadReel () {
		const data = {
			"storeId": input_store_id.text,
			"title": {
				"zhHk": input_title_tc.text,
				"zhCn": input_title_sc.text,
				"en": input_title_en.text
			},
			"description": {
				"zhHk": input_description_tc.text,
				"zhCn": input_description_sc.text,
				"en": input_description_en.text
			},
			"videoKey": {
				"zhHk": appsmith.store.videoTc,
				"zhCn": appsmith.store.videoSc,
				"en": appsmith.store.videoEn
			},
			"thumbnailKey": {
				"zhHk": appsmith.store.thumbnailTc,
				"zhCn": appsmith.store.thumbnailSc,
				"en": appsmith.store.thumbnailEn
			},
			"altText": {
				"zhHk": input_alt_text_tc.text,
				"zhCn": input_alt_text_sc.text,
				"en": input_alt_text_en.text
			},
			"tagIds": mutli_select_video_tags.selectedOptionValues,
			"skuIds": input_skuIds.text.split(/\r?\n/).filter((it) => !!it)
		}

		await postReel.run({data: data});

		if (!postReel.responseMeta.isExecutionSuccess) {
			showAlert("Reel cannot be created: " + postReel.data, "error");
		}
		else {
			showAlert("Reel is created!", "success");
		}

		// clear store	
		removeValue("videoTc");
		removeValue("videoSc");
		removeValue("videoEn");
		removeValue("thumbnailTc");
		removeValue("thumbnailSc");
		removeValue("thumbnailEn");
	}
}