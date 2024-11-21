export default {
	async getAllProducts () {
		try {
				/*
        const page1Response = await api_get_products_public.run({
            url: `${appsmith.store.testApiRoot}/reels/customers/reels/${appsmith.URL.queryParams.id}/products?page=1`
        });
        console.log("Page 1 Response:", page1Response); // Log the entire response to check structure
				*/
				const page2Response = await api_get_products_public.run({
            url: `${appsmith.store.testApiRoot}/reels/customers/reels/${appsmith.URL.queryParams.id}/products?page=2`
        });
        console.log("Page 2 Response:", page2Response); // Log the entire response to check structure
    } catch (error) {
        console.error("Error fetching page 2:", error); // Log any error encountered
    }
		
		
		/*
		const totalPageCount = await api_get_products_public.data.pagination.totalPages;
		console.log(totalPageCount);
		//A product allows a maximum of 30 products. Meanwhile a page contains a max of 24 items. So 2 pages only.
		const page1Response = api_get_products_public.run({
        url: `${appsmith.store.testApiRoot}/reels/customers/reels/${appsmith.URL.queryParams.id}/products?page=1`
    });
		//const page2Response = api_get_products_public.run({ page: 2 });
		//console.log(page1Response.data);
		return page1Response;
		//return [...page1.data.items, ...page2.data.items];
		*/
	}
}