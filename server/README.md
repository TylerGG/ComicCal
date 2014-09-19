# Comical Server

Built with expressjs & mongoose

Running server
```
npm install
npm install -g nodemon
nodemon app.js
```

You'll also require mongo to be running on your local machine, it should be running by default on ubuntu after installing, but you can check by running
```
mongod
```

Then you can connect to your mongo instance using
```
mongo
use comical
db.sessions.find({})
```

another alternative is install genghis, which requires ruby to be installed
```
gem install genghisapp
genghisapp
```
