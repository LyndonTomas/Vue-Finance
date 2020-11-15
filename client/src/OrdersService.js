import axios from "axios";
const url = "http://localhost:5000/api/orders/";

// This is the Middleware
class OrdersService {
  // Get Posts
  // Done
  static getPosts() {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((res) => {
          const data = res.data.orders;
          resolve(
            data.map((post) => ({
              _id: post._id,
              payment_method: post.payment_method,
              payment_status: post.payment_status,
              order_status: post.payment_status,
              fee: post.fee,
              is_deleted: post.is_deleted,
              user: {
                fullname: {
                  firstname: post.user.fullname.firstname,
                  lastname: post.user.fullname.lastname,
                },
                fullAddress: {
                  house_number: post.user.full_address.house_number,
                  street_name: post.user.full_address.street_name,
                  province: post.user.full_address.province,
                  city: post.user.full_address.city,
                  district: post.user.full_address.district,
                  barangay: post.user.full_address.barangay,
                },
              },
              email: post.email,
              mobile_number: post.mobile_number,
              item: {
                id: post.item.id,
                name: post.item.name,
                price: post.item.price,
                quantity: post.item.quantity,
              },
              shipping_address: {
                house_number: post.shipping_address.house_number,
                street_name: post.shipping_address.street_name,
                district: post.shipping_address.district,
                city: post.shipping_address.city,
                province: post.shipping_address.province,
                barangay: post.shipping_address.barangay,
              },
              created_at: new Date(post.created_at).toLocaleDateString(),
              updated_at: post.updated_at,
            }))
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // Update Posts
  // Done
  static updatePost(id, value) {
    console.log("changing status...");
    console.log("changing changed...");
    return axios.patch(`${url}${id}/${value}`);
  }
  // Delete Posts
  // Done
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }

  static dateClicked(date) {
    const queryDate = new Date(date);
    const year = queryDate.getFullYear();
    const month = queryDate.getMonth() + 1;
    const day = queryDate.getDate();
    return axios.get(
      `http://syntax-api-server.herokuapp.com/api/orders/${year}/${month}/${day}`
    );
  }
}

export default OrdersService;
