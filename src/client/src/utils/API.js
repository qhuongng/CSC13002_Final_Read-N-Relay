const axios = require('axios');

const API_BASE_URL = 'http://localhost:3030';

//Books
//Home Page
//Recently Post && You Might Like
exports.getBooksByPage=(page,limit) =>{
  return axios.get(`${API_BASE_URL}/products?_page=${page}&_limit=${limit}`)
};

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

async function getBooksFromListId(productId) {
  const data = [];

  for (const Id of productId) {
    const result = await exports.getBooksByAttributes({ id: Id });
    data[Id] = result[0];
  }

  return Object.values(data);
}
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
// Testing Function
async function exampleFunction() {
  const name = 'Harry Potter full series';
  try {
    const result = await exports.getUsersFavoritesBooks(0);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Check if this file is the entry point and run the exampleFunction
if (require.main === module) {
  exampleFunction();
}