const pool = require("../config/db");

const create = (data) => {
  const { nama, email, passwordHash, handphone, id, } = data;
  return pool.query(
    `INSERT INTO users (users_id,nama,email,handphone,password) VALUES ('${id}','${nama}','${email}','${handphone}','${passwordHash}')`
  );
};

const updateWorker = (data) => {
  const { id, nama, photo_profile } = data;
  return pool.query(
    `UPDATE users SET nama='${nama}', photo_profile='${photo_profile}'  WHERE users_id='${id}'`
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const countData = () => {
  return pool.query("SELECT COUNT(*) users");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT users_id FROM users WHERE users_id='${id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const selectAllWorker = (limit, offset, sortby, sort) => {
  return pool.query(
    // `SELECT user_worker.*, skill_worker.skill_name FROM user_worker LEFT JOIN skill_worker ON user_worker.worker_id = skill_worker.worker_id ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`

    // `SELECT * FROM user_worker ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
//     `SELECT user_worker.worker_id, 
//     user_worker.nama, 
//     string_agg(skill_worker.skill_name, ', ') AS skills
// FROM user_worker 
// LEFT JOIN skill_worker ON user_worker.worker_id = skill_worker.worker_id 
// GROUP BY user_worker.worker_id, user_worker.nama
// ORDER BY ${sortby} ${sort} 
// LIMIT ${limit} OFFSET ${offset};
// `
`SELECT
    uw.worker_id,
    uw.nama,
    uw.domisili,
    uw.jobdesk,
    array_agg(sw.skill_name ORDER BY sw.skill_name) AS skills
FROM user_worker uw
LEFT JOIN skill_worker sw ON uw.worker_id = sw.worker_id
GROUP BY uw.worker_id, uw.nama, uw.domisili, uw.jobdesk
ORDER BY ${sortby} ${sort}
LIMIT ${limit} OFFSET ${offset}`
  );
};

const searchWorker = (search, limit, offset, sortby, sort) => {
  return pool.query(
    `SELECT * FROM users WHERE nama ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectWorker = (id) => {
  return pool.query(`SELECT * FROM users WHERE users_id='${id}'`);
};

module.exports = {
  findEmail,
  findId,
  create,
  selectAllWorker,
  selectWorker,
  updateWorker,
  searchWorker,
  countData,
};
