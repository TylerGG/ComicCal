var request = require('request');
var fs = require('fs');
var util = require('util');
var reg = /PAGE \d+/
request('http://www.previewsworld.com/support/previews_docs/orderforms/archive/2014/OCT14_COF.txt', function (error, response, body) {
	if(!error && response.statusCode == 200) {
		var lines = body.split("\r\n");
		lines.splice(0,lines.indexOf("PREMIER PUBLISHERS")+1);
		console.log(lines[0]);
		for( var i = 0; i < lines.length; i++)
		{
			
			if(reg.exec(lines[i])){
				console.log(lines[i]);
				lines.splice(i,1);
			}
		}
	}
})