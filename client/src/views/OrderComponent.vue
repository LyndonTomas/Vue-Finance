<template>
  <!-- The FrontEnd -->
  <div id="Orders-Container" class="container">
    <img
      title="Order List Page"
      id="client_logo"
      src="../assets/client-logo.png"
    />

    <br /><br /><br /><br />
    <h1 id="page-title">Order List</h1>

    <!-- place greetings here -->

    <div id="refresh">
      <button class="btn btn-info" @click="refresh">Refresh</button>
    </div>

    <div class="logout">
      <button v-on:click="logOut" class="btn btn-warning">LogOut</button>
    </div>

    

    <div class="entries">
      <label for=""
        ><h4><strong>Entries: </strong> {{ orders.length }}</h4></label
      >
    </div>
    <!-- Date -->
    <span>
      <input id="dateInput" v-model="date" type="date" @change="dateClicked" />
    </span>

    <table id="orderTable" class="table w-auto table-responsive-xl">
      <thead class="thead-dark">
        <th><h4>Order_ID</h4></th>
        <th><h4>Date</h4></th>
        <th><h4>User Name</h4></th>
        <th><h4>Item Name</h4></th>
        <th><h4>Quantity</h4></th>
        <th><h4>Payment Method</h4></th>
        <th><h4>Payent Status</h4></th>
        <th><h4>Order Status</h4></th>
        <th><h4>Total Amount</h4></th>
        <th><h4>Option</h4></th>
      </thead>
      <tbody>
        <tr
          v-bind:class="{ 'is-complete': order.is_deleted }"
          v-for="(order, index) in orders"
          v-bind:item="order"
          v-bind:index="index"
          v-bind:key="order._id"
        >
          <th scope="row">{{ order._id }}</th>
          <td>{{ order.created_at }}</td>
          <td>
            <strong
              >{{ order.user.fullname.firstname }}&nbsp;{{
                order.user.fullname.lastname
              }}</strong
            >
          </td>
          <td>
            <a
              :href="
                'https://override-syntax.herokuapp.com/item/' + order.item.id
              "
              >{{ order.item.name }}</a
            >
          </td>
          <td>{{ order.item.quantity }}</td>
          <td>{{ order.payment_method }}</td>
          <td>
            <select v-on:change="updatePost(order._id, $event)" name="">
              <option value="none" selected disabled hidden>
                Select an Option
              </option>
              <option value="Processing">Processing</option>
              <option value="Paid">Paid</option>
            </select>
          </td>
          <td><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="delivered" checked>
          Delivered
          </td>
          <td>
            &#8369; &nbsp;
            <strong>{{
              order.item.quantity * order.item.price + order.fee
            }}</strong>
          </td>
          <td class="options">
            <button
              class="btn btn-success"
              title="Generate Receipt"
              v-on:click="
                showReceipt(
                  order._id,
                  order.created_at,
                  order.user.fullname.firstname,
                  order.user.fullname.lastname,
                  order.item.name,
                  order.item.price,
                  order.item.quantity,
                  order.payment_method,
                  order.payment_status,
                  order.fee,
                  order.shipping_address.house_number,
                  order.shipping_address.street_name,
                  order.shipping_address.province,
                  order.shipping_address.city,
                  order.shipping_address.district,
                  order.shipping_address.barangay
                )
              "
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              title="Delete Order"
              class="btn btn-danger"
              v-on:click="deletePost(order._id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <img src="" alt="" />
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import OrdersService from "../OrdersService";
export default {
  name: "OrderComponent",
  data() {
    return {
      orders: [],
      error: "",
      text: "",
      deleted: null,
      date: "",
      delivered:""
    };
  },
  props: ["username"],
  async created() {
    try {
      this.orders = await OrdersService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    refresh(){
      window.location.reload()
    },
    async dateClicked() {
      this.orders = await OrdersService.dateClicked(this.date).then(
        (res) => res.data.orders
      );
    },
    async deletePost(id) {
      var choice = confirm(
        "Are you sure you want to permanently delete this order?"
      );
      if (choice == true) {
        await OrdersService.deletePost(id);
        this.orders = await OrdersService.getPosts();
      }
    },
    async updatePost(id, event) {
      await OrdersService.updatePost(id, event.target.value);
      this.orders = await OrdersService.getPosts();
    },
    logOut() {
      var choice = confirm("Are you sure you want to log out?");
      if (choice == true) {
        this.$router.push({ name: "login" });
      }
    },
    showReceipt(
      id,
      date,
      fname,
      lname,
      itemName,
      price,
      quantity,
      payment_method,
      payment_status,
      fee,
      houseNumber,
      streetName,
      province,
      city,
      district,
      barangay
    ) {
      var pdf = new jsPDF();
      //  Order Id
      pdf.text("OrderId : ", 5, 10);
      pdf.text(id, 30, 10);
      // Date
      pdf.text("Date: ", 5, 20);
      pdf.text(date, 30, 20);
      // Name
      pdf.text("Customer Name: ", 5, 30);
      pdf.text(fname + " " + lname, 50, 30);

      // Item
      pdf.text("Item Name: ", 5, 40);
      pdf.text(itemName, 40, 40);
      // Price
      pdf.text("ItemPrice: ", 5, 50);
      pdf.text(price.toString(), 38, 50);
      // Quantity
      pdf.text("Quantity: ", 5, 60);
      pdf.text(quantity.toString(), 30, 60);
      // Payment Method
      pdf.text("Payment Method: ", 5, 70);
      pdf.text(payment_method, 50, 70);
      // Payment Status
      pdf.text("Payment Status: ", 5, 80);
      pdf.text(payment_status, 50, 80);
      // Fee
      pdf.text("Fee: ", 5, 90);
      pdf.text(fee.toString(), 30, 90);
      // Shipping Address
      pdf.text("Shipping Address: ", 5, 100);
      pdf.text(
        houseNumber.toString() +
          " " +
          streetName.toString() +
          " " +
          barangay.toString() +
          " " +
          district.toString() +
          " " +
          city.toString() +
          " " +
          province.toString(),
        30,
        110
      );

      // Total
      var total = price * quantity + fee;
      pdf.text("Total: ", 5, 120);
      pdf.text(total.toString(), 30, 120);

      // Saving PDF
      pdf.save("report.pdf");
    },
  },
};
</script>

<style lang="scss" scoped>
#Orders-Container {
  h1 {
    display: grid;
    place-items: center;
    color: white;
  }
  a {
    color: white;
    text-decoration: none;
    &:hover {
      transition: all ease-in-out 0.8s;
      text-decoration: underline;
    }
  }

  padding: 0px;
  margin-left: 5%;
  font-family: Kumbh Sans, Helvetica, Arial, sans-serif;
  width: 100%;
  font-family: Kumbh Sans, Helvetica, Arial, sans-serif;
  background: #76cca6;

  #client_logo {
    max-width: 300px;
    position: relative;
    float: left;
    background-image: linear-gradient(45deg, #feb690 0%, #f7a387 100%);
    background-repeat: no-repeat;
    background-size: 100% 0.2em;
    background-position: 0 88%;
    transition: background-size 0.25s ease-in;
    &:hover {
      background-size: 100% 88%;
    }
  }
  #page_title {
    padding: 5em;
    display: grid;
    place-items: center;
  }
  .logout {
    display:inline-block;
    position: relative;
    float:right;
  }

  #refresh{
    display:inline-block;
    float:right;
  }
  .entries {
    margin: 0px, 0px, 0px, 50px;
    left: 5px;
    display: absolute;
  }
  #dateInput {
    display: inline-block;
  }
  #orderTable {
    thead {
      th {
        h4 {
          width: auto;
          text-align: center;
          &:hover {
            transition: 0.4s all ease-in-out;
            text-decoration: underline;
          }
        }
      }
    }
    tbody {
      tr {
        select {
          padding: 3px;
          margin: 3px;
          border-radius: 5px;
          option {
            padding: 5px;
            background: #c8ebdf;
          }
        }
        &:hover {
          background-color: #82d682;
          transition: 0.4s all ease-in-out;
        }
      }
    }
  }
}

.is-complete {
  display: none;
}
</style>
