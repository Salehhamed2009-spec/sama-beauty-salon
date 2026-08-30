"use strict";

/*
  SAMA BEAUTY
  V3 – Professional & Beautiful Demo
*/


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
  document.getElementById("menuButton");

const mobileNav =
  document.getElementById("mobileNav");


if (menuButton && mobileNav) {

  menuButton.addEventListener("click", function () {

    mobileNav.classList.toggle("open");

  });


  mobileNav
    .querySelectorAll("a")
    .forEach(function (link) {

      link.addEventListener("click", function () {

        mobileNav.classList.remove("open");

      });

    });

}


/* =========================================
   BEFORE / AFTER SLIDER
========================================= */

const comparisonRange =
  document.getElementById("comparisonRange");

const comparisonBefore =
  document.getElementById("comparisonBefore");

const comparisonLine =
  document.getElementById("comparisonLine");

const comparisonHandle =
  document.getElementById("comparisonHandle");

const comparison =
  document.getElementById("comparison");


function updateComparison(value) {

  if (!comparisonBefore) return;

  comparisonBefore.style.width =
    value + "%";

  if (comparisonLine) {

    comparisonLine.style.left =
      value + "%";

  }

  if (comparisonHandle) {

    comparisonHandle.style.left =
      value + "%";

  }

}


if (comparisonRange) {

  comparisonRange.addEventListener(
    "input",
    function () {

      updateComparison(
        this.value
      );

    }
  );

}


// Mouse drag functionality for better UX
if (comparisonHandle && comparison) {

  let isDragging = false;

  comparisonHandle.addEventListener("mousedown", function () {
    isDragging = true;
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging || !comparisonRange || !comparison) return;

    const rect = comparison.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;

    if (percent >= 0 && percent <= 100) {
      comparisonRange.value = percent;
      updateComparison(percent);
    }
  });

  // Touch support for mobile
  comparisonHandle.addEventListener("touchstart", function () {
    isDragging = true;
  });

  document.addEventListener("touchend", function () {
    isDragging = false;
  });

  document.addEventListener("touchmove", function (e) {
    if (!isDragging || !comparisonRange || !comparison) return;

    const touch = e.touches[0];
    const rect = comparison.getBoundingClientRect();
    const percent = ((touch.clientX - rect.left) / rect.width) * 100;

    if (percent >= 0 && percent <= 100) {
      comparisonRange.value = percent;
      updateComparison(percent);
    }
  });

}


/* =========================================
   GALLERY
========================================= */

const galleryItems =
  Array.from(
    document.querySelectorAll(
      ".gallery-item"
    )
  );

const galleryModal =
  document.getElementById(
    "galleryModal"
  );

const modalClose =
  document.getElementById(
    "modalClose"
  );

const modalNext =
  document.getElementById(
    "modalNext"
  );

const modalTitle =
  document.getElementById(
    "modalTitle"
  );

const modalPreview =
  document.getElementById(
    "modalPreview"
  );


let galleryIndex = 0;


function openGallery(index) {

  if (!galleryModal) return;

  galleryIndex = index;

  updateGallery();

  galleryModal.classList.add("open");

  galleryModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function updateGallery() {

  if (
    !galleryItems.length ||
    !modalTitle ||
    !modalPreview
  ) {

    return;

  }

  const title =
    galleryItems[
      galleryIndex
    ].dataset.image;

  modalTitle.textContent =
    title;

  modalPreview.textContent =
    title;

}


function closeGallery() {

  if (!galleryModal) return;

  galleryModal.classList.remove(
    "open"
  );

  galleryModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


galleryItems.forEach(
  function (item, index) {

    item.addEventListener(
      "click",
      function () {

        openGallery(index);

      }
    );

  }
);


if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeGallery
  );

}


if (modalNext) {

  modalNext.addEventListener(
    "click",
    function () {

      if (!galleryItems.length) {
        return;
      }

      galleryIndex++;

      if (
        galleryIndex >=
        galleryItems.length
      ) {

        galleryIndex = 0;

      }

      updateGallery();

    }
  );

}


if (galleryModal) {

  galleryModal.addEventListener(
    "click",
    function (event) {

      if (
        event.target ===
        galleryModal
      ) {

        closeGallery();

      }

    }
  );

}


document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape"
    ) {

      closeGallery();

    }

  }
);


/* =========================================
   BOOKING SYSTEM
========================================= */

const booking = {

  service: "",

  employee: "",

  date: "",

  time: "",

  name: "",

  email: "",

  phone: ""

};


const steps = {

  1: document.getElementById("step1"),

  2: document.getElementById("step2"),

  3: document.getElementById("step3"),

  4: document.getElementById("step4")

};


const success =
  document.getElementById(
    "bookingSuccess"
  );


const progressSteps =
  Array.from(
    document.querySelectorAll(
      ".progress-step"
    )
  );


function showStep(number) {

  Object.values(steps)
    .forEach(function (step) {

      if (step) {

        step.classList.add(
          "hidden"
        );

      }

    });


  if (success) {

    success.classList.add(
      "hidden"
    );

  }


  if (steps[number]) {

    steps[number].classList.remove(
      "hidden"
    );

  }


  progressSteps.forEach(
    function (step, index) {

      step.classList.toggle(
        "active",
        index === number - 1
      );

    }
  );

}


/* =========================================
   SERVICE SELECTION
========================================= */

const serviceOptions =
  Array.from(
    document.querySelectorAll(
      "#serviceOptions .option"
    )
  );

const toStep2 =
  document.getElementById(
    "toStep2"
  );


function chooseService(name) {

  booking.service = name;


  serviceOptions.forEach(
    function (option) {

      option.classList.toggle(
        "selected",
        option.dataset.service === name
      );

    }
  );


  if (toStep2) {

    toStep2.disabled = false;

  }

  showStep(1);

}


serviceOptions.forEach(
  function (option) {

    option.addEventListener(
      "click",
      function () {

        chooseService(
          option.dataset.service
        );

      }
    );

  }
);


/* Buttons on service cards */

document
  .querySelectorAll(".service-book")
  .forEach(function (button) {

    button.addEventListener(
      "click",
      function (e) {

        e.preventDefault();
        e.stopPropagation();

        chooseService(
          button.dataset.service
        );

        const bookingSection =
          document.getElementById(
            "booking"
          );

        if (bookingSection) {

          setTimeout(function () {
            bookingSection.scrollIntoView({
              behavior: "smooth"
            });
          }, 100);

        }

        showStep(1);

      }
    );

  });


if (toStep2) {

  toStep2.addEventListener(
    "click",
    function () {

      if (!booking.service) return;

      showStep(2);

    }
  );

}


/* =========================================
   EMPLOYEE
========================================= */

const employeeOptions =
  Array.from(
    document.querySelectorAll(
      ".employee"
    )
  );

const toStep3 =
  document.getElementById(
    "toStep3"
  );


employeeOptions.forEach(
  function (employee) {

    employee.addEventListener(
      "click",
      function () {

        booking.employee =
          employee.dataset.employee;


        employeeOptions.forEach(
          function (item) {

            item.classList.toggle(
              "selected",
              item === employee
            );

          }
        );


        if (toStep3) {

          toStep3.disabled =
            false;

        }

      }
    );

  }
);


if (toStep3) {

  toStep3.addEventListener(
    "click",
    function () {

      if (!booking.employee) {
        return;
      }

      showStep(3);

    }
  );

}


/* =========================================
   DATE
========================================= */

const bookingDate =
  document.getElementById(
    "bookingDate"
  );


function dateToInput(date) {

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return (
    year +
    "-" +
    month +
    "-" +
    day
  );

}


const today =
  new Date();


const minDate =
  new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );


const maxDate =
  new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate()
  );


if (bookingDate) {

  bookingDate.min =
    dateToInput(minDate);

  bookingDate.max =
    dateToInput(maxDate);

}


/* =========================================
   TIME
========================================= */

const timeList =
  document.getElementById(
    "timeList"
  );

const toStep4 =
  document.getElementById(
    "toStep4"
  );

const dateSummary =
  document.getElementById(
    "dateSummary"
  );


const availableTimes = [

  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30"

];


function renderTimes() {

  if (!timeList) return;

  timeList.innerHTML = "";

  booking.time = "";

  if (toStep4) {

    toStep4.disabled =
      true;

  }


  availableTimes.forEach(
    function (time) {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";

      button.textContent =
        time + " Uhr";

      button.className = "time-button";


      button.addEventListener(
        "click",
        function () {

          booking.time =
            time;


          timeList
            .querySelectorAll("button")
            .forEach(
              function (item) {

                item.classList.remove(
                  "selected"
                );

              }
            );


          button.classList.add(
            "selected"
          );


          updateDateSummary();


          if (toStep4) {

            toStep4.disabled =
              false;

          }

        }
      );


      timeList.appendChild(
        button
      );

    }
  );

}


function formatDateGerman(value) {

  if (!value) return "";

  const date =
    new Date(
      value + "T12:00:00"
    );

  return date.toLocaleDateString(
    "de-DE",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );

}


function updateDateSummary() {

  if (!dateSummary) return;

  if (
    !booking.date ||
    !booking.time
  ) {

    dateSummary.textContent =
      "";

    return;

  }


  dateSummary.textContent =

    booking.service +
    "\n" +
    booking.employee +
    "\n" +
    formatDateGerman(
      booking.date
    ) +
    "\n" +
    booking.time +
    " Uhr";

}


if (bookingDate) {

  bookingDate.addEventListener(
    "change",
    function () {

      booking.date =
        bookingDate.value;

      renderTimes();

      updateDateSummary();

    }
  );

}


if (toStep4) {

  toStep4.addEventListener(
    "click",
    function () {

      if (
        !booking.date ||
        !booking.time
      ) {

        return;

      }

      updateFinalSummary();

      showStep(4);

    }
  );

}


/* =========================================
   SUMMARY
========================================= */

const finalSummary =
  document.getElementById(
    "finalSummary"
  );


function getBookingSummary() {

  return (

    "Behandlung: " +
    booking.service +
    "\n" +

    "Mitarbeiterin: " +
    booking.employee +
    "\n" +

    "Datum: " +
    formatDateGerman(
      booking.date
    ) +
    "\n" +

    "Uhrzeit: " +
    booking.time +
    " Uhr"

  );

}


function updateFinalSummary() {

  if (!finalSummary) return;

  finalSummary.textContent =
    getBookingSummary();

}


/* =========================================
   BACK BUTTONS
========================================= */

document
  .querySelectorAll("[data-back]")
  .forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        showStep(
          Number(
            button.dataset.back
          )
        );

      }
    );

  });


/* =========================================
   CUSTOMER DATA
========================================= */

const customerName =
  document.getElementById(
    "customerName"
  );

const customerEmail =
  document.getElementById(
    "customerEmail"
  );

const customerPhone =
  document.getElementById(
    "customerPhone"
  );

const consent =
  document.getElementById(
    "consent"
  );

const submitBooking =
  document.getElementById(
    "submitBooking"
  );


function validEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);

}


if (submitBooking) {

  submitBooking.addEventListener(
    "click",
    function () {

      const name =
        customerName
          ? customerName.value.trim()
          : "";

      const email =
        customerEmail
          ? customerEmail.value.trim()
          : "";

      const phone =
        customerPhone
          ? customerPhone.value.trim()
          : "";


      if (!name) {

        alert(
          "Bitte gib deinen Namen ein."
        );

        return;

      }


      if (!validEmail(email)) {

        alert(
          "Bitte gib eine gültige E-Mail-Adresse ein."
        );

        return;

      }


      if (!phone) {

        alert(
          "Bitte gib deine Telefonnummer ein."
        );

        return;

      }


      if (
        consent &&
        !consent.checked
      ) {

        alert(
          "Bitte bestätige die Zustimmung."
        );

        return;

      }


      booking.name =
        name;

      booking.email =
        email;

      booking.phone =
        phone;


      /*
        DEMO-SPEICHERUNG

        Die Daten werden lokal im Browser
        gespeichert.

        Für die echte Website ersetzen wir
        diesen Teil später durch das Backend.
      */

      try {

        localStorage.setItem(
          "samaBeautyBooking",
          JSON.stringify(
            booking
          )
        );

      } catch (error) {

        console.log(
          "Lokale Speicherung nicht möglich."
        );

      }


      const successSummary =
        document.getElementById(
          "successSummary"
        );


      if (successSummary) {

        successSummary.textContent =

          getBookingSummary() +

          "\n\nName: " +
          booking.name +

          "\nE-Mail: " +
          booking.email +

          "\nTelefon: " +
          booking.phone;

      }


      Object.values(steps)
        .forEach(
          function (step) {

            if (step) {

              step.classList.add(
                "hidden"
              );

            }

          }
        );


      if (success) {

        success.classList.remove(
          "hidden"
        );

      }


      progressSteps.forEach(
        function (step) {

          step.classList.remove(
            "active"
          );

        }
      );

    }
  );

}


/* =========================================
   NEW BOOKING
========================================= */

const newBooking =
  document.getElementById(
    "newBooking"
  );


if (newBooking) {

  newBooking.addEventListener(
    "click",
    function () {

      location.reload();

    }
  );

}


/* =========================================
   INITIALIZATION
========================================= */

updateComparison(50);

renderTimes();

showStep(1);

console.log(
  "Sama Beauty V3 wurde erfolgreich geladen."
);