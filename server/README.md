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


### Routes

```
/
/signup
/login
/logout
/publishers
/publishers/:id
/publishers/:id/series
/series
/series/:id
/series/:id/issues
/series/:id/subscribe
/series/:id/unsubscribe
/users/subscriptions
```

### Authorization filter

To use certain routes auth credentials must be provided. This can be done either through the querystring or in the header.

The header auth looks for:
  * comical-user-id
  * comical-api-token

The querystring looks for:
  * user_id
  * api_token


### Cluster branch

Use node 0.11+

```
npm install -g pm2
pm2 start app.js -i max
```
