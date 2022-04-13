// module.exports = {
//   HOST: "birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com",
//   USER: "test-read",
//   PASSWORD: "xnxPp6QfZbCYkY8",
//   DB: "birdietest",
// };
const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com",
    user: "test-read",
    password: "xnxPp6QfZbCYkY8",
    database: "birdietest",
  },
  listPerPage: 10,
};
module.exports = config;
