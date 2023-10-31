// modules required for routing
const express = require('express');
const jwt = require('jsonwebtoken');
const DB = require('../config/db');
const router = express.Router();
const Incident = require('../models/incidents');
const { sortIncidents } = require('../helper/incidents-helper');

function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, DB.Secret, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

/* GET incidents List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all incidents in the incidents collection
  Incident.find((err, incidents) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.json(incidents);
    }
  });

});

// GET the Incident Details page in order to edit an existing Incident
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Incident.findById(id, (err, incidentToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(incidentToEdit);
    }
  });
});

// POST process the Incident Details page and create a new Incident - CREATE
router.post('/', async (req, res, next) => {
  let currentDate = new Date();
  let incidentDate = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear().toString().substr(-2)}`;

  let lastIncident = await Incident.findOne().sort({ $natural: -1 }).exec();
  let lastIncidentNumber = lastIncident ? await Incident.countDocuments() : 0;


  // Increment the last incident number and pad with leading zeros
  let newIncidentNumber = (lastIncidentNumber + 1).toString().padStart(7, '0');

  let newIncident = Incident({
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Date": req.body.Date,
    "Status": 'New',
    "Severity": req.body.Severity,
    "Reporter": req.body.Reporter,
    "Area": req.body.Area,
    "Location": req.body.Location,
    "RecordNumber": `${incidentDate}-${newIncidentNumber}`,
  });

  Incident.create(newIncident, (err, incident) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(incident);
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;
  Incident.findById(id, (err, incident) => {
    if (err) {
      console.log(err);
      res.end(err);
    }

    let updatedIncident = Incident({
      "_id": id,
      "Title": req.body.Title,
      "Description": req.body.Description,
      "Date": req.body.Date,
      "Status": req.body.Status,
      "Severity": req.body.Severity,
      "Reporter": req.body.Reporter,
      "Area": req.body.Area,
      "Location": req.body.Location,
    });

    if (incident.Status != updatedIncident.Status) {
      const narrative = req.body.Narrative;
      const log = {
        User: req.user.displayName,
        From: incident.Status,
        To: updatedIncident.Status,
        Narrative: narrative,
        Date: new Date(),
      };
      let logHistory = incident.LogHistory || [];
      logHistory.push(log);
      updatedIncident.LogHistory = logHistory;

      if (updatedIncident.Status == "Close") {
        updatedIncident.ResolutionMessage = narrative;
      }
    }

    Incident.updateOne({ _id: id }, updatedIncident, {}, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
      else {
        res.json(updatedIncident);
      }
    });
  });
});

// GET - process the delete by user id
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Incident.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(id);
    }
  });
});


module.exports = router;
