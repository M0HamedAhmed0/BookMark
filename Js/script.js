var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var siteData = document.getElementById("siteData");
var submitBtn = document.getElementById("submitBtn");
var closeBtn = document.getElementById("close");
var box = document.getElementById("box");
var bookMark = [];

if (localStorage.getItem("newBookmark") == null) {
  bookMark = [];
} else {
  bookMark = JSON.parse(localStorage.getItem("newBookmark"));
  displaySite(bookMark);
}

function addBookmark() {
  if (checkNotValid() == true) {
    if (validation(siteName) == true && validation(siteUrl) == true) {
      var newBookmark = {
        name: siteName.value,
        url: siteUrl.value,
      };
      bookMark.push(newBookmark);
      localStorage.setItem("newBookmark", JSON.stringify(bookMark));
      displaySite(bookMark);
      resetForm();
      console.log(bookMark);
    } else {
      displayAlert();
    }
  }
}

function displaySite(bookMark) {
  var bookMarker = "";
  for (var i = 0; i < bookMark.length; i++) {
    bookMarker += `<div class="row align-items-center border-bottom m-auto text-center p-2">
                        <div class="col-3">
                            <h6>${[i + 1]}</h6>
                        </div>
                        <div class="col-3">
                            <h6>${bookMark[i].name}</h6>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-success px-3"><a href="https://${
                              bookMark[i].url
                            }" class="text-decoration-none text-white" target="_blank"><i class="fa-solid fa-eye pe-1"></i>Visit</a></button>
                        </div>
                        <div class="col-3">
                            <button onclick="deleteBook(${i})" class="btn btn-danger px-3"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button>
                        </div>
                    </div>`;
  }
  siteData.innerHTML = bookMarker;
}

function resetForm() {
  siteName.value = "";
  siteUrl.value = "";
}

function deleteBook(index) {
  bookMark.splice(index, 1);
  localStorage.setItem("newBookmark", JSON.stringify(bookMark));
  displaySite(bookMark);
}

function validation(e) {
  var regex = {
    siteName: /^[a-zA-Z]{3,15}$/,
    siteUrl:
      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  };

  if (regex[e.id] && regex[e.id].test(e.value) == true) {
    e.classList.add("is-valid");
    e.classList.remove("is-invalid");
    return true;
  } else {
    e.classList.add("is-invalid");
    e.classList.remove("is-valid");
    return false;
  }
}

function checkNotValid() {
  if (siteName.value == "" || siteUrl.value == "") {
    displayAlert();
    return false;
  } else {
    return true;
  }
}

function displayAlert() {
  var alertBox = document.getElementById("box");
  alertBox.classList.remove("d-none");
}

function closeAlert() {
  box.classList.add("d-none");
}
closeBtn.addEventListener("click", closeAlert);

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box")) {
    closeAlert();
  }
});
