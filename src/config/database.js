module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'falemais',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
