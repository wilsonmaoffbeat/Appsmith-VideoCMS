export default {
	async submit()
	{
		let isError = false;
		button_submit.setDisabled(true);
		//Update titles
		if(input_title_en.text !== '' && input_title_sc.text !== '' && input_title_tc.text !== '' &&
			 input_alt_text_en.text !== '' && input_alt_text_sc.text !== '' && input_alt_text_tc.text !== '' &&
			 input_description_en.text !== '' && input_description_sc.text !== '' && input_description_tc.text !== '' &&
			 mutliSelect_video_tags.selectedOptionValues.length > 0 &&
			 input_skuIds.text.length > 0
			)
		{
			const skuIdArray = input_skuIds.text.split('\n').filter(sku => sku.trim() !== '');
			storeValue("skuIdArray", skuIdArray);
			await api_patch_reel_alt.run();
			await api_patch_reel_titles.run();
			await api_patch_reel_descriptions.run();
			await api_patch_reel_tags.run();
			await api_patch_reel_products.run();
			
			//update thumbnail
			if(file_picker_thumbnail_en.files.length > 0 && appsmith.store.thumbnailEn != '')
				await api_patch_reel_thumbnail.run({lang: "en", key: appsmith.store.thumbnailEn});
			if(file_picker_thumbnail_sc.files.length > 0 && appsmith.store.thumbnailSc != '')
				await api_patch_reel_thumbnail.run({lang: "zhCn", key: appsmith.store.thumbnailSc});
			if(file_picker_thumbnail_tc.files.length > 0 && appsmith.store.thumbnailTc != '')
				await api_patch_reel_thumbnail.run({lang: "zhHk", key: appsmith.store.thumbnailTc});
			//update video
			if(file_picker_video_en.files.length > 0 && appsmith.store.videoEn != '')
				await api_patch_reel_video.run({lang: "en", key: appsmith.store.videoEn});
			if(file_picker_video_sc.files.length > 0 && appsmith.store.videoSc != '')
				await api_patch_reel_video.run({lang: "zhCn", key: appsmith.store.videoSc});
			if(file_picker_video_tc.files.length > 0 && appsmith.store.videoTc != '')
				await api_patch_reel_video.run({lang: "zhHk", key: appsmith.store.videoTc});


		}
		else
		{
			isError = true;
		}
		if(isError === true)
		{
			showAlert('Error! Please check if all info are entered correctly!', 'error');
		}
		else
		{
			await api_get_reel_admin.run();
			await api_get_products_public.run();
			showAlert('Video updated!','success');
			navigateTo('ViewReelDetails', {"id":api_get_reel_admin.data.id}, 'SAME_WINDOW');
		}
		button_submit.setDisabled(false);
	}
}