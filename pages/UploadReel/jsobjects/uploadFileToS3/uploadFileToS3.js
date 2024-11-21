export default {
	async uploadFile(file, fieldName) {
		await postAssets.run({fileName: file.name, mime: ""});

		if (!postAssets.responseMeta.isExecutionSuccess) {
			showAlert("File cannot be uploaded.", "error");
		}

		const { key, presignedUrl } = postAssets.data;

		await putFileToS3.run({url: presignedUrl, file: file.data});

		if (!postAssets.responseMeta.isExecutionSuccess) {
			showAlert("File cannot be uploaded.", "error");
			this.displayUploadText(fieldName, false);
		} else {
			this.displayUploadText(fieldName, true);
		}

		storeValue(fieldName, key, true);

		showAlert("File is uploaded!", "success");
	},
	displayUploadText(fieldName, isSuccess)
	{
		if(fieldName === 'thumbnailEn')
			label_thumbnailEn.setText(this.setUploadText(isSuccess));
		if(fieldName === 'thumbnailSc')
			label_thumbnailSc.setText(this.setUploadText(isSuccess));
		if(fieldName === 'thumbnailTc')
			label_thumbnailTc.setText(this.setUploadText(isSuccess));
		if(fieldName === 'videoEn')
			label_videoEn.setText(this.setUploadText(isSuccess));
		if(fieldName === 'videoSc')
			label_videoSc.setText(this.setUploadText(isSuccess));
		if(fieldName === 'videoTc')
			label_videoTc.setText(this.setUploadText(isSuccess));
	},
	setUploadText(isSuccess)
	{
		if(isSuccess === true)
				return 'Upload success! Please proceed!';
			else
				return 'Upload failed! Please select again!';
	}
}