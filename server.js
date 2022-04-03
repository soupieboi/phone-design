const express = require('express')
const path = require('path');
const { GithubStats } = require('github-release-stats');
const fs = require("fs")
const app = express()
const port = 3000

app.use(express.static('public'));
app.engine('html', require('ejs').renderFile); 

function fetchDownloads() {
  var dwds;
  var downloadURL;
  const gh = new GithubStats('VALTracker', 'DesktopClient');
  gh.getTotalDownloads().then(count => {
    gh.getLatestRelease().then(data => {
      for(var i = 0; i < data.assets.length; i++) {
        if(data.assets[i].name.split('.').pop() == 'exe') {
          downloadURL = data.assets[i].browser_download_url;
        }
      }
      dwds = count;
      var downloadData = {
        "downloads": dwds,
        "downloadURL": downloadURL
      }
      console.log(downloadData)
      fs.writeFileSync('./json/downloads.json', JSON.stringify(downloadData));
      console.log("Fetched data successfully!");
    })
  }).catch(error => {
    console.error(error);
  });
}

fetchDownloads();
setInterval(fetchDownloads, 1.2e+6);

app.get('/', async function(req, res) {
  var raw = fs.readFileSync('./json/downloads.json');
  var data = JSON.parse(raw);
  res.render('index.html', {downloads: data.downloads, downloadURL: data.downloadURL});
})

app.get('/privacy', async function(req, res) {
  res.render('privacy.html');
})

app.get('/riot.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '/riot.txt'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 