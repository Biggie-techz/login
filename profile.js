let user = JSON.parse(localStorage.getItem("loggedInUser"));
let account = JSON.parse(localStorage.getItem("account"));
let blogObj = JSON.parse(localStorage.getItem("blogData"));
console.log(blogObj);

let profileImg = document.getElementById("profileImg");
let profileName = document.getElementById("profileName");
let editUserName = document.getElementById("editUserName");
let editUsernameBtn = document.getElementById("editUsernameBtn");
let editProfileImgBtn = document.getElementById("editProfileImgBtn");
let container = document.getElementById("container");
let logOut = document.getElementById("logOut");

if (!user) {
  alert("Unauthorized access");
  document.body.innerHTML = "Unauthorized access";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
}

logOut.addEventListener("click", () => {
  let confirmLogout = confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    localStorage.removeItem("loggedInUser");

    document.querySelector(".container").innerHTML = `
        <div class="spinner" id="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>`;
    document.getElementById("loader").style.display = "block";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  }
});

// Function to handle file selection and update the profile image
function pickFile(e, imgElement) {
  let file = e.target.files[0];
  let reader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
  }

  reader.addEventListener("load", (ev) => {
    let imageUrl = ev.target.result || "asset/download-removebg-preview.png";
    imgElement.style.backgroundImage = `url(${imageUrl})`;
    imgElement.style.backgroundSize = "cover";
    imgElement.style.backgroundPosition = "center";
    imgElement.style.backgroundRepeat = "no-repeat";

    // Save the image URL to the user object and local storage
    account.forEach((acct) => {
      if (acct.username === user.username) {
        acct.profileImg = imageUrl;
      }
    });
    blogObj.forEach((blog) => {
      if (blog.author === user.username) {
        blog.authorImg = imageUrl;
      }
    });
    user.profileImg = imageUrl;
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("account", JSON.stringify(account));
    localStorage.setItem("blogData", JSON.stringify(blogObj));
  });
}

// Function to display the saved profile image when the page loads
function displayImage() {
  if (user.profileImg) {
    profileImg.style.backgroundImage = `url(${user.profileImg})`;
    profileImg.style.backgroundSize = "cover";
    profileImg.style.backgroundPosition = "top";
    profileImg.style.backgroundRepeat = "no-repeat";
  }
}

function displayUsername() {
  profileName.innerHTML = user.username;
}

function editUser() {
  editUserName.innerHTML = `
      <button id="remove" onclick="remove()">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <p>Edit Username</p>
      <input id="username" type="text" placeholder="Username" />
      <button onclick="edit()" class="submit">Edit</button>`;
  editUserName.classList.add("active");
  editUsernameBtn.style.display = "none";
  editProfileImgBtn.style.display = "none";
  container.classList.add("blur");
}

function remove() {
  editUserName.classList.remove("active");
  editUsernameBtn.style.display = "block";
  editProfileImgBtn.style.display = "block";
  container.classList.remove("blur");
}

function edit() {
  let newUsername = document.getElementById("username").value;
  if (newUsername === "") {
    alert("Please enter a username");
    return;
  }

  // Update the username in the account list
  let account = JSON.parse(localStorage.getItem("account"));
  let userIndex = account.findIndex(
    (acctUser) => acctUser.username === user.username
  );
  if (userIndex !== -1) {
    account[userIndex].username = newUsername;
    localStorage.setItem("account", JSON.stringify(account));
  }

  // Update the username in the blog posts
  blogObj.forEach((blog) => {
    if (blog.author === user.username) {
      blog.author = newUsername;
    }
  });
  localStorage.setItem("blogData", JSON.stringify(blogObj));

  // Update the username in the logged-in user object
  user.username = newUsername;
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  // Update the username displayed on the profile
  displayUsername();
  remove();
}


// Call displayImage and displayUsername when the page loads
displayImage();
displayUsername();
