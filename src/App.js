import React, { useState } from 'react';
import axios from 'axios';
import './table.css';

// Define OpportunityTable component
function OpportunityTable() {
  const [data, setData] = useState({});
  const [oppName, setOppName] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const body = {
      grant_type: 'password',
      client_id: '3MVG9qhihEtB2oji0xzq54v_fwp4ru5OYRmdtsp.TLhyaIwsZPmeRYgCw1TToYie3eF4to96rvuUUEqCd6VaT',
      client_secret: 'B98616F846811E4FBE7EB4DBBA0404183171FDD3B873AF3746E5C884C57A38AE',
      username: 'lakshmi.mula@prolifics.com.gpp',
      password: 'lakshmi@1004q3HVu0qrlZLm72ygfOIqtn21q'
    };

    axios.post('https://d300000000qxieam--gpp.sandbox.my.salesforce.com/services/oauth2/token', body, { headers: { "Content-Type": "multipart/form-data" } }).then(function (response) {
      const accToken = "Bearer " + response.data.access_token;
      axios.get(`https://d300000000qxieam--gpp.sandbox.my.salesforce.com/services/data/v42.0/query?q=SELECT Name, Owner.Name,Account.Name,Opportunity_Type__c,Amount,CloseDate,StageName,NextStep,Probability,Opportunity_Description__c,Add_to_Call__c,Engagement_Type__c,Engagement_Type_Confirmed__c,Tech_Sales__c,New_CSL__r.Name,Consultant__c,LeadSource FROM Opportunity WHERE Name LIKE '${oppName}' LIMIT 100`, { headers: { "Authorization": accToken } }).then(function (response1) {
        console.log(response1.data);
        setData(response1.data.records[0]);
      }).catch(function (error) {
        console.error(error);
      });
    }).catch(function (error) {
      console.error(error);
    });
  };

  return (
    <div className="container">
      <h1 align="center">Opportunity Details</h1>
      <form onSubmit={handleSearch} align = 'center'>
        <label>
          <b>Opportunity Name:</b> &nbsp;
          <input type="text" value={oppName} onChange={(e) => setOppName(e.target.value)} />
        </label> 
        &nbsp;&nbsp;
        <input type="submit" value="Search" className="btn" />
      </form>
      <table>
        <thead>
          <tr>
            <th>Opportunity Name</th>
            <th>Opportunity Owner</th>
            <th>Account Name</th>
            <th>Opportunity Type</th>
            <th>Amount</th>
            <th>Projected Close Date</th>
            <th>Stage</th>
            <th>Next Steps</th>
            <th>Probability</th>
            <th>Opportunity Description</th>
            <th>Add to Call</th>
            <th>Engagement Type</th>
            <th>Engagement Type Comfirmed</th>
            <th>Tech Sales</th>
            <th>CSL</th>
            <th>Consultant</th>
            <th>Lead Source</th>
            
          </tr>
        </thead>
        <tbody>
          {data && data.Name && (
            <tr>
              <td>{data.Name}</td>
              <td>{data.Owner.Name}</td>
              <td>{data.Account.Name}</td>
              <td>{data.Opportunity_Type__c}</td>
              <td>{data.Amount}</td>
              <td>{data.CloseDate}</td>
              <td>{data.StageName}</td>
              <td>{data.NextStep}</td>
              <td>{data.Probability}</td>
              <td>{data.Opportunity_Description__c}</td>
              <td>{data.Add_to_Call__c}</td>
              <td>{data.Engagement_Type__c	}</td>
              <td>{data.Engagement_Type_Confirmed__c}</td>
              <td>{data.Tech_Sales__c	}</td>
              <td>{data.New_CSL__r.Name}</td>
              <td>{data.Consultant__c	}</td>
              <td>{data.LeadSource}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Define App component
function App() {
  return (
    <div>
      <OpportunityTable />
    </div>
  );
}

export default App;
