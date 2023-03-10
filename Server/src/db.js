require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

// Esto lo dejo comentado porque es lo que uso continuamente para hacer pruebas locales, de la otra forma tarda mucho en cargar cada vez que mato el servidor y lo vuelvo a levantar

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/MascotApp`, {
//   logging: false,
//   native: false
// });

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inyectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Auth, Category, Favourite, Image, JobOffer, News, Pet, PetType, Request, Review, User } =
  sequelize.models;

// Aca vendrian las relaciones

// Relaciones User

User.belongsToMany(Category, { through: "User_Category" });
Category.belongsToMany(User, { through: "User_Category" });

Auth.hasOne(User);
User.belongsTo(Auth);

User.hasMany(Favourite);
Favourite.belongsTo(User);

User.hasMany(Image);
Image.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Pet);
Pet.belongsTo(User);

// Relación PetType - Pet

PetType.hasMany(Pet);
Pet.belongsTo(PetType);

// Relaciones JobOffer

PetType.belongsToMany(JobOffer, { through: "PetType_JobOffer" });
JobOffer.belongsToMany(PetType, { through: "PetType_JobOffer" });

Category.hasMany(JobOffer);
JobOffer.belongsTo(Category);

User.hasMany(JobOffer);
JobOffer.belongsTo(User);

// Relaciones Request

Pet.belongsToMany(Request, { through: "Pet_Request" });
Request.belongsToMany(Pet, { through: "Pet_Request" });

Category.hasMany(Request);
Request.belongsTo(Category);

JobOffer.hasMany(Request);
Request.belongsTo(JobOffer);

User.hasMany(Request);
Request.belongsTo(User);

module.exports = {
  ...sequelize.models,
  conn: sequelize
};
