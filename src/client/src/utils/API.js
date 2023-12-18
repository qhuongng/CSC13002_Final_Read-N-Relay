const axios = require('axios');

const API_BASE_URL = 'http://localhost:3030';

//Prepared Function
async function getBooksFromListId(productId) {
  const data = [];

  for (const Id of productId) {
    const result = await exports.getBooksByAttributes({ id: Id });
    data[Id] = result[0];
  }

  return Object.values(data);
}

//Read Part
//Books
//Home Page
//Recently Post && You Might Like
exports.getBooksByPage=(page,limit) =>{
  return axios.get(`${API_BASE_URL}/products?_page=${page}&_limit=${limit}`)
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    return data;
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
  });
};
//Done
//AllBooks
exports.getAllBooks =() => {
  return axios.get(`${API_BASE_URL}/products`)
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    return data;
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
  });
};
//Done
exports.getBooksByAttributes = ({id,name, price, userId, publishedAt, quantity, status }) => {
  const params = {
    id,
    'name_like':name,
    price,
    userId,
    publishedAt,
    quantity,
    status,
  };

  Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);
  
  return axios.get(`${API_BASE_URL}/products`,{params:params})
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    return data;
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
  });
};
//Done

// exports.getAllBooksAscOrder =({nameOrder, priceOrder, userIdOrder, publishedAtOrder, quantityOrder}) => {
//   const params = {
//     "name": nameOrder,
//     "price": priceOrder,
//     "userId":userIdOrder,
//     "publishedAt":publishedAtOrder,
//     "quantity":quantityOrder
//   };

//   Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

//   const _sort = '';
//   const _order = '';

//   Object.keys(params).forEach((key) => {
//     _sort += _sort ? `,${key}` : key;
//     _order += _order ? `,${params[key]}` : params[key];
//   });

//   console.log(_sort);
//   console.log(_order);

//   return axios.get(`${API_BASE_URL}/products?_sort=${_sort}&_order=${_order}`);
// };

//Get Books With id,name,...=?


//Users
exports.getUserByAttributes =({id,name,email,password,address}) => {
  const params = {
    id,
    'name_like':name,
    email,
    password,
    'address_like':address
  };

  Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);
  
  return axios.get(`${API_BASE_URL}/users`,{params:params})
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    return data;
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
  });
};
//Done
//Reviews
exports.getBookReviews=(productId) =>{
  return axios.get(`${API_BASE_URL}/reviews`,{params : {
    productId: productId
  }})
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    return data;
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
  });
};
//Done
//Carts
exports.getUserCart = (userId) =>{
  return axios.get(`${API_BASE_URL}/carts`,{params: {
    userId : userId
  }})
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    const result= getBooksFromListId(data[0].productId);
    return result;
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
  });
};
//Done
exports.getUserCartProfile = (userId) => {
  return axios.get(`${API_BASE_URL}/carts`,{params: {
    userId : userId
  }})
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    return data;
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
  });
};
//Done
//Orders
exports.getUsersPurchasedBooks = (userId) => {
  return axios.get(`${API_BASE_URL}/orders`,{params: {
    userId : userId
  }})
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    const result= getBooksFromListId(data[0].productId);
    return result;
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
  });
};
//Done
exports.getUserOrdersProfile = (userId) => {
  return axios.get(`${API_BASE_URL}/orders`,{params: {
    userId : userId
  }})
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    return data;
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
  });
};
//Done
//Favorites
exports.getUsersFavoritesBooks = (userId) => {
  return axios.get(`${API_BASE_URL}/favorites`,{params: {
    userId : userId
  }})
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    const result= getBooksFromListId(data[0].productId);
    return result;
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
  });
};
//Done
exports.getUserFavoritesProfile = (userId) => {
  return axios.get(`${API_BASE_URL}/favorites`,{params: {
    userId : userId
  }})
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    return data;
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
  });
};
//Done
//Update Part
//Books
exports.UpdateBooksByID = ({id,name, price, userId, publishedAt, quantity, status, image }) => {
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
  
  axios.patch(`${API_BASE_URL}/products/${id}`,body)
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    console.log(data);
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error updating data:', error);
  });
};
//Done
//Users
exports.UpdateUserProfileByID =({id,name,email,password,address}) => {
  const body = {
    name,
    email,
    password,
    address
  };

  Object.keys(body).forEach((key) => body[key] === undefined && delete body[key]);
  
  axios.patch(`${API_BASE_URL}/users/${id}`,body)
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    console.log(data);
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error updating data:', error);
  });
};
//Done
//Reviews
exports.UpdateUserReviewByID =({id, productId, userId, text }) => {
  const body = {
    productId,
    userId, 
    text
  };

  Object.keys(body).forEach((key) => body[key] === undefined && delete body[key]);
  
  axios.patch(`${API_BASE_URL}/reviews/${id}`,body)
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    console.log(data);
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error updating data:', error);
  });
};
//Done
//Carts
exports.UpdateCartsByUserID =async (userId, productId) => {
  const body = {
    productId
  };
  const CartInfo= await exports.getUserCartProfile(userId);
  axios.patch(`${API_BASE_URL}/carts/${CartInfo[0].id}`,body)
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;

    console.log(data);
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error updating data:', error);
  });
};
//Done
//Orders
exports.UpdateOrdersByUserID =async (userId, productId) => {
  const body = {
    productId
  };

  const OrderInfo= await exports.getUserOrdersProfile(userId);
  axios.patch(`${API_BASE_URL}/orders/${OrderInfo[0].id}`,body)
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    console.log(data);
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error updating data:', error);
  });
};
//Done
//Favorites
exports.UpdateFavoritesByUserID =async (userId, productId) => {
  const body = {
    productId
  };
  
  const FavoriteInfo= await exports.getUserCartProfile(userId);
  axios.patch(`${API_BASE_URL}/favorites/${FavoriteInfo[0].id}`,body)
  .then(response => {
    // Dữ liệu từ response.data sẽ chứa thông tin bạn cần
    const data = response.data;
    
    console.log(data);
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Error updating data:', error);
  });
};
//Done
// Testing Function
async function exampleFunction() {
  const productId =[
    10,
    11
  ]
  try {
    await exports.UpdateFavoritesByUserID(0,productId);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Check if this file is the entry point and run the exampleFunction
if (require.main === module) {
  exampleFunction();
}