import axios from 'axios';

export default axios.create({
  baseURL:'http://localhost:3030'
});

export const API_BASE_URL = 'http://localhost:3030';

// Prepared Function
export async function getBooksFromListId(productId) {
  const data = [];

  for (const Id of productId) {
    const result = await getBooksByAttributes({ id: Id });
    data[Id] = result[0];
  }

  return Object.values(data);
}

// Read Part
// Books
// Home Page
// Recently Post && You Might Like
export async function getBooksByPage(page, limit) {
  return axios
    .get(`${API_BASE_URL}/products?_page=${page}&_limit=${limit}`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}
// Done
// AllBooks
export async function getAllBooks() {
  return axios
    .get(`${API_BASE_URL}/products`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching data:', error);
      throw error;
    });
}
// Done

export async function getBooksByAttributes({ id, name, price, userId, publishedAt, quantity, status }) {
  const params = {
    id,
    'name_like': name,
    price,
    userId,
    publishedAt,
    quantity,
    status,
  };

  Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

  return axios
    .get(`${API_BASE_URL}/products`, { params: params })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching data:', error);
      throw error;
    });
}
// Done
// Reviews
export async function getBookReviews(productId) {
  return axios.get(`${API_BASE_URL}/reviews`, { params: { productId: productId } })
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error fetching data:', error);
    throw error;
  });
};
// Done
// Carts
export async function getUserProfileByAttributes({id, name, email, password, address}) {
  const params = {
    id,
    'name_like': name,
    email, 
    password, 
    address
  };

  Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

  return axios
    .get(`${API_BASE_URL}/users`, { params: params })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching data:', error);
      throw error;
    });
  };

// export async function getCurrentUser() {
//   return axios.get(`${API_BASE_URL}/currentUser`)
//   .then((response) => response.data)
//   .catch((error) => {
//     console.error('Error fetching data:', error);
//     throw error;
//   });
// };

export async function getCurrentUser() {
  try {
    const response = await axios.get(`${API_BASE_URL}/currentUser`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getUserCart(userId) {
  return axios.get(`${API_BASE_URL}/carts`, { params: { userId: userId } })
  .then((response) => {
    const data = response.data;
    const result= getBooksFromListId(data[0].productId);
    return result
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    throw error;
  });
};
// Done
export async function getUserCartProfile(userId) {
  return axios.get(`${API_BASE_URL}/carts`, { params: { userId: userId } })
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error fetching data:', error);
    throw error;
  });
};
// Done
// Orders
export async function getUsersPurchasedBooks(userId) {
  return axios.get(`${API_BASE_URL}/orders`, { params: { userId: userId } })
    .then(response => {
      const data = response.data;

      const result = getBooksFromListId(data[0].productId);
      return result;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};
// Done
export async function getUserOrdersProfile(userId) {
  return axios.get(`${API_BASE_URL}/orders`, { params: { userId: userId } })
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error fetching data:', error);
    throw error;
  });
};
// Done
// Favorites
export async function getUsersFavoritesBooks(userId) {
  return axios.get(`${API_BASE_URL}/favorites`, { params: { userId: userId } })
    .then(response => {
      const data = response.data;

      const result = getBooksFromListId(data[0].productId);
      return result;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};
// Done
export async function getUserFavoritesProfile(userId) {
  return axios.get(`${API_BASE_URL}/favorites`, { params: { userId: userId } })
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error fetching data:', error);
    throw error;
  });
};
// Done
// Update Part
// Books
export async function UpdateBooksByID({ id, name, price, userId, publishedAt, quantity, status, image }) {
  const body = {
    name,
    price,
    userId,
    publishedAt,
    quantity,
    status,
    image
  };

  Object.keys(body).forEach((key) => body[key] === undefined && delete body[key]);

  axios.patch(`${API_BASE_URL}/products/${id}`, body)
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error updating data:', error);
    throw error;
  });
};
// Done
// Users
export async function UpdateCurrentUser(userId) {
  const body = {
    userId
  }
  axios.patch(`${API_BASE_URL}/currentUser/0`, body)
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error updating data:', error);
    throw error;
  });
};

export async function UpdateUserProfileByID({ id, name, email, password, address }) {
  const body = {
    name,
    email,
    password,
    address
  };

  Object.keys(body).forEach((key) => body[key] === undefined && delete body[key]);

  axios.patch(`${API_BASE_URL}/users/${id}`, body)
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error updating data:', error);
    throw error;
  });
};
// Done
// Reviews
export async function UpdateUserReviewByID({ id, productId, userId, text }) {
  const body = {
    productId,
    userId,
    text
  };

  Object.keys(body).forEach((key) => body[key] === undefined && delete body[key]);

  axios.patch(`${API_BASE_URL}/reviews/${id}`, body)
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error updating data:', error);
    throw error;
  });
};
// Done
// Carts
export async function UpdateCartsByUserID(userId, productId){
  const body = {
    productId
  };
  const CartInfo = await getUserCartProfile(userId);
  axios.patch(`${API_BASE_URL}/carts/${CartInfo[0].id}`, body)
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error updating data:', error);
    throw error;
  });
};
// Done
// Orders
export async function UpdateOrdersByUserID(userId, productId) {
  const body = {
    productId
  };

  const OrderInfo = await getUserOrdersProfile(userId);
  axios.patch(`${API_BASE_URL}/orders/${OrderInfo[0].id}`, body)
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error updating data:', error);
    throw error;
  });
};
// Done
// Favorites
export async function UpdateFavoritesByUserID(userId, productId) {
  const body = {
    productId
  };

  const FavoriteInfo = await getUserCartProfile(userId);
  axios.patch(`${API_BASE_URL}/favorites/${FavoriteInfo[0].id}`, body)
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error updating data:', error);
    throw error;
  });
};
// Done

//------------------------------------------------ ADD part ------------------------------------------------

// Add a new book
export async function addBook(bookData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error; 
  }
};

export async function editBookQuantity(bookData) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/products`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error; 
  }
};

// add a new user
export async function signupUser(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; 
  }
};

export async function addtoCart({userId,productId}) {
  try {
    let carts = await fetch(`${API_BASE_URL}/carts`).then((response) => response.json());

    const existingCart = carts.find((cart) => cart.userId === userId);

    if (existingCart) {
      if (!Array.isArray(existingCart.productId)) {
        // If it's not an array, convert it to an array with the current productId
        existingCart.productId = [existingCart.productId];
      }
      existingCart.productId.push(productId);
      
      await fetch(`${API_BASE_URL}/carts/${existingCart.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(existingCart),
      });
    } else {
      const newCart = {
        userId: userId,
        productId: [productId],
      };
      await fetch(`${API_BASE_URL}/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCart),
      });
    }

    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

export async function addtoFavorite({userId,productId}) {
  try {
    let favorites = await fetch(`${API_BASE_URL}/favorites`).then((response) => response.json());

    const existstingFav = favorites.find((cart) => cart.userId === userId);

    if (existstingFav) {
      if (!Array.isArray(existstingFav.productId)) {
        // If it's not an array, convert it to an array with the current productId
        existstingFav.productId = [existstingFav.productId];
      }
      existstingFav.productId.push(productId);
      
      await fetch(`${API_BASE_URL}/favorites/${existstingFav.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(existstingFav),
      });
    } else {
      const newFav = {
        userId: userId,
        productId: [productId],
      };
      await fetch(`${API_BASE_URL}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFav),
      });
    }

    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};