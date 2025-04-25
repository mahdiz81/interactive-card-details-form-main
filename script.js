document.addEventListener('DOMContentLoaded', () => {
  const cardNumberInput = document.getElementById('card-number');
  const cardHolderInput = document.getElementById('cardholder-name');
  const expMonthInput = document.getElementById('exp-month');
  const expYearInput = document.getElementById('exp-year');
  const cvcInput = document.getElementById('cvc');

  const cardNumberDisplay = document.querySelector('.card-number');
  const cardHolderDisplay = document.querySelector('.card-holder');
  const cardExpiryDisplay = document.querySelector('.card-expiry');
  const cardCvcDisplay = document.querySelector('.card-cvc');

  const form = document.getElementById('credit-card-form');
  const thankYouMessage = document.getElementById('thank-you-message');
  const confirmButton = document.getElementById('confirm-button');

  // Ensure modal is hidden on page load to prevent showing on refresh
  thankYouMessage.classList.add('hidden');
  thankYouMessage.style.display = 'none';

  // Initialize card preview with default values
  cardNumberDisplay.textContent = '0000 0000 0000 0000';
  cardHolderDisplay.textContent = 'لطفاً نام را وارد کنید.';
  cardExpiryDisplay.textContent = '00/00';
  cardCvcDisplay.textContent = '000';

  // Format card number input with spaces every 4 digits
  function formatCardNumber(value) {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  // Format cardholder name: capitalize first letter of each part
  function formatCardHolderName(name) {
    if (!name.trim()) {
      return "لطفاً نام را وارد کنید.";
    }
    const parts = name.trim().split(/\s+/);
    const formattedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
    return formattedParts.join(' ');
  }

  // Update card number display on input
  cardNumberInput.addEventListener('input', (e) => {
    const formattedNumber = formatCardNumber(e.target.value);
    e.target.value = formattedNumber;
    cardNumberDisplay.textContent = formattedNumber || '0000 0000 0000 0000';
  });

  // Update cardholder name display on input
  cardHolderInput.addEventListener('input', (e) => {
    const formattedName = formatCardHolderName(e.target.value);
    cardHolderDisplay.textContent = formattedName;
  });

  // Update expiry display on input
  function updateExpiry() {
    const month = expMonthInput.value.padStart(2, '0');
    const year = expYearInput.value.padStart(2, '0');
    if (month === '00' && year === '00') {
      cardExpiryDisplay.textContent = '00/00';
    } else {
      cardExpiryDisplay.textContent = month + '/' + year;
    }
  }

  expMonthInput.addEventListener('input', updateExpiry);
  expYearInput.addEventListener('input', updateExpiry);

  // Update CVC display on input
  cvcInput.addEventListener('input', (e) => {
    const cvc = e.target.value.replace(/\D/g, '').slice(0, 3);
    e.target.value = cvc;
    cardCvcDisplay.textContent = cvc || '000';
  });

  // Validation message helpers
  function showValidationMessage(element, message) {
    element.textContent = message;
    element.style.color = 'red';
    setTimeout(() => {
      element.textContent = '';
    }, 3000);
  }

  // Validation on blur events
  cardHolderInput.addEventListener('blur', () => {
    const labelName = document.querySelector('.LabelName');
    if (cardHolderInput.value.trim()==="") {
      showValidationMessage(labelName, 'Please write your name');
    }
  });

  cardNumberInput.addEventListener('blur', () => {
    const labelNum = document.querySelector('.LabelNum');
    if (cardNumberInput.value.trim()==="") {
      showValidationMessage(labelNum, 'Please write your number');
    }
  });

  expMonthInput.addEventListener('blur', () => {
    const labelExpMonth = document.querySelector('.LabelExpMonth');
    if (expMonthInput.value.trim()==="") {
      showValidationMessage(labelExpMonth, 'Please enter the month');
    }
  });

  expYearInput.addEventListener('blur', () => {
    const labelExpYear = document.querySelector('.LabelExpYear');
    if (expYearInput.value.trim()==="") {
      showValidationMessage(labelExpYear, 'Please enter the year');
    }
  });

  cvcInput.addEventListener('blur', () => {
    const labelCvc = document.querySelector('.LabelCvc');
    if (cvcInput.value.trim()==="") {
      showValidationMessage(labelCvc, 'Please enter the CVC code');
    }
  });

  // Show thank you modal on form submit with validation
  form.addEventListener('submit', (e) => {
   e.preventDefault()

    if (
      cardNumberInput.value.trim() === '' ||
      cardHolderInput.value.trim() === '' ||
      expMonthInput.value.trim() === '' ||
      expYearInput.value.trim() === '' ||
      cvcInput.value.trim() === ''
      
    ) {
      // alert('Please fill out all fields before submitting.');
      return;
    }
    console.log(cardNumberInput.value.trim(), cardHolderInput.value.trim(), expMonthInput.value.trim(), expYearInput.value.trim(), cvcInput.value.trim());

    // Show thank you message
    thankYouMessage.classList.remove('hidden');
    thankYouMessage.style.display = 'block';

    form.reset();

    cardNumberDisplay.textContent = '0000 0000 0000 0000';
    cardHolderDisplay.textContent = 'لطفاً نام را وارد کنید.';
    cardExpiryDisplay.textContent = '00/00';
    cardCvcDisplay.textContent = '000';
  });

  // Hide thank you modal on close icon click and reset form
  const closeThankYouButton = document.getElementById('close-thank-you');

  closeThankYouButton.addEventListener('click', () => {
    thankYouMessage.classList.add('hidden');
    thankYouMessage.style.display = 'none';
    form.reset();
    cardNumberDisplay.textContent = '0000 0000 0000 0000';
    cardHolderDisplay.textContent = 'لطفاً نام را وارد کنید.';
    cardExpiryDisplay.textContent = '00/00';
    cardCvcDisplay.textContent = '000';
  });
});
