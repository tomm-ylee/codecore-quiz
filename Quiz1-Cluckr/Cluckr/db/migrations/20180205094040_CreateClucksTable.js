
exports.up = function(knex) {
  return knex.schema.createTable('clucks', table => {
    table.increments('id');
    table.string('username');
    table.string('profile_pic');
    table.string('image_url');
    table.string('cluck_content');
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('clucks');
};
