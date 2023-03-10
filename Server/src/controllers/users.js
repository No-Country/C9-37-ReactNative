const { User, Auth, Category, Favourite } = require("../db");
const { isValidString, isValidNumber } = require("./../validations/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const usersList = await User.findAll();
    return res.status(200).json(usersList);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const register = async (req, res) => {
  const { name, surname, city, fb_authId, email, password, isGoogle } = req.body;

  try {
    if (!name || !surname || !city || !fb_authId || !email || !password) {
      return res.status(400).json({ errorMessage: "Missing required fields" });
    }

    if (
      !isValidString(name) ||
      !isValidString(surname) ||
      !isValidString(city) ||
      !isValidString(fb_authId) ||
      !isValidString(email) ||
      !isValidString(password)
    )
      return res.status(400).json({ errorMessage: "All fields must be string type" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [auth, created] = await Auth.findOrCreate({
      where: { id: fb_authId, email },
      defaults: {
        id: fb_authId,
        email,
        password: hashedPassword,
        isGoogle
      }
    });

    if (created) {
      const newUser = await User.create({
        name,
        surname,
        city,
        authId: auth.id
      });

      return res.status(201).json({
        message: "A new user has been authenticated and created successfully",
        user: newUser.dataValues
      });
    }

    return res.status(400).json({
      errorMessage: "There is already an account registered with that fb_authId or email",
      data: auth.dataValues
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const login = async (req, res) => {
  const { email, password, id } = req.body;

  try {
    if (!email || !password || !id)
      return res.status(400).json({ errorMessage: "Missing required fields" });

    if (!isValidString(email) || !isValidString(password) || !isValidString(id))
      return res.status(400).json({ errorMessage: "All fields must be string type" });

    const emailAuthenticated = await Auth.findOne({ where: { email } });
    if (emailAuthenticated === null)
      return res
        .status(404)
        .json({ errorMessage: "There is no account registered with that email" });

    const passwordsMatch = await bcrypt.compare(password, emailAuthenticated.dataValues.password);

    if (!passwordsMatch) return res.status(400).json({ errorMessage: "Invalid password" });

    const userLoggedIn = await User.findOne({
      include: {
        model: Auth,
        where: {
          id
        }
      }
    });

    return res
      .status(200)
      .json({ message: "A user has logged in successfully", user: userLoggedIn.dataValues });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "The id type must be an integer" });

    const userById = await User.findOne({
      where: {
        id
      }
    });
    !userById
      ? res.status(404).json({ errorMessage: "There is no user with that id" })
      : res.status(200).json(userById.dataValues);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const getUsersSameCity = async (req, res) => {
  const { city, id } = req.params;

  try {
    if (isValidNumber(city))
      return res.status(400).json({ errorMessage: "The city must be string type" });

    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "The id must be an integer" });

    const user = await User.findByPk(id);
    if (user === null)
      return res.status(404).json({ errorMessage: "There is no user with that id" });

    const usersSameCity = await User.findAll({
      where: {
        city: {
          [Op.iLike]: `${city}`
        }
      }
    });

    const nearbyUsers = usersSameCity.map(user => user.dataValues);
    const filteringCurrentUser = nearbyUsers.filter(user => user.id !== parseInt(id));

    nearbyUsers.length
      ? res.status(200).json(filteringCurrentUser)
      : res.status(404).json({ errorMessage: "There is no users with the same city" });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const getUsersBestRating = async (req, res) => {
  const { id } = req.query;

  try {
    const usersOrdered = await User.findAll({
      where: {
        offers_services: true
      },
      include: {
        model: Category
      },
      order: [["rating", "DESC"]]
    });

    if (id && id === "undefined") {
      return res.status(200).json(usersOrdered);
    } else {
      if (id && !isValidNumber(id))
        return res.status(400).json({ errorMessage: "The id must be an integer" });

      const user = await User.findByPk(id);
      if (user === null)
        return res.status(404).json({ errorMessage: "There is no user with that id" });

      const filteringCurrentUser = usersOrdered.filter(user => user.id !== parseInt(id));
      return res.status(200).json(filteringCurrentUser);
    }
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const getUsersByCategory = async (req, res) => {
  const { categoryId } = req.body;

  try {
    if (!categoryId) return res.status(400).json({ errorMessage: "CategoryId missing" });
    if (!isValidNumber(categoryId))
      return res.status(400).json({ errorMessage: "The categoryId type must be an integer" });

    const category = await Category.findByPk(categoryId);
    if (category === null)
      return res.status(404).json({ errorMessage: "There is no category with that id" });

    const usersThatOfferServices = await User.findAll({
      where: { offers_services: true },
      include: {
        model: Category,
        through: {
          attributes: []
        }
      }
    });

    const usersArray = usersThatOfferServices.map(user => user.dataValues);

    const usersToShow = [];
    for (const user of usersArray) {
      for (const u of user.categories) {
        if (u.id === categoryId) {
          usersToShow.push(user);
        }
      }
    }

    if (!usersToShow.length)
      return res
        .status(404)
        .json({ message: `There is no users that offer ${category.dataValues.name}` });

    return res.status(200).json(usersToShow);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

/**
 *
 * @param {Number} req.query.filter Requires a rating value from query, the value is validated between 1 and 5 as a valid option by default returns the users with the rating of 5
 * @returns users filtered by the rating value // example query.filter 2 returns users with rating of 2
 */

const getUsersByFilter = async (req, res) => {
  const option = req.query.filter > 0 ? (req.query.filter > 5 ? 5 : req.query.filter) : 5;

  try {
    const usersFound = await User.findAll({
      where: {
        rating: option
      }
    });

    return res.status(200).json(usersFound);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const getUserFavourites = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "The id must be an integer" });

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ errorMessage: "There is no user with that id" });

    const favList = await Favourite.findAll({
      where: { userId: id }
    });

    if (favList.length) {
      const ids = favList.map(fav => fav.fav_user_id);

      const favourites = await User.findAll({
        where: {
          id: {
            [Op.and]: [ids]
          }
        }
      });

      return res.status(200).json(favourites);
    }
    return res.status(200).json([]);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const addUserFavourites = async (req, res) => {
  const { id, favourite } = req.params;

  try {
    if (!isValidNumber(id) || !isValidNumber(favourite))
      return res.status(400).json({ errorMessage: "Both params must be integers" });

    const userThatFavs = await User.findByPk(id);
    const userFaved = await User.findByPk(favourite);

    if (!userThatFavs)
      return res
        .status(404)
        .json({ errorMessage: "The user that is trying to add a new fav does not exist" });

    if (!userFaved)
      return res
        .status(404)
        .json({ errorMessage: "The user that you are trying to add to your favs does not exist" });

    const found = await Favourite.findOne({
      where: {
        fav_user_id: favourite,
        userId: id
      }
    });

    if (found) return res.status(400).json({ errorMessage: "The user is already in favs" });

    await Favourite.create({
      fav_user_id: favourite,
      userId: id
    });

    return res.status(200).json({ message: favourite + " added to favs of User " + id });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const deleteUserFavourites = async (req, res) => {
  const { id, favourite } = req.params;

  try {
    if (!isValidNumber(id) || !isValidNumber(favourite))
      return res.status(400).json({ errorMessage: "Both params must be integers" });

    const userThatDeletes = await User.findByPk(id);
    const userDeleted = await User.findByPk(favourite);

    if (!userThatDeletes)
      return res
        .status(404)
        .json({ errorMessage: "The user that is trying to delete a fav does not exist" });

    if (!userDeleted)
      return res.status(404).json({
        errorMessage: "The user that you are trying to delete does not exist"
      });

    const found = await Favourite.findOne({
      where: {
        fav_user_id: favourite,
        userId: id
      }
    });

    if (!found)
      return res
        .status(400)
        .json({ errorMessage: "The user that you are trying to delete is not in your favs" });

    await Favourite.destroy({
      where: {
        fav_user_id: favourite,
        userId: id
      }
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

/**
 *
 * @param {Object} req.body requires all the fields of body and extract the fields needed
 * then the fields of user are updated if the content is new
 * @returns the user id
 */

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, surname, age, city, offers_services, description, profile_pic } = req.body;

  try {
    await User.update(
      {
        name,
        surname,
        age,
        city,
        offers_services,
        description,
        profile_pic
      },
      {
        where: {
          id
        }
      }
    )
      .then(result => res.json(result))
      .catch(err => res.json(err));
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

/* Funcion de prueba */

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await Auth.destroy({
      where: {
        id
      }
    });

    await User.destroy({
      where: {
        id
      }
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

/**
 * STATUS : Testing
 * MESSAGE : is not finished yet, requires a session manager to manage the request to the database
 * Returns users filtered by city
 * @returns users list
 */

const getSearch = async (req, res) => {
  let filters = [
    req.query.walk === "true" ? 1 : false,
    req.query.care === "true" ? 2 : false,
    req.query.transport === "true" ? 3 : false,
    req.query.training === "true" ? 4 : false,
    req.query.hair === "true" ? 5 : false
  ];

  filters = filters.filter(e => e !== false);

  let searchWord, baseFilters;

  if (req.query.search) {
    searchWord = req.query.search;
    searchWord = {
      city: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("city")),
        "LIKE",
        "%" + searchWord.toLowerCase() + "%"
      )
    };
  }

  if (filters.length > 0) {
    baseFilters = { id: filters };
  }

  try {
    const users = await User.findAll({
      where: {
        [Op.and]: [searchWord],
        rating: {
          [Op.gt]: 0
        }
      },
      include: {
        model: Category,
        where: {
          [Op.and]: [baseFilters]
        }
      },
      order: [["rating", "DESC"]]
    });

    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await Auth.update(
      {
        password: hashedPassword
      },
      {
        where: {
          email
        }
      }
    );

    return res.status(200);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

module.exports = {
  getUsers,
  register,
  login,
  updateUser,
  deleteUserFavourites,
  deleteUser,
  getUserById,
  getUsersSameCity,
  getUsersBestRating,
  getUsersByCategory,
  getUsersByFilter,
  getUserFavourites,
  addUserFavourites,
  getSearch,
  resetPassword
};
