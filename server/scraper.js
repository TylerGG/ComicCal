var request = require('request'),
	mongoose = require('mongoose'),
	fs = require('fs'),
	util = require('util'),
	reg = /PAGE \d+/,
	issues = [],
	publishers = [],
	series = [],
	publisher = "",
	connectionString = require('./config').mongo;
//mongoose.connect(connectionString);
//var db = mongoose.connection;
request('http://www.previewsworld.com/support/previews_docs/orderforms/archive/2014/AUG14_COF.txt', function (error, response, body) {
	if(!error && response.statusCode == 200) {
		var lines = body.split("\r\n");
		lines.splice(0,lines.indexOf("PREMIER PUBLISHERS")+1);
		lines.splice(lines.indexOf("COLLECTED EDITIONS"), 1);
		lines.splice(lines.indexOf("BOOKS"),lines.length - (lines.indexOf("BOOKS") + 1));
		for( var i = 0; i < lines.length; i++){
			if((lines[i].indexOf("#") === -1 && lines[i].indexOf("\t") > -1) || reg.test(lines[i]) || lines[i].indexOf("SRP: $1.00") > -1 ){
				lines.splice(i,1);
				--i;
			} 
			else if(lines[i].indexOf("\t") > -1){
				var issue = {
					series:lines[i].substring(lines[i].split("\t", 2).join("\t").length + 1, lines[i].indexOf("#")),
					issueNo: lines[i].substring(lines[i].indexOf("#")+1, lines[i].indexOf(" ", lines[i].indexOf("#"))),
					price: lines[i].substring(lines[i].indexOf("$")+1, lines[i].indexOf("\t", lines[i].indexOf("$"))),
					date: lines[i].substring(lines[i].indexOf("/")-2, lines[i].indexOf("/")+6),
					publisher:publisher,
				};
				if(issue.issueNo.indexOf("\t") > 0)
					issue.issueNo = issue.issueNo.substring(0, issue.issueNo.indexOf("\t"));
				issues.push(issue);
				var ser = {
					name: issue.series,
					pub: publisher, 
				};
				series[issue.series] = publisher;
			}
			else {
				publisher = lines[i];
				publishers[publisher] = true;
			}
		}
		var file = fs.createWriteStream('array.txt');
		issues.forEach(function(v) { file.write("Series: " +  v.series + '\t' + "Issue No: " +  v.issueNo + '\t' + "Price: " +  v.price + '\t' + "date: " +  v.date + '\t' + "publisher: " +  v.publisher + '\n'); });
		Object.keys(series).forEach(function (s) { file.write(s + "\t" + series[s] + "\n");});
		file.end();
	}
})