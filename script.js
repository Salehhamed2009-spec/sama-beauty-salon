/* ==============================
   SAMA BEAUTY V2
   ============================== */


/* MOBILE MENU */

const mobileButton =
  document.getElementById("mobileButton");

const mobileMenu =
  document.getElementById("mobileMenu");


mobileButton.addEventListener("click", () => {

  mobileMenu.classList.toggle("open");

});


document
  .querySelectorAll(".mobile-menu a")
  .forEach(link => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("open");

    });

  });



/* ==============================
   BEFORE / AFTER
   ============================== */

const beforeAfterSlider =
  document.getElementById(
    "beforeAfterSlider"
  );

const before =
  document.querySelector(
    ".before"
  );

const sliderLine =
  document.querySelector(
    ".slider-line"
  );

const sliderButton =
  document.querySelector(
    ".slider-button"
  );


function updateBeforeAfter(value) {

  before.style.width =
    `${value}%`;

  sliderLine.style.left =
    `${value}%`;

  sliderButton.style.left =
    `${value}%`;

}


beforeAfterSlider.addEventListener(
  "input",
  event => {

    updateBeforeAfter(
      event.target.value
    );

  }
);



/* ==============================
   GALLERY
   ============================== */

const galleryImages =
  [...document.querySelectorAll(
    ".gallery-image img"
  )];

const galleryModal =
  document.getElementById(
    "galleryModal"
  );

const galleryModalImage =
  document.getElementById(
    "galleryModalImage"
  );

let galleryIndex = 0;


function openGallery(index) {

  galleryIndex = index;

  galleryModalImage.src =
    galleryImages[index].src;

  galleryModal.classList.add(
    "open"
  );

  document.body.style.overflow =
    "hidden";

}


function closeGallery() {

  galleryModal.classList.remove(
    "open"
  );

  document.body.style.overflow =
    "";

}


galleryImages.forEach(
  (image, index) => {

    image.parentElement
      .addEventListener(
        "click",
        () => {

          openGallery(index);

        }
      );

  }
);


document
  .getElementById("galleryClose")
  .addEventListener(
    "click",
    closeGallery
  );


document
  .getElementById("galleryPrev")
  .addEventListener(
    "click",
    event => {

      event.stopPropagation();

      galleryIndex--;

      if (galleryIndex < 0) {

        galleryIndex =
          galleryImages.length - 1;

      }

      galleryModalImage.src =
        galleryImages[
          galleryIndex
        ].src;

    }
  );


document
  .getElementById("galleryNext")
  .addEventListener(
    "click",
    event => {

      event.stopPropagation();

      galleryIndex++;

      if (
        galleryIndex >=
        galleryImages.length
      ) {

        galleryIndex = 0;

      }

      galleryModalImage.src =
        galleryImages[
          galleryIndex
        ].src;

    }
  );


galleryModal.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      galleryModal
    ) {

      closeGallery();

    }

  }
);



/* ==============================
   BOOKING STATE
   ============================== */

const booking = {

  service: null,

  employee: null,

  date: null,

  time: null

};



/* ==============================
   SERVICE SELECTION
   ============================== */

const serviceOptions =
  document.querySelectorAll(
    "#serviceOptions button"
  );

const nextService =
  document.getElementById(
    "nextService"
  );


function selectService(option) {

  serviceOptions.forEach(
    item => {

      item.classList.remove(
        "selected"
      );

    }
  );


  option.classList.add(
    "selected"
  );


  booking.service = {

    name: option.dataset.name,

    duration:
      Number(
        option.dataset.duration
      )

  };


  nextService.disabled = false;

}


serviceOptions.forEach(option => {

  option.addEventListener(
    "click",
    () => {

      selectService(option);

    }
  );

});



/* SERVICE BUTTONS ON PAGE */

document
  .querySelectorAll(".service-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const name =
          button.dataset.service;


        const option =
          [...serviceOptions]
            .find(
              item =>
                item.dataset.name ===
                name
            );


        if (option) {

          selectService(option);

        }


        document
          .getElementById("booking")
          .scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  });



/* ==============================
   BOOKING STEPS
   ============================== */

const steps = {

  1:
    document.getElementById(
      "step1"
    ),

  2:
    document.getElementById(
      "step2"
    ),

  3:
    document.getElementById(
      "step3"
    ),

  4:
    document.getElementById(
      "step4"
    )

};


const success =
  document.getElementById(
    "bookingSuccess"
  );


const progress =
  document.querySelectorAll(
    ".progress span"
  );


function showBookingStep(number) {

  Object.values(steps)
    .forEach(step => {

      step.classList.add(
        "hidden"
      );

    });


  success.classList.add(
    "hidden"
  );


  if (steps[number]) {

    steps[number]
      .classList.remove(
        "hidden"
      );

  }


  progress.forEach(
    (item, index) => {

      item.classList.toggle(
        "active",
        index < number
      );

    }
  );

}


nextService.addEventListener(
  "click",
  () => {

    if (!booking.service) {
      return;
    }

    showBookingStep(2);

  }
);



/* ==============================
   EMPLOYEE
   ============================== */

const employeeOptions =
  document.querySelectorAll(
    ".employee"
  );

const nextEmployee =
  document.getElementById(
    "nextEmployee"
  );


employeeOptions.forEach(
  employee => {

    employee.addEventListener(
      "click",
      () => {

        employeeOptions.forEach(
          item =>
            item.classList.remove(
              "selected"
            )
        );


        employee.classList.add(
          "selected"
        );


        booking.employee =
          employee.dataset.employee;


        nextEmployee.disabled =
          false;

      }
    );

  }
);


nextEmployee.addEventListener(
  "click",
  () => {

    if (!booking.employee) {
      return;
    }

    showBookingStep(3);

  }
);



/* ==============================
   DATE
   ============================== */

const bookingDate =
  document.getElementById(
    "bookingDate"
  );


const now =
  new Date();


const minimumDate =
  new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );


const maximumDate =
  new Date(
    now.getFullYear(),
    now.getMonth() + 2,
    now.getDate()
  );


function formatInputDate(date) {

  const y =
    date.getFullYear();

  const m =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const d =
    String(
      date.getDate()
    ).padStart(2, "0");

  return `${y}-${m}-${d}`;

}


bookingDate.min =
  formatInputDate(
    minimumDate
  );


bookingDate.max =
  formatInputDate(
    maximumDate
  );



/* ==============================
   TIME
   ============================== */

const times =
  document.getElementById(
    "times"
  );

const nextTime =
  document.getElementById(
    "nextTime"
  );


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
  "16:30",

  "17:00",
  "17:30"

];


function createTimes() {

  times.innerHTML = "";

  booking.time = null;

  nextTime.disabled = true;


  availableTimes.forEach(
    time => {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.textContent =
        time;


      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              "#times button"
            )
            .forEach(
              item =>
                item.classList.remove(
                  "selected"
                )
            );


          button.classList.add(
            "selected"
          );


          booking.time =
            time;


          nextTime.disabled =
            false;


          updateBookingFinal();

        }
      );


      times.appendChild(
        button
      );

    }
  );

}


bookingDate.addEventListener(
  "change",
  () => {

    booking.date =
      bookingDate.value;

    createTimes();

    updateBookingFinal();

  }
);



/* ==============================
   SUMMARY
   ============================== */

const bookingFinal =
  document.getElementById(
    "bookingFinal"
  );


const customerSummary =
  document.getElementById(
    "customerSummary"
  );


function formatDate(date) {

  return new Date(
    `${date}T12:00:00`
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


function getSummary() {

  if (
    !booking.service ||
    !booking.employee ||
    !booking.date ||
    !booking.time
  ) {

    return "";

  }


  return (

    `${booking.service.name}

Mitarbeiterin:
${booking.employee}

${formatDate(booking.date)}
${booking.time} Uhr`

  );

}


function updateBookingFinal() {

  bookingFinal.textContent =
    getSummary();

}


nextTime.addEventListener(
  "click",
  () => {

    if (
      !booking.date ||
      !booking.time
    ) {

      return;

    }


    customerSummary.textContent =
      getSummary();


    showBookingStep(4);

  }
);



/* ==============================
   BACK BUTTONS
   ============================== */

document
  .querySelectorAll(".back")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showBookingStep(
          Number(
            button.dataset.step
          )
        );

      }
    );

  });



/* ==============================
   CONFIRM BOOKING
   ============================== */

const confirmBooking =
  document.getElementById(
    "confirmBooking"
  );


confirmBooking.addEventListener(
  "click",
  () => {

    const name =
      document
        .getElementById(
          "customerName"
        )
        .value
        .trim();


    const email =
      document
        .getElementById(
          "customerEmail"
        )
        .value
        .trim();


    const phone =
      document
        .getElementById(
          "customerPhone"
        )
        .value
        .trim();


    const consent =
      document
        .getElementById(
          "bookingConsent"
        )
        .checked;


    if (
      !name ||
      !email ||
      !phone
    ) {

      alert(
        "Bitte fülle alle Kontaktdaten aus."
      );

      return;

    }


    if (!consent) {

      alert(
        "Bitte akzeptiere die Datenschutzhinweise."
      );

      return;

    }


    const bookingData = {

      ...booking,

      customer: {

        name,

        email,

        phone

      },

      createdAt:
        new Date().toISOString()

    };


    /*
      DEMO-SPEICHERUNG

      Später wird diese Stelle
      durch einen API-Aufruf
      zu unserem Backend ersetzt.
    */

    localStorage.setItem(
      "samaBeautyBooking",
      JSON.stringify(
        bookingData
      )
    );


    document.getElementById(
      "successDetails"
    ).textContent =

      `${getSummary()}

Name:
${name}

E-Mail:
${email}

Telefon:
${phone}`;


    showBookingSuccess();

  }
);



/* SUCCESS */

function showBookingSuccess() {

  Object.values(steps)
    .forEach(step =>
      step.classList.add(
        "hidden"
      )
    );


  success.classList.remove(
    "hidden"
  );

}


document
  .getElementById(
    "newAppointment"
  )
  .addEventListener(
    "click",
    () => {

      location.reload();

    }
  );