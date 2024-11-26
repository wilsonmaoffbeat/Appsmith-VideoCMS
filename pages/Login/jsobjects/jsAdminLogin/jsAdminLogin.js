export default {
	async login (email, password) {
		console.log('running login....');
		const domainMapping = new Map([
			['production', 'everuts.com']
		])
		const keyMapping = new Map([
			['production', { keyName: 'LAmXHcaY', keyValue: 'ZMqtpiyWfPOMBhPLwk3R1necmnmEkyls' }]
		])
		
		const env = selectEnv.selectedOptionValue;
		const client = "app"

		const timestamp = new Date().getTime() / 1000 | 0;
		const keyName = keyMapping.get(env).keyName;
		const keyValue = keyMapping.get(env).keyValue;

		const payload = [client, keyName, email, password, timestamp].join("");
		const signature = CryptoJS.HmacSHA256(payload, keyValue).toString();

		console.log('Path:'+`https://admin-api.${domainMapping.get(env)}/internal-identities/auth/password`);
		
		const data = await fetch(`https://admin-api.${domainMapping.get(env)}/internal-identities/auth/password`, {
			method: "POST",
			body: JSON.stringify({
				client,
				email,
				password,
				credential: keyName,
				timestamp,
				signature
			}),
			headers: {
				"Content-Type": "application/json"
			}
		}).then((it) => {
			return it.ok ? it.json() : Promise.reject(it.statusText)
		})
		console.log('storing store....');
		/*
		storeValue('everutsAdminToken', data.token, true);
		storeValue('everutsRefreshToken', data.refreshToken, true);
		storeValue('everutsAdminApiRoot', `https://admin-api.${domainMapping.get(env)}`, true);
		*/
		
		//login
		storeValue("testAdminToken", data.token, true);
		storeValue("testRefreshToken", data.refreshToken, true);
		storeValue("testAdminApiRoot", `https://admin-api.${domainMapping.get(env)}`, true);
		storeValue("testApiRoot", `https://api.${domainMapping.get(env)}`, true);
		//storeValue("testAdminApiRoot", "https://admin-api.everutm.link", true);
		//storeValue("testApiRoot", "https://api.everutm.link", true);
		
		navigateTo('ReelList');
	}
}