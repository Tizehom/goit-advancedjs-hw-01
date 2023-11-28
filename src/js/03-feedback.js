import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

savedTextarea();

feedbackForm.addEventListener('input', throttle(saveFormData, 500));

feedbackForm.addEventListener('submit', onFormSubmit);

function saveFormData() {
  const formData = {
    email: feedbackForm.elements.email.value,
    message: feedbackForm.elements.message.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function savedTextarea() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const formData = JSON.parse(savedData);
    feedbackForm.elements.email.value = formData.email;
    feedbackForm.elements.message.value = formData.message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  const email = feedbackForm.elements.email.value;
  const message = feedbackForm.elements.message.value;

  console.log({ email, message });

  localStorage.removeItem(STORAGE_KEY);
  feedbackForm.reset();
}
