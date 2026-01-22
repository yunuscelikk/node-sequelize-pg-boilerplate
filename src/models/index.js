import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import sequelize from '../db/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(fileURLToPath(import.meta.url), '..');
const basename = _basename(__filename);
const db = {};

const modelsDir = join(__dirname, 'models');

const files = readdirSync(modelsDir).filter(
  (file) =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
);

for (const file of files) {
  const model = (await import(join(modelsDir, file))).default(
    sequelize,
    Sequelize.DataTypes
  );
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
