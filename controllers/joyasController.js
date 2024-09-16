const { getAllJoyas, getFilteredJoyasFromDB } = require('../models/joyasModel');

const getJoyas = async (req, res) => {
    try {
        const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
        const offset = (page - 1) * limits;
        const [orderField, orderDirection] = order_by.split('_');
        const joyas = await getAllJoyas(limits, offset, orderField, orderDirection);
        const hateoas = {
            totalJoyas: joyas.length,
            joyas,
            links: {
                self: `/joyas?limits=${limits}&page=${page}&order_by=${order_by}`,
                next: `/joyas?limits=${limits}&page=${parseInt(page) + 1}&order_by=${order_by}`,
            },
        };

        res.json(hateoas);
    } catch (error) {
        console.error('Error en getJoyas:', error); 
        res.status(500).json({ error: 'Error en la consulta' });
    }
};

const getFilteredJoyas = async (req, res) => {
    try {
        const { precio_max, precio_min, categoria, metal } = req.query;
        const joyasFiltradas = await getFilteredJoyasFromDB(precio_min, precio_max, categoria, metal);

        res.json(joyasFiltradas);
    } catch (error) {
        console.error('Error en getFilteredJoyas:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
};

module.exports = { getJoyas, getFilteredJoyas };
