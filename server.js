const express = require('express')
const path = require('path');
const { GithubStats } = require('github-release-stats');
const app = express()
const port = 3000

app.use(express.static('public'));
app.engine('html', require('ejs').renderFile); 

app.get('/', async function(req, res) {
  var dwds;
  const gh = new GithubStats('SpiritLetsPlays', 'VALTracker_desktop');
  gh.getTotalDownloads().then(count => {
    gh.getLatestRelease().then(data => {
      var downloadURL;
      for(var i = 0; i < data.assets.length; i++) {
        if(data.assets[i].name.split('.').pop() == 'exe') {
          downloadURL = data.assets[i].browser_download_url
        }
      }
      dwds = count;
      res.render('index.html', {downloads: dwds, downloadURL: downloadURL});
    })
  }).catch(error => {
    console.error(error.message);
  });
})

app.get('/riot.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '/riot.txt'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 