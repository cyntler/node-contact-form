var contactFormEl = document.getElementById("contact_form");
var formErrorsCount = 0;

var contactFormElements = {
  name: contactFormEl.elements["name"],
  email: contactFormEl.elements["email"],
  phone: contactFormEl.elements["phone"],
  subject: contactFormEl.elements["subject"],
  message: contactFormEl.elements["message"],
};

var responseMessageEl = document.getElementById("response_message");
var responseMessageTimeout;

var PHONE_REGEX = /^\+(?:[0-9] ?){6,14}[0-9]$/;
var EMAIL_REGEX = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i;

contactFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateForm()) {
    showResponseMessage("The message has been sent!");
    contactFormEl.reset();
  }
});

Object.values(contactFormElements).forEach(function (el) {
  el.addEventListener("change", function () {
    hideFieldError(el);
  });
  el.addEventListener("input", function () {
    hideFieldError(el);
  });
});

function validateForm() {
  hideAllFieldErrors();

  if (!contactFormElements.name.value) {
    showFieldError(contactFormElements.name, "The name cannot be empty.");
  }

  if (!contactFormElements.email.value) {
    showFieldError(contactFormElements.email, "The email cannot be empty.");
  } else if (!EMAIL_REGEX.test(contactFormElements.email.value)) {
    showFieldError(contactFormElements.email, "Please enter a valid e-mail.");
  }

  if (!contactFormElements.phone.value) {
    showFieldError(
      contactFormElements.phone,
      "The phone number cannot be empty."
    );
  } else if (!PHONE_REGEX.test(contactFormElements.phone.value)) {
    showFieldError(
      contactFormElements.phone,
      "Please enter a valid phone number."
    );
  }

  if (!contactFormElements.subject.value) {
    showFieldError(contactFormElements.subject, "You must select a subject.");
  }

  if (!contactFormElements.message.value) {
    showFieldError(contactFormElements.message, "The message cannot be empty.");
  }

  return formErrorsCount === 0;
}

function showFieldError(element, errorMessage) {
  formErrorsCount++;
  if (element) {
    const fieldErrorEl = document.createElement("p");
    fieldErrorEl.className = "field_error";
    fieldErrorEl.textContent = errorMessage;
    element.parentElement.appendChild(fieldErrorEl);
    element.style.borderColor = "red";
  }
}

function hideFieldError(element) {
  element.style.borderColor = "#474544";
  const error = element.parentElement.querySelector(".field_error");
  if (error) {
    error.remove();
  }
}

function hideAllFieldErrors() {
  formErrorsCount = 0;
  Object.values(contactFormElements).forEach(function (el) {
    hideFieldError(el);
  });
}

function showResponseMessage(text, type = "success") {
  const color = type === "success" ? "green" : "red";
  responseMessageEl.parentElement.style.display = "block";
  responseMessageEl.parentElement.style.borderColor = color;
  responseMessageEl.style.color = color;
  responseMessageEl.textContent = text;

  clearTimeout(responseMessageTimeout);
  responseMessageTimeout = setTimeout(() => {
    responseMessageEl.parentElement.style.display = "none";
  }, 5000);
}
