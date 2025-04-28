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
  cardHolderDisplay.textContent = 'Name&LastName';
  cardExpiryDisplay.textContent = '00/00';
  cardCvcDisplay.textContent = '000';

  // Format card number input with spaces every 4 digits
  function formatCardNumber(value) {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  // Format cardholder name: capitalize first letter of each part
  function formatCardHolderName(name) {
    if (!name.trim()) {
      return "Name&LastName";
    }
    const parts = name.trim().split(/\s+/);
    const formattedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
    return formattedParts.join(' ');
  }

    // Validation message helpers
    function showValidationMessage(element, message) {
      element.textContent = message;
      element.style.color = 'red';
      setTimeout(() => {
        element.textContent = '';
      }, 5000);
    }
  // Update card number display on input

  function formatCardNumber(value) {
    // تابع فرمت شماره کارت (به عنوان مثال)
    return value.replace(/D/g, '').replace(/(.{4})/g, '$1 ').trim(); // فرمت بندی به صورت 4 کاراکتر
}

cardNumberInput.addEventListener('input', (event) => {
    const input = event.target;
    const oldValue = input.value;
    const oldCursorPos = input.selectionStart;

    // Remove all non-digit characters
    let digits = oldValue.replace(/\D/g, '');
    if (digits.length > 16) {
      digits = digits.slice(0, 16);
    }

    // Format digits with spaces every 4 characters
    let formattedNumber = '';
    for (let i = 0; i < digits.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedNumber += ' ';
      }
      formattedNumber += digits[i];
    }

    // Calculate new cursor position
    let cursorPosition = oldCursorPos;
    const countSpacesBeforeCursor = (oldValue.slice(0, oldCursorPos).match(/ /g) || []).length;
    const countDigitsBeforeCursor = oldCursorPos - countSpacesBeforeCursor;
    cursorPosition = countDigitsBeforeCursor + Math.floor(countDigitsBeforeCursor / 4);

    input.value = formattedNumber;
    cardNumberDisplay.textContent = formattedNumber || '0000 0000 0000 0000';

    // Set cursor position
    input.setSelectionRange(cursorPosition, cursorPosition);

    const labelNum = document.querySelector('.LabelNum');

    if (digits.length < 16) {
        showValidationMessage(labelNum, "You must enter 16 characters");
    } else {
        showValidationMessage(labelNum, 'Card number entry completed successfully!');
labelNum.style.color='green'
labelNum.style.fontWeight='bold'
    }
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



  // Validation on blur events
  cardHolderInput.addEventListener('blur', () => {
    const labelName = document.querySelector('.LabelName');
    if (cardHolderInput.value.trim()==="") {
      showValidationMessage(labelName, 'Please write your name');
    }
  });
  
  

console.log(cardNumberInput)
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

   
    console.log(cardNumberInput.value.trim(), cardHolderInput.value.trim(), expMonthInput.value.trim(), expYearInput.value.trim(), cvcInput.value.trim());

    // Show thank you message
    thankYouMessage.classList.remove('hidden');
    thankYouMessage.style.display = 'block';

    form.reset();

    cardNumberDisplay.textContent = '0000 0000 0000 0000';
    cardHolderDisplay.textContent = 'your Name...';
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
    cardHolderDisplay.textContent = 'your Name...';
    cardExpiryDisplay.textContent = '00/00';
    cardCvcDisplay.textContent = '000';
  });
});
