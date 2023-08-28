const { pool } = require('../pool');
const { WATCHLIST_TABLE, WATCHLIST_STOCKS_TABLE } = require('../../constants/watchlist');

async function getWatchlists() {
    const result = await pool.query(`SELECT name FROM ${WATCHLIST_TABLE}`);
    return result.rows;
}

async function getWatchlistById(id) {
    const result = await pool.query(`SELECT * FROM ${WATCHLIST_TABLE} WHERE id = $1`, [id]);
    return result.rows;
}

async function updateWatchlistNameById(id, newName) {
    const result = await pool.query(`UPDATE ${WATCHLIST_TABLE} SET name = $1 WHERE id = $2 RETURNING name`, [newName, id]);
    return result.rows;
}

async function getStocksByWatchlistId(id) {
    const result = await pool.query(`SELECT name, symbol FROM ${WATCHLIST_STOCKS_TABLE} WHERE watchlist_id = $1`, [id]);
    return result.rows;
}


module.exports = {
    getWatchlists,
    getWatchlistById,
    updateWatchlistNameById,
    getStocksByWatchlistId
};
