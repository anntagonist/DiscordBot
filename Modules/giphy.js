const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient("E3d7i4qO56EfgUofqBWBvrwuO7gFyXas");

exports.searchGif = async function(parameters){
	var parameter = buildParameter(parameters);
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

exports.searchSticker = async function(parameters){
	var parameter = buildParameter(parameters);
	var offset = Math.floor((Math.random()*10+1)) % 100;
	var url;
	await giphy.search("stickers", {"q": parameter, "offset": offset})
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

buildParameter = function(_args){
	console.log(`args: ${_args}`);
	var args = Array.from(_args);
	var parameter = '"';
	if(Array.isArray(_args)){
		args = _args;
		for(var i=0; i < args.length; i++){
			if(i !== 0){
				parameter += ' ';
			}
			parameter += args[i];
		}
	} else {
		for(var i=0; i < args.length; i++){
			parameter += args[i];
		}
	}
	parameter += '"';
	console.log(`parameter: ${parameter}`);
	return parameter;
}
