
const severityOrder = ['High', 'Medium', 'Low'];

function sortIncidents(incidents = []) {
  return incidents.sort((a, b) => {
    if (severityOrder.indexOf(a.Severity) < severityOrder.indexOf(b.Severity)) {
      return -1;
    } else if (severityOrder.indexOf(a.Severity) > severityOrder.indexOf(b.Severity)) {
      return 1;
    }
    return 0;
  });
}

module.exports = { sortIncidents };