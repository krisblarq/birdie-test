const sql = require("./db.js");
// constructor
const Event = function (event) {
  this.id = event.id;
  this.event_type = event.event_type;
  this.care_recipient_id = event.care_recipient_id;
  this.mood = event.mood;
};

Event.getAll = (id, result) => {
  let query = "SELECT * FROM events";
  if (id) {
    query += ` WHERE id LIKE '%${id}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("events: ", res);
    result(null, res);
  });
};
module.exports = Event;
