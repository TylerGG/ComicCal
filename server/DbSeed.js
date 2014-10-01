
//Seed Publishers
db.publishers.insert([
	{ name: "Image" },
	{ name: "DC" },
	{ name: "Marvel" },
	{ name: "Vertigo" }
]);
//Seed Series

db.series.insert([
	{
		name: "Saga",
		Publisher_ID: db.Publisher.distinct('_id', {name: "Image" })[0] 
	},
	{
		name: "Trees",
		Publisher_ID: db.Publisher.distinct('_id', {name: "Image" })[0] 
	},
	{
		name: "Supreme: Blue Rose",
		Publisher_ID:  db.Publisher.distinct('_id', {name: "Image" })[0] 
	},
	{
		name: "X-Men",
		Publisher_ID: db.Publisher.distinct('_id', {name: "Marvel" })[0] 
	},
	{
		name: "Detective Comics",
		Publisher_ID: db.Publisher.distinct('_id', {name: "DC" })[0] 
	},
	{
		name: "The Amazing Spiderman",
		Publisher_ID: db.Publisher.distinct('_id', {name: "Marvel" })[0] 
	},
	{
		name: "Sandman: Overture",
		Publisher_ID: db.Publisher.distinct('_id', {name: "Vertigo" })[0] 
	},
	{
		name: "Captain America",
		Publisher_ID: db.Publisher.distinct('_id', {name: "Marvel" })[0] 
	},
	{
		name: "The Wicked And The Divine",
		Publisher_ID: db.Publisher.distinct('_id', {name: "Image" })[0] 
	},

]);



//Seed issues
db.issue.insert([
	{
		name: "Saga",
		series_id: db.Series.distinct('_id', {name: "Saga"})[0],
		issue_no: 22
	},
	{
		name: "Trees",
		series_id: db.Series.distinct('_id', {name: "Trees"})[0],
		issue_no: 5
	},
	{
		name: "Captain America",
		series_id: db.Series.distinct('_id', {name: "Captain America"})[0],
		issue_no: 120
	},
	{
		name: "Detective Comics",
		series_id: db.Series.distinct('_id', {name: "Detective Comics"})[0],
		issue_no: 65
	},
	{
		name: "Sandman: Overture",
		series_id: db.Series.distinct('_id', {name: "Sandman: Overture"})[0],
		issue_no: 4
	},
	{
		name: "The Wicked And The Divine",
		series_id: db.Series.distinct('_id', {name: "The Wicked And The Divine"})[0],
		issue_no: 8
	},
	{
		name: "The Amazing Spiderman",
		series_id: db.Series.distinct('_id', {name: "The Amazing Spiderman"})[0],
		issue_no: 220
	},
	{
		name: "Supreme: Blue Rose",
		series_id: db.Series.distinct('_id', {name: "Supreme: Blue Rose"})[0],
		issue_no: 6
	}
	
]);
