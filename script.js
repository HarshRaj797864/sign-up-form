const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('number');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('cpassword');

const firstNameErrorContainer = document.getElementById('first-name-error');
const lastNameErrorContainer = document.getElementById('last-name-error');
const emailErrorContainer = document.getElementById('email-error');
const phoneErrorContainer = document.getElementById('number-error');
const passwordErrorContainer = document.getElementById('password-error');
const confirmPasswordErrorContainer = document.getElementById('cpassword-error');

const passwordChecks = [
  { regex: /[a-z]/, message: "Must contain at least one lowercase letter." },
  { regex: /[A-Z]/, message: "Must contain at least one uppercase letter." },
  { regex: /\d/, message: "Must contain at least one number." },
  { regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, message: "Must contain at least one special character." },
  { regex: /.{8,}/, message: "Must be at least 8 characters long." }
];

function validateRequiredTextField(inputElement, errorContainer) {
    let errors = [];
    const value = inputElement.value.trim();
    const interacted = inputElement.classList.contains('interacted');

    if (inputElement.hasAttribute('required') && !value && interacted) {
        const fieldName = inputElement.labels[0]?.textContent || 'This field';
        errors.push(`${fieldName} is required.`);
    }

    displayErrors(errors, errorContainer, inputElement);
}

function validateEmail() {
  let errors = [];
  const email = emailInput.value;
  const interacted = emailInput.classList.contains('interacted');

  if (interacted) {
    if (emailInput.validity.valueMissing && !email) {
        errors.push("Email is required.");
    } else if (emailInput.validity.typeMismatch && email) {
        errors.push("Please enter a valid email address.");
    }
  }

  displayErrors(errors, emailErrorContainer, emailInput);
}

function validatePhoneNumber() {
    let errors = [];
    const phone = phoneInput.value;
    const interacted = phoneInput.classList.contains('interacted');

    if (interacted) {
        if (phoneInput.validity.valueMissing && !phone) {
            errors.push("Phone Number is required.");
        } else if (phoneInput.validity.patternMismatch && phone) {
            errors.push(phoneInput.title || "Please enter a valid 10-digit phone number.");
        }
    }

    displayErrors(errors, phoneErrorContainer, phoneInput);
}

function validatePrimaryPassword() {
  const password = passwordInput.value;
  let errors = [];
  const interacted = passwordInput.classList.contains('interacted');

  if (interacted) {
    if (passwordInput.hasAttribute('required') && !password) {
        errors.push("Password is required.");
    } else if (password) {
        passwordChecks.forEach(check => {
            if (!check.regex.test(password)) {
                errors.push(check.message);
            }
        });
    }
  }

  displayErrors(errors, passwordErrorContainer, passwordInput);
  if (confirmPasswordInput.classList.contains('interacted')) {
      validateConfirmPassword();
  }
}

function validateConfirmPassword() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  let errors = [];
  const interacted = confirmPasswordInput.classList.contains('interacted');

  if (interacted) {
      if (confirmPasswordInput.hasAttribute('required') && !confirmPassword) {
          errors.push("Confirm Password is required.");
      } else if (confirmPassword && password !== confirmPassword) {
        errors.push("Passwords do not match.");
      }
  }

  displayErrors(errors, confirmPasswordErrorContainer, confirmPasswordInput);
}

function displayErrors(errors, container, inputElement) {
  if (errors.length > 0) {
    container.innerHTML = errors.join('<br>');
    inputElement.setAttribute('aria-invalid', 'true');
    container.classList.add('visible');
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
  } else {
    container.innerHTML = '';
    inputElement.removeAttribute('aria-invalid');
    container.classList.remove('visible');
    inputElement.classList.remove('is-invalid');
    if (inputElement.value && inputElement.classList.contains('interacted')) {
       inputElement.classList.add('is-valid');
    } else {
       inputElement.classList.remove('is-valid');
    }
  }
}

function markAsInteracted(event) {
    if (!event.target.classList.contains('interacted')) {
        event.target.classList.add('interacted');
    }
}

firstNameInput.addEventListener('input', () => validateRequiredTextField(firstNameInput, firstNameErrorContainer));
lastNameInput.addEventListener('input', () => validateRequiredTextField(lastNameInput, lastNameErrorContainer));
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhoneNumber);
passwordInput.addEventListener('input', validatePrimaryPassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

const allInputs = [firstNameInput, lastNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput];
allInputs.forEach(input => {
    input.addEventListener('blur', (event) => {
        markAsInteracted(event);
        switch(event.target.id) {
            case 'first-name': validateRequiredTextField(firstNameInput, firstNameErrorContainer); break;
            case 'last-name': validateRequiredTextField(lastNameInput, lastNameErrorContainer); break;
            case 'email': validateEmail(); break;
            case 'number': validatePhoneNumber(); break;
            case 'password': validatePrimaryPassword(); break;
            case 'cpassword': validateConfirmPassword(); break;
        }
    });
});
