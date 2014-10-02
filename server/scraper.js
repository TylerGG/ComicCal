var request = require('request');
var fs = require('fs');
var util = require('util');
var reg = /PAGE \d+/
request('http://www.previewsworld.com/support/previews_docs/orderforms/archive/2014/OCT14_COF.txt', function (error, response, body) {
	if(!error && response.statusCode == 200) {
		var lines = body.split("\r\n");
		lines.splice(0,lines.indexOf("PREMIER PUBLISHERS")+1);
		lines.splice(lines.indexOf("COLLECTED EDITIONS"), 1);
		lines.splice(lines.indexOf("BOOKS"),lines.length - (lines.indexOf("BOOKS") + 1));
		for( var i = 0; i < lines.length; i++)
		{
			if((lines[i].indexOf("#") === -1 && lines[i].indexOf("\t") > -1) || reg.test(lines[i]) || lines[i].indexOf("1 FOR $1") > -1 ){
				lines.splice(i,1);
				--i;
			}
		}
		var file = fs.createWriteStream('array.txt');
		lines.forEach(function(v) { file.write(v + '\n'); });
		file.end();
	}
})