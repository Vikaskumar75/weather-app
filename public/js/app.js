console.log("Client side java script!!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageError = document.querySelector("#message-error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  messageError.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = "";
          messageError.textContent = data.error;
          return;
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      });
    }
  );
});
