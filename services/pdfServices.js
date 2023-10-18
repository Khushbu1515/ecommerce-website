const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");


// Function to generate an invoice
function createInvoice(data) {
  const jsonData = data;
  const uploadPath = path.join(__dirname, "..", "upload");
  const uploadName = `result_${Date.now()}.pdf`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
      height: "45mm",
      contents: '<div style="text-align: center;">Author: Arghya Mallick</div>',
    },
    footer: {
      height: "28mm",
      contents: {
        first: "Cover page",
        2: "Second page", // Any page number is working. 1-based index
        default:
          '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: "Last Page",
      },
    },
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  let totalAmount = 0;

  const invoiceHTML = `
    <div class="invoice" style=" width: 80%;margin: 0 auto; border: 1px solid #000;padding: 10px;">
      <h2>Invoice</h2>
      <p><strong>User:</strong> ${
        jsonData[0].Order_details[0].Order.User.userName
      }</p>
    <p><strong>Address:</strong> 
      ${jsonData[0].Order_details[0].Address.address}, 
      ${jsonData[0].Order_details[0].Address.zip_code}, 
      ${jsonData[0].Order_details[0].Address.city}, 
      ${jsonData[0].Order_details[0].Address.state}, 
      ${jsonData[0].Order_details[0].Address.country}
    </p>
      <p><strong>User:</strong> ${
        jsonData[0].Order_details[0].Order.User.userName
      }</p>
      <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid #000;">Product Name</th>
        <th style="border: 1px solid #000;">Description</th>
        <th style="border: 1px solid #000;">Price</th>
        <th style="border: 1px solid #000;">Quantity</th>
        <th style="border: 1px solid #000;">Total</th>
      </tr>
      ${jsonData
        .map((item) => {
          totalAmount += item.Order_details[0].price;
          user = item.Order_details[0].Order.User.userName;
          return `
          <tr>
            <td style="border: 1px solid #000;">${item.product_name}</td>
            <td style="border: 1px solid #000;">${item.description}</td>
            <td style="border: 1px solid #000;">${item.price}</td>
            <td style="border: 1px solid #000;">${item.Order_details[0].quantity}</td>
            <td style="border: 1px solid #000;">${item.Order_details[0].price}</td>
          </tr>
        `;
        })
        .join("")}
    </table>
      <p><strong>Total Amount:</strong> ${totalAmount}</p>
      <p><strong>Invoice Date:</strong> ${formattedDate}</p>
    </div>
  `;

  const document = {
    html: invoiceHTML,
    data: {
      data: jsonData,
    },
    path: path.join(uploadPath, uploadName),
    type: "",
  };

  pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
  const url = `http://localhost:3300/upload/${uploadName}`;
  return url;
}

module.exports = {
  createInvoice,
};