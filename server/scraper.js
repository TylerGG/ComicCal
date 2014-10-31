var request = require('request'),
	mongoose = require('mongoose'),
	Series = require('./models/Series'),
	Publisher = require('./models/Publisher'),
	Issue = require('./models/Issue'),
	util = require('util'),
	reg = /PAGE \d+/,
	issues = [],
	publishers = [],
	series = [],
	publisher = "",
	connectionString = require('./config').mongo;
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error',function(err) {
	console.log('error connecting to db');
	throw err;
});
db.once('open',function() {
	console.log('connection established');
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
					series[issue.series] = publisher;
				}
				else {
					publisher = lines[i];
					if (publisher != "") {
						publishers[publisher] = true;
					};
					
				}
			}
			Object.keys(publishers).forEach(function (p){
				Publisher.findOneOrCreate({name: p}, {name: p}, function(err, person) {
					if(err != null)
						console.log("Error adding Publisher: " + p + "\t" + err);
				});
			});
			Object.keys(series).forEach(function (s){ 
				Series.findOneOrCreate({name: s}, {name: s, Publisher_ID: Publisher.distinct('_id', {name: Series[s] })[0]}, function(err, person) {
					if(err != null)
						console.log("Error adding Series: " + s + "\t" + err);
				});
			});
			issues.forEach(function(v) { 
				Issue.findOneOrCreate({
					series_id: Series.distinct('_id', {name: v.series})[0], 
					issue_no: v.issueNo}, {
						series_id: Series.distinct('_id', {name: v.series})[0], 
						issue_no: v.issueNo, 
						release_date: v.date,
						price: v.price
					}, function(err, person) {
					if(err != null)
						console.log("Error adding Issue: " +  v.series + " #" + v.issueNo + "\t" + err);
				});
			});
			console.log('done');
		}
	});
});