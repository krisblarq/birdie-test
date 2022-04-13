const db = require("../models/db");
const helper = require("../helper");
const config = require("./db.config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, event_type, visit_id, caregiver_id, care_recipient_id, mood
    FROM events LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

module.exports = {
  getMultiple,
};