import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb as db } from "../../firebase";
import { auth } from "../../firebase";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const users = await axios.get("/users");
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

export const sortUsersByRating = createAsyncThunk("users/sortUsersByRating", async id => {
  try {
    const users = await axios.get(`/users/rating?id=${id}`);
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchUserById = createAsyncThunk("users/fetchUserById", async userId => {
  try {
    const userById = await axios.get(`/users/${userId}`);
    return [userById.data];
  } catch (error) {
    console.log(error);
  }
});

export const searchView = createAsyncThunk("users/search", async searchThis => {
  try {
    const users = await axios.get("/users/search", {
      params: searchThis
    });
    console.log(users.data);
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

export const registerUser = createAsyncThunk("users/registerUser", async formData => {
  try {
    const { name, surname, email, password, city } = formData;
    await createUserWithEmailAndPassword(auth, email, password).then(res =>
      sendEmailVerification(res.user)
    );
    const firebaseId = auth.currentUser.uid;

    const userData = {
      name,
      surname,
      city,
      fb_authId: firebaseId,
      email,
      password
    };

    const response = await axios.post("users/register", userData);

    //Registra el usuario en la coleccion de users en firestore

    if (auth.currentUser.uid) {
      const userid = response.data.user.id.toString();

      setDoc(doc(db, "users", userid), {
        username: name + " " + surname,
        email: email,
        userId: userid,
        timestamp: new Date()
      });
    }

    return response.data;
  } catch (error) {
    throw error.code;
  }
});

export const loginUser = createAsyncThunk("users/loginUser", async loginCredentials => {
  try {
    const { email, password } = loginCredentials;
    await signInWithEmailAndPassword(auth, email, password);
    const firebaseId = auth.currentUser.uid;
    // Para saber a qué rutas se debe mandar el firebaseToken por headers, ir a Server/src/routes/users.js
    const firebaseToken = auth.currentUser.accessToken;

    const currentUserData = await axios.post(`/users/login`, {
      id: firebaseId,
      email,
      password
    });

    const currentUser = {
      data: currentUserData.data.user,
      token: firebaseToken
    };

    return currentUser;
  } catch (error) {
    throw error.code;
  }
});

export const logOutUser = createAsyncThunk("users/logOutUser", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
});

export const addFavourite = createAsyncThunk("users/addFavorite", async data => {
  try {
    const { currentUser, id } = data;
    const save = await axios.post(`/users/favourites/${currentUser.data.id}/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    return save;
  } catch (error) {
    console.log(error);
  }
});

export const deleteFavourite = createAsyncThunk("users/deleteFavourite", async data => {
  try {
    const { currentUser, id } = data;
    const deleteUser = await axios.delete(`/users/favourites/${currentUser.data.id}/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    return deleteUser;
  } catch (error) {
    console.log(error);
  }
});

export const fetchFavourites = createAsyncThunk("users/fetchFavourites", async currentUser => {
  try {
    const users = await axios.get(`/users/favourites/${currentUser.data.id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchNearbyUsers = createAsyncThunk("users/fetchNearbyUsers", async data => {
  try {
    const { city, id } = data;

    const usersSameCity = await axios.get(`/users/city/${city}/${id}`);
    return usersSameCity;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchPetTypes = createAsyncThunk("/petTypes/fetchPetTypes", async () => {
  try {
    const petTypes = await axios.get("/petTypes");
    return petTypes.data;
  } catch (error) {
    console.log(error);
  }
});

export const addNewPet = createAsyncThunk("/pets/addNewPet", async data => {
  try {
    const { user, formData } = data;

    const newPet = {
      userId: user.id,
      petTypeId: formData.idPet,
      name: formData.name,
      age: formData.age,
      breed: formData.breed,
      weight: formData.weight
    };

    const response = await axios.post("/pets/add", newPet);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchPetsUser = createAsyncThunk("/pets/fetchPetsUser", async data => {
  try {
    const { currentUser } = data;
    const userId = currentUser.data.id;

    const myPets = await axios.get(`/pets?userId=${userId}`);
    return myPets.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchPetsUserSearch = createAsyncThunk("/myPetsSearch", async data => {
  try {
    const { user } = data;
    const userId = user.id;

    const myPets = await axios.get(`/pets?userId=${userId}`);
    return myPets.data;
  } catch (error) {
    console.log(error);
  }
});

export const addJobOffer = createAsyncThunk("/jobOffers/addJobOffer", async data => {
  try {
    const { user, formData } = data;

    const newJobOffer = {
      userId: user.id,
      categoryId: formData.categoryId,
      img: formData.img,
      name: formData.name,
      price: formData.price,
      description: formData.description
    };

    const response = await axios.post("/jobOffers/create", newJobOffer);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchJobOffersUser = createAsyncThunk("/jobOffers/fetchJobOffersUser", async data => {
  try {
    const { currentUser } = data;
    const userId = currentUser.data.id;

    const myJobOffers = await axios.get(`/jobOffers?userId=${userId}`);
    return myJobOffers.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchJobOffersUserSearch = createAsyncThunk("/myJobOffersSearch", async data => {
  try {
    const { user } = data;
    const userId = user.id;

    const myJobOffers = await axios.get(`/jobOffers?userId=${userId}`);
    return myJobOffers.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async data => {
  try {
    const { id, formData, profile_pic } = data;
    const forms = { ...formData, profile_pic };

    console.log("forms " + JSON.stringify(forms));

    const userData = Object.entries(forms).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});

    const response = await axios.patch(`users/${id}`, userData);

    return response.data;
  } catch (error) {
    throw error.code;
  }
});

export const cleanState = createAsyncThunk("/cleanState", async () => {
  try {
    const clean = [];
    return clean;
  } catch (error) {
    console.log(error);
  }
});

export const addRequest = createAsyncThunk("/addRequest", async formData => {
  try {
    const response = await axios.post("/requests/create", formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchRequestsUser = createAsyncThunk("/myRequests", async data => {
  try {
    const { currentUser } = data;
    const userId = currentUser.data.id;

    const myRequests = await axios.get(`/requests?userId=${userId}`);
    return myRequests.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchRequestInfoUserId = createAsyncThunk("users/fetchRequestId", async userId => {
  try {
    const userById = await axios.get(`/users/${userId}`);

    return userById.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchJobOffersRequestUser = createAsyncThunk("/jobOffersRequest", async userId => {
  try {
    const jobOffersUser = await axios.get(`/jobOffers?userId=${userId}`);
    return jobOffersUser.data;
  } catch (error) {
    console.log(error);
  }
});

export const addReview = createAsyncThunk("/addReview", async formData => {
  try {
    const { reviewer_user_id, description, stars, userId } = formData;

    const newReview = {
      reviewer_user_id,
      description,
      stars
    };

    const response = await axios.post(`/reviews/create/${userId}`, newReview);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchReviewsUser = createAsyncThunk("/reviews/fetchReviewsUser", async data => {
  try {
    const { currentUser } = data;
    console.log(currentUser.data.id);
    const userId = currentUser.data.id;

    const myReviews = await axios.get(`/reviews/${userId}`);
    return myReviews.data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchReviewsUserSearch = createAsyncThunk(
  "/reviews/fetchReviewsUserSearch",
  async data => {
    try {
      const { user } = data;
      console.log(user.id);
      const userId = user.id;

      const reviewsUser = await axios.get(`/reviews/${userId}`);
      return reviewsUser.data;
    } catch (error) {
      console.log(error);
    }
  }
);
