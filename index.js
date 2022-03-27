const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

// ========== DISPLAY LOGIC ========== //

const openDropdown = () => {
  const dropdown = document.querySelector(".dropdown__content");
  dropdown.classList.toggle("show-dropdown");
};

const selectDropdownValue = (value) => {
  const countryInput = document.querySelector("#country");
  countryInput.value = value;
};

const displayErrors = (errors) => {
  const fields = Object.keys(errors);
  fields.forEach((field) => {
    const formInput = document.querySelector(`#${field}`);
    const errMsg = document.querySelector(`#${field}-error`);
    if (errors[field] !== "") {
      formInput.classList.add("input-error");
      errMsg.innerText = errors[field];
    } else {
      formInput.classList.remove("input-error");
      errMsg.innerText = "";
    }
  });
};

const showSnackbar = () => {
  const snackbar = document.querySelector(".snackbar");
  snackbar.classList.add("show");

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    snackbar.classList.remove("show");
  }, 3000);
};

// ========== VALIDATION LOGIC ========== //

const createValidator = ({ field = "", required = false, regex = null }) => ({
  field: field,
  required: required,
  regex: regex && new RegExp(regex),
  isEmpty: function (v) {
    return v === "" || v === null;
  },
  validate: function (v) {
    if (required && this.isEmpty(v)) {
      return `${field} is required`;
    }

    if (regex !== null && !regex.test(v)) {
      return `${field} is invalid`;
    }

    return "";
  },
});

const formValidators = {
  email: createValidator({
    field: "Email",
    required: true,
    regex: EMAIL_REGEX,
  }),
  phone: createValidator({
    field: "Phone",
    required: true,
    regex: PHONE_REGEX,
  }),
  name: createValidator({
    field: "Full Name",
    required: true,
  }),
  address: createValidator({
    field: "Address",
    required: true,
  }),
  city: createValidator({
    field: "City",
    required: true,
  }),
  country: createValidator({
    field: "Country",
    required: true,
  }),
  postal_code: createValidator({
    field: "Postal Code",
    required: true,
  }),
};

const hasFormErrors = (errors) => {
  let hasErrors;
  Object.keys(errors).forEach((field) => {
    if (errors[field] !== "") {
      hasErrors = true;
    }
  });
  return hasErrors;
};

const form = document.querySelector("#checkout-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const errors = {
    email: formValidators["email"].validate(form["email"].value),
    phone: formValidators["phone"].validate(form["phone"].value),
    name: formValidators["name"].validate(form["name"].value),
    address: formValidators["address"].validate(form["address"].value),
    city: formValidators["city"].validate(form["city"].value),
    country: formValidators["country"].validate(form["country"].value),
    postal_code: formValidators["postal_code"].validate(
      form["postal_code"].value
    ),
  };

  displayErrors(errors);

  if (!hasFormErrors(errors)) {
    showSnackbar();
  }
});

// close dropdown when clicked outside
window.onclick = function (e) {
  if (!e.target.matches(".dropdown__trigger")) {
    const dropdown = document.querySelector(".dropdown__content");
    if (dropdown.classList.contains("show-dropdown")) {
      dropdown.classList.remove("show-dropdown");
    }
  }
};
