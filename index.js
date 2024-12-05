let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let modal = document.getElementById("modal");
let signinEmail = document.getElementById("signinEmail");
let signinPassword = document.getElementById("signinPassword");

const usernameRegex = /^[a-zA-Z]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^.{8,}$/;

let users = [];

document.addEventListener("DOMContentLoaded", function () {
  const signupButton = document.getElementById("signupButton");
  const signinButton = document.getElementById("signinButton");
  const logout = document.getElementById("logout");

  if (signupButton) {
    signupButton.addEventListener("click", signup);
  }

  if (signinButton) {
    signinButton.addEventListener("click", signin);
  }
  if (logout) {
    logout.addEventListener("click", function () {
      localStorage.removeItem("currentUser");

      window.location.href = "index.html";
    });
  }
});

function signup() {
  let signupNameValue = signupName.value;
  let signupEmailValue = signupEmail.value;
  let signupPasswordValue = signupPassword.value;

  validate(signupName, usernameRegex);
  validate(signupEmail, emailRegex);
  validate(signupPassword, passwordRegex);

  if (signupName.classList.contains("is-invalid")) {
    openModal("Username should be at least 2 characters");
    return;
  }

  if (signupEmail.classList.contains("is-invalid")) {
    openModal("Please enter a valid email address");
    return;
  }

  if (signupPassword.classList.contains("is-invalid")) {
    openModal("Password should be at least 8 characters");
    return;
  }

  if (validateEmail(signupEmailValue)) {
    openModal("Email already exists");
    return;
  }

  let newUser = {
    name: signupNameValue,
    Email: signupEmailValue,
    password: signupPasswordValue,
  };

  var storedUsername = JSON.parse(localStorage.getItem("users"));
  if (storedUsername) {
    users = storedUsername;
  }

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  console.log(JSON.parse(localStorage.getItem("users")));

  openModal("User created successfully");
  window.location.href = "index.html";
  clearform();
}

function signin() {
  let signinEmailValue = signinEmail.value;
  let signinPasswordValue = signinPassword.value;

  validate(signinEmail, emailRegex);
  validate(signinPassword, passwordRegex);

  if (
    signinEmail.classList.contains("is-invalid") ||
    signinPassword.classList.contains("is-invalid")
  ) {
    openModal("Email or password is wrong");
    return;
  }

  var storedUsername = JSON.parse(localStorage.getItem("users"));
  users = storedUsername;

  for (let i = 0; i < users.length; i++) {
    if (
      signinEmailValue === users[i].Email &&
      signinPasswordValue === users[i].password
    ) {
      localStorage.setItem("currentUser", users[i].name);

      openModal("Login successful");
      window.location.href = "home.html";
      clearform();
      return;
    }
  }
  openModal("Email or password is wrong");

}

function validate(testedElement, regex) {
  var testedValue = testedElement.value;
  if (regex.test(testedValue)) {
    testedElement.classList.add("is-valid");
    testedElement.classList.remove("is-invalid");
  } else {
    testedElement.classList.add("is-invalid");
    testedElement.classList.remove("is-valid");
  }
}

function clearform() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}

function openModal(x) {
  document.getElementById("customModal").style.display = "flex";
  modal.innerHTML = x;
}

function closeModal() {
  document.getElementById("customModal").style.display = "none";
}

function validateEmail(email) {
  var storedUsername = JSON.parse(localStorage.getItem("users"));
  users = storedUsername;

  for (let i = 0; i < users.length; i++) {
    if (email === users[i].Email) {
      console.log("Email already exists");
      return true;
    }
  }
  return false;
}
