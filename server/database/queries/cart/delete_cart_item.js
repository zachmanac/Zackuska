/* deleting an Item in cart
const db = require('../../connection');

const delete_cart_item = (cart_item_id) => {
    const query = `
        DELETE FROM cart_items
        WHERE cart_item_id = $1
        RETURNING *;
    `;
    return db.query(query, [cart_item_id]);
};

module.exports = delete_cart_item;*/
