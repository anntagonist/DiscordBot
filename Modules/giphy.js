const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient("E3d7i4qO56EfgUofqBWBvrwuO7gFyXas");

exports.searchGif = async function(parameter){
	var offset = Math.floor((Math.random()*10+1)) % 100;
	var url;
	await giphy.search("gifs", {"q": parameter, "offset": offset})
		.then((response) => {
			var totalRes = response.data.length;
			console.log(`Found Gifs: ${totalRes}`);
			var resIndex = Math.floor((Math.random()*10+1)) % totalRes;
			var resFinal = response.data[resIndex];
			url = resFinal.images.fixed_height.url;
		}).catch(error => {
			console.log(`Giphy Failed: ${error}`);
		});
	return url;
}

exports.searchSticker = function(parameter){
	var offset = Math.floor((Math.random()*10+1)) % 100;
	var url;
	await giphy.search("sticker", {"q": parameter, "offset": offset})
		.then((response) => {
			var totalRes = response.data.length;
			console.log(`Found Gifs: ${totalRes}`);
			var resIndex = Math.floor((Math.random()*10+1)) % totalRes;
			var resFinal = response.data[resIndex];
			url = resFinal.images.fixed_height.url;
		}).catch(error => {
			console.log(`Giphy Failed: ${error}`);
		});
	return url;
}
