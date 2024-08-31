// Get elements from the HTML
const firstName = document.getElementById("firstName");
const firstNamePlaceholder = document.getElementById("firstNamePlaceholder");
const lastName = document.getElementById("lastName");
const lastNamePlaceholder = document.getElementById("lastNamePlaceholder");
const username = document.getElementById("username");
const usernamePlaceholder = document.getElementById("usernamePlaceholder");
const email = document.getElementById("email");
const emailPlaceholder = document.getElementById("emailPlaceholder");
const phone = document.getElementById("phone");
const phonePlaceholder = document.getElementById("phonePlaceholder");
const password = document.getElementById("password");
const passwordPlaceholder = document.getElementById("passwordPlaceholder");
const confirmPassword = document.getElementById("confirmPassword");
const confirmPasswordPlaceholder = document.getElementById(
  "confirmPasswordPlaceholder"
);
const submit = document.getElementById("submit");

let acctObj = {};
let account = JSON.parse(localStorage.getItem("account")) || [];

// Regular Expressions for validation
const nameRegex = /^[a-zA-Z-]+$/;
const usernameRegex = /^[a-zA-Z0-9-_]+$/;
const phoneRegex = /^[0][7-9][0-1][0-9]{8}$/;
const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,16}$/;

// Function to display validation feedback
const displayFeedback = (
  inputElement,
  placeholderElement,
  isValid,
  defaultText,
  errorMessage
) => {
  if (isValid || inputElement.value === "") {
    inputElement.style.outline = "none";
    inputElement.style.border = "1px solid rgba(105, 105, 105, 0.397)";
    placeholderElement.style.color = "grey";
    placeholderElement.style.borderColor = "grey";
    placeholderElement.innerHTML = defaultText;
  } else {
    inputElement.style.border = "2px solid red";
    placeholderElement.style.color = "red";
    placeholderElement.style.borderColor = "red";
    placeholderElement.innerHTML = errorMessage;
  }
};

// First Name validation
firstName.addEventListener("input", () => {
  displayFeedback(
    firstName,
    firstNamePlaceholder,
    nameRegex.test(firstName.value),
    "First Name",
    "Invalid Name Format"
  );
});

// Last Name validation
lastName.addEventListener("input", () => {
  displayFeedback(
    lastName,
    lastNamePlaceholder,
    nameRegex.test(lastName.value),
    "Last Name",
    "Invalid Name Format"
  );
});

// Username validation
username.addEventListener("input", () => {
  const usernameExists = account.some((acc) => acc.username === username.value);
  if (usernameExists) {
    displayFeedback(
      username,
      usernamePlaceholder,
      false,
      "Username",
      "Username taken"
    );
    return;
  }
  displayFeedback(
    username,
    usernamePlaceholder,
    usernameRegex.test(username.value),
    "Username",
    "Invalid Username Format"
  );
});

// Email validation
email.addEventListener("input", () => {
  const emailExists = account.some((acc) => acc.email === email.value);
  if (emailExists) {
    displayFeedback(
      email,
      emailPlaceholder,
      false,
      "Email",
      "Account with this email already exists"
    );
    return;
  }
  displayFeedback(
    email,
    emailPlaceholder,
    emailRegex.test(email.value),
    "Email",
    "Invalid Email Format"
  );
});

// Phone validation
phone.addEventListener("input", () => {
  const phoneExists = account.some((acc) => acc.phone === phone.value);
  if (phoneExists) {
    displayFeedback(
      phone,
      phonePlaceholder,
      false,
      "Phone Number",
      "Account with this phone number already exists"
    );
    return;
  }
  displayFeedback(
    phone,
    phonePlaceholder,
    phoneRegex.test(phone.value),
    "Phone Number",
    "Invalid Phone Number"
  );
});

// Password validation
password.addEventListener("input", () => {
  displayFeedback(
    password,
    passwordPlaceholder,
    passwordRegex.test(password.value),
    "Password",
    "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
  );

  // Trigger confirm password validation when the password changes
  confirmPassword.dispatchEvent(new Event("input"));
});

// Confirm Password validation
confirmPassword.addEventListener("input", () => {
  const isMatching = confirmPassword.value === password.value;
  displayFeedback(
    confirmPassword,
    confirmPasswordPlaceholder,
    isMatching,
    "Confirm Password",
    "Passwords do not match"
  );
});

// Submit button click event
submit.addEventListener("click", () => {
  const usernameExists = account.some((acc) => acc.username === username.value);
  const emailExists = account.some((acc) => acc.email === email.value);
  const phoneExists = account.some((acc) => acc.phone === phone.value);

  if (usernameExists || emailExists || phoneExists) {
    if (usernameExists) alert("Username already exists");
    if (emailExists) alert("Email already exists");
    if (phoneExists) alert("Phone number already exists");
    return;
  }

  if (
    nameRegex.test(firstName.value) &&
    nameRegex.test(lastName.value) &&
    usernameRegex.test(username.value) &&
    emailRegex.test(email.value) &&
    phoneRegex.test(phone.value) &&
    passwordRegex.test(password.value) &&
    confirmPassword.value === password.value
  ) {
    acctObj = {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    };
    account.push(acctObj);
    localStorage.setItem("account", JSON.stringify(account));
    alert("Account created successfully");
    document.getElementById("form").style.display = "none";
    document.getElementById("loader").style.display = "block";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  } else {
    alert("Please input all fields correctly");
  }
});

document.getElementById("haveAnAccount").addEventListener("click", () => {
  document.getElementById("form").style.display = "none";
  document.getElementById("loader").style.display = "block";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});

console.log(JSON.parse(localStorage.getItem("account")));
