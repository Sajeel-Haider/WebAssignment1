document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const viewTableBtn = document.getElementById("viewTableBtn");

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validatePhoneNumber(phoneNumber) {
    const re = /^\d{11}$/;
    return re.test(phoneNumber);
  }

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

  function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      console.log("Form data submitted successfully:");
      const formData = new FormData(form);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      form.reset();
    }
  }

  form.addEventListener("submit", handleSubmit);

  function transformDataIntoTable() {
    const formData = new FormData(form);
    const table = document.createElement("table");

    const headers = ["Field", "Value"];
    const headerRow = table.insertRow();
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    formData.forEach((value, key) => {
      const row = table.insertRow();
      const fieldCell = row.insertCell();
      const valueCell = row.insertCell();
      fieldCell.textContent = key;
      valueCell.textContent = value;
    });

    const previousTable = document.getElementById("applicationsTable");
    if (previousTable) {
      previousTable.parentNode.removeChild(previousTable);
    }

    table.id = "applicationsTable";
    form.insertAdjacentElement("afterend", table);
  }

  viewTableBtn.addEventListener("click", function () {
    transformDataIntoTable();
  });
});
