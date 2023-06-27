const params = new URLSearchParams(window.location.search);
const error = params.get("error");

if (error == "internal-server-error") {
  alert("Cannot add marks. Internal server error");
}

if (error == "empty") {
  alert("Enter register number and date of birth");
}

if (error == "not-found") {
  alert("Enter correct register number and date of birth");
}
