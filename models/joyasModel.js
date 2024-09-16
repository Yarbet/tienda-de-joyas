
const pool = require('../db/db');

const getAllJoyas = async (limits, offset, orderField, orderDirection) => {
    const validFields = ['id', 'nombre', 'categoria', 'metal', 'precio', 'stock'];
    const validDirections = ['ASC', 'DESC'];

    if (!validFields.includes(orderField)) {
        throw new Error('Campo de ordenamiento no válido');
    }
    if (!validDirections.includes(orderDirection.toUpperCase())) {
        throw new Error('Dirección de ordenamiento no válida');
    }
    const query = `
        SELECT * FROM inventario
        ORDER BY ${orderField} ${orderDirection}
        LIMIT $1 OFFSET $2
    `;
    const response = await pool.query(query, [limits, offset]);
    return response.rows;

};

const getFilteredJoyasFromDB = async (precio_min, precio_max, categoria, metal) => {
    let query = 'SELECT * FROM inventario WHERE 1=1';
    const params = [];

    if (precio_min) {
        query += ' AND precio >= $' + (params.length + 1);
        params.push(precio_min);
    }
    if (precio_max) {
        query += ' AND precio <= $' + (params.length + 1);
        params.push(precio_max);
    }
    if (categoria) {
        query += ' AND categoria = $' + (params.length + 1);
        params.push(categoria);
    }
    if (metal) {
        query += ' AND metal = $' + (params.length + 1);
        params.push(metal);
    }

    const response = await pool.query(query, params);
    return response.rows;
};

module.exports = { getAllJoyas, getFilteredJoyasFromDB };