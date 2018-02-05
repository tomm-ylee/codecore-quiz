exports.up = function(knex) {
  return knex.schema.createTable('trends', table => {
    table.increments('id');
    table.string('hashtag');
    table.integer('counter');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('trends');
};
