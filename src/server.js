const express = require('express');
const path = require('path');
const jsforce = require('jsforce');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'client/')));

app.get('/api/opportunity', (req, res) => {
  const conn = new jsforce.Connection({
    loginUrl: 'https://test.salesforce.com',
  });
  const username = 'lakshmi.mula@prolifics.com.gpp';
  const password = 'lakshmi@1004q3HVu0qrlZLm72ygfOIqtn21q';

  conn.login(username, password, (err, userInfo) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const opportunityId = '006740000050YCJAA2';
    conn.sobject('Opportunity').retrieve(opportunityId, (err, opp) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const oppJSON = JSON.stringify(opp);
      const oppObj = JSON.parse(oppJSON);
      res.send(oppObj);
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
