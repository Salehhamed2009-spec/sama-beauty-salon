/* =========================
   SAMA BEAUTY
   INTERACTIVE WEBSITE
========================= */


/* MOBILE MENU */

const mobileMenuButton =
  document.getElementById("mobileMenuButton");

const mobileMenu =
  document.getElementById("mobileMenu");

mobileMenuButton.addEventListener("click", () => {

  mobileMenu.classList.toggle("open");

});


document.querySelectorAll(".mobile-menu a")
.forEach(link => {

  link.addEventListener("click", () => {

    mobileMenu.classList.remove("open");

  });

});



/* =========================
   BEFORE / AFTER SLIDER
========================= */

const comparisonSlider =
  document.getElementById("comparisonSlider");

const beforeImage =
  document.querySelector(".before-image");

const comparisonLine =
  document.querySelector(".comparison-line");

const comparisonHandle =
  document.querySelector(".comparison-handle");


function updateComparison(value) {

  beforeImage.style.width = `${value}%`;

  comparisonLine.style.left = `${value}%`;

  comparisonHandle.style.left = `${value}%`;

}


comparisonSlider.addEventListener("input", event => {

  updateComparison(event.target.value);

});



/* =========================
   GALLERY
========================= */

const galleryItems =
  document.querySelectorAll(".gallery-item");

const galleryModal =
  document.getElementById("galleryModal");

const modalImage =
  document.getElementById("modalImage");

const modalClose =
  document.getElementById("modalClose");

const modalPrev =
  document.getElementById("modalPrev");

const modalNext =
  document.getElementById("modalNext");


let galleryImages = [];

galleryItems.forEach(item => {

  const image =
    item.querySelector("img");

  galleryImages.push(image.src);

});


let currentGalleryIndex = 0;


function openGallery(index) {

  currentGalleryIndex = index;

  modalImage.src =
    galleryImages[currentGalleryIndex];

  galleryModal.classList.add("open");

  document.body.style.overflow = "hidden";

}


function closeGallery() {

  galleryModal.classList.remove("open");

  document.body.style.overflow = "";

}


galleryItems.forEach((item, index) => {

  item.addEventListener("click", () => {

    openGallery(index);

  });

});


modalClose.addEventListener("click", closeGallery);


galleryModal.addEventListener("click", event => {

  if (event.target === galleryModal) {

    closeGallery();

  }

});


modalPrev.addEventListener("click", event => {

  event.stopPropagation();

  currentGalleryIndex--;

  if (currentGalleryIndex < 0) {

    currentGalleryIndex =
      galleryImages.length - 1;

  }

  modalImage.src =
    galleryImages[currentGalleryIndex];

});


modalNext.addEventListener("click", event => {

  event.stopPropagation();

  currentGalleryIndex++;

  if (
    currentGalleryIndex >=
    galleryImages.length
  ) {

    currentGalleryIndex = 0;

  }

  modalImage.src =
    galleryImages[currentGalleryIndex];

});


document.addEventListener("keydown", event => {

  if (!galleryModal.classList.contains("open")) {
    return;
  }

  if (event.key === "Escape") {

    closeGallery();

  }

  if (event.key === "ArrowLeft") {

    modalPrev.click();

  }

  if (event.key === "ArrowRight") {

    modalNext.click();

  }

});



/* =========================
   BOOKING SYSTEM
========================= */

const bookingState = {

  service: null,

  date: null,

  time: null

};



/* SERVICE CARDS */

document.querySelectorAll(".service-book")
.forEach(button => {

  button.addEventListener("click", () => {

    const service =
      button.dataset.service;

    const matchingOption =
      [...document.querySelectorAll(".booking-option")]
      .find(option =>
        option.dataset.name === service
      );

    if (matchingOption) {

      selectBookingService(
        matchingOption
      );

    }

    document
      .getElementById("booking")
      .scrollIntoView({
        behavior: "smooth"
      });

  });

});



/* BOOKING OPTIONS */

const bookingOptions =
  document.querySelectorAll(".booking-option");

const bookingNext1 =
  document.getElementById("bookingNext1");


function selectBookingService(option) {

  bookingOptions.forEach(item => {

    item.classList.remove("selected");

  });

  option.classList.add("selected");

  bookingState.service = {

    name: option.dataset.name,

    price: option.dataset.price,

    duration: option.dataset.duration

  };

  bookingNext1.disabled = false;

}


bookingOptions.forEach(option => {

  option.addEventListener("click", () => {

    selectBookingService(option);

  });

});



/* BOOKING STEPS */

const step1 =
  document.getElementById("bookingStep1");

const step2 =
  document.getElementById("bookingStep2");

const step3 =
  document.getElementById("bookingStep3");

const success =
  document.getElementById("bookingSuccess");

const progressSteps =
  document.querySelectorAll(".progress-step");


function showStep(number) {

  step1.classList.add("hidden");
  step2.classList.add("hidden");
  step3.classList.add("hidden");
  success.classList.add("hidden");


  if (number === 1) {

    step1.classList.remove("hidden");

  }

  if (number === 2) {

    step2.classList.remove("hidden");

  }

  if (number === 3) {

    step3.classList.remove("hidden");

  }

  if (number === 4) {

    success.classList.remove("hidden");

  }


  progressSteps.forEach((step, index) => {

    step.classList.toggle(
      "active",
      index < number
    );

  });

}



/* DATE */

const bookingDate =
  document.getElementById("bookingDate");

const today =
  new Date();


const year =
  today.getFullYear();

const month =
  String(today.getMonth() + 1)
  .padStart(2, "0");

const day =
  String(today.getDate())
  .padStart(2, "0");


bookingDate.min =
  `${year}-${month}-${day}`;



/* TIMES */

const timeGrid =
  document.getElementById("timeGrid");

const bookingNext2 =
  document.getElementById("bookingNext2");


const availableTimes = [

  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:30",
  "13:00",
  "14:00",
  "14:30",
  "15:00",
  "16:00",
  "17:00",
  "17:30"

];


function createTimes() {

  timeGrid.innerHTML = "";

  bookingState.time = null;

  bookingNext2.disabled = true;


  availableTimes.forEach(time => {

    const button =
      document.createElement("button");

    button.type = "button";

    button.textContent = time;


    button.addEventListener("click", () => {

      document
        .querySelectorAll("#timeGrid button")
        .forEach(item =>
          item.classList.remove("selected")
        );


      button.classList.add("selected");

      bookingState.time = time;

      bookingNext2.disabled = false;

    });


    timeGrid.appendChild(button);

  });

}


bookingDate.addEventListener("change", () => {

  bookingState.date =
    bookingDate.value;

  createTimes();

});



/* NEXT STEP */

bookingNext1.addEventListener("click", () => {

  if (!bookingState.service) {
    return;
  }

  showStep(2);

});


bookingNext2.addEventListener("click", () => {

  if (
    !bookingState.date ||
    !bookingState.time
  ) {

    return;

  }


  updateSummary();

  showStep(3);

});



/* BACK BUTTONS */

document.querySelectorAll(".back-button")
.forEach(button => {

  button.addEventListener("click", () => {

    const target =
      Number(button.dataset.back);

    showStep(target);

  });

});



/* SUMMARY */

const bookingSummary =
  document.getElementById("bookingSummary");


function formatDate(date) {

  return new Date(
    date + "T12:00:00"
  ).toLocaleDateString(
    "de-DE",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );

}


function updateSummary() {

  bookingSummary.textContent =

    `${bookingState.service.name}
${bookingState.service.price} € · ${bookingState.service.duration} Min.

${formatDate(bookingState.date)}
${bookingState.time} Uhr`;

}



/* CONFIRM */

const confirmBooking =
  document.getElementById("confirmBooking");


const customerName =
  document.getElementById("customerName");


const customerPhone =
  document.getElementById("customerPhone");


confirmBooking.addEventListener("click", () => {

  const name =
    customerName.value.trim();

  const phone =
    customerPhone.value.trim();


  if (!name || !phone) {

    alert(
      "Bitte Name und Telefonnummer eingeben."
    );

    return;

  }


  const booking = {

    service: bookingState.service,

    date: bookingState.date,

    time: bookingState.time,

    name: name,

    phone: phone,

    created:
      new Date().toISOString()

  };


  /*
    DEMO:
    Der Termin wird nur im Browser gespeichert.
  */

  localStorage.setItem(
    "samaBeautyDemoBooking",
    JSON.stringify(booking)
  );


  document.getElementById(
    "successCustomer"
  ).textContent =
    name.split(" ")[0];


  document.getElementById(
    "successSummary"
  ).textContent =

    `${bookingState.service.name}
${bookingState.service.price} € · ${bookingState.service.duration} Min.

${formatDate(bookingState.date)}
${bookingState.time} Uhr

Telefon: ${phone}`;


  showStep(4);

});



/* NEW BOOKING */

document
  .getElementById("newBooking")
  .addEventListener("click", () => {


    bookingState.service = null;

    bookingState.date = null;

    bookingState.time = null;


    bookingOptions.forEach(option => {

      option.classList.remove("selected");

    });


    bookingNext1.disabled = true;

    bookingNext2.disabled = true;


    bookingDate.value = "";

    customerName.value = "";

    customerPhone.value = "";


    timeGrid.innerHTML = "";


    showStep(1);

  });



/* =========================
   SMOOTH INTERACTION
========================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener("click", event => {

      const target =
        document.querySelector(
          link.getAttribute("href")
        );


      if (!target) {
        return;
      }


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth"
      });

    });

  });