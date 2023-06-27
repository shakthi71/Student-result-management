const params = new URLSearchParams(window.location.search);
const error = params.get("error");

if (error != null || error != "") {
  if (error == "empty") alert("Username and password is required");
  else if (error == "invalid-username") alert("Username is wrong");
  else if (error == "invalid-password") alert("Password is wrong");
}
