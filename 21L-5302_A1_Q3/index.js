document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const viewTableBtn = document.getElementById("viewTableBtn");

  // Function to validate email format
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Function to validate phone number format
  function validatePhoneNumber(phoneNumber) {
    const re = /^\d{11}$/; // Assuming a 10-digit phone number format
    return re.test(phoneNumber);
  }

  // Function to validate required fields
  function validateForm() {
    const firstName = document
      .querySelector('input[name="first_name"]')
      .value.trim();
    const lastName = document
      .querySelector('input[name="last_name"]')
      .value.trim();
    const phoneNumber = document
      .querySelector('input[name="phone_number"]')
      .value.trim();
    const email = document
      .querySelector('input[name="email_addr"]')
      .value.trim();
    const address = document
      .querySelector('input[name="address"]')
      .value.trim();

    // Perform validation for required fields
    if (
      firstName === "" ||
      lastName === "" ||
      phoneNumber === "" ||
      email === "" ||
      address === ""
    ) {
      alert("Please fill out all required fields.");
      return false;
    }

    // Additional validation for email and phone number
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return false;
    }

    return true;
  }

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      // If form is valid, log form data and process
      console.log("Form data submitted successfully:");
      const formData = new FormData(form);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Here you can process the form data further (e.g., send it to a server)

      // Clear form fields after submission (optional)
      form.reset();
    }
  }

  // Add event listener for form submission
  form.addEventListener("submit", handleSubmit);

  // Function to transform form data into table format
  function transformDataIntoTable() {
    const formData = new FormData(form); // Get form data
    const table = document.createElement("table"); // Create table element

    // Create table headers
    const headers = ["Field", "Value"];
    const headerRow = table.insertRow();
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    // Iterate over form data and populate table rows
    formData.forEach((value, key) => {
      const row = table.insertRow();
      const fieldCell = row.insertCell();
      const valueCell = row.insertCell();
      fieldCell.textContent = key;
      valueCell.textContent = value;
    });

    // Clear previous table, if any
    const previousTable = document.getElementById("applicationsTable");
    if (previousTable) {
      previousTable.parentNode.removeChild(previousTable);
    }

    // Append the new table to the form
    table.id = "applicationsTable";
    form.insertAdjacentElement("afterend", table);
  }

  // Add event listener for "View Applications as Table" button
  viewTableBtn.addEventListener("click", function () {
    transformDataIntoTable();
  });
});
