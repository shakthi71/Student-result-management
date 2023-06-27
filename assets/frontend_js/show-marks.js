const params = new URLSearchParams(window.location.search);
const error = params.get("error");

if (error == "internal-server-error") {
  alert("Cannot add marks. Internal server error");
}
