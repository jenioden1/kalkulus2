(function ($) {
  "use strict";

  // Page loading animation
  $(window).on("load", function () {
    $("#js-preloader").addClass("loaded");
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $(".header-text").height();
    var header = $("header").height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  var width = $(window).width();
  $(window).resize(function () {
    if (width > 767 && $(window).width() < 767) {
      location.reload();
    } else if (width < 767 && $(window).width() > 767) {
      location.reload();
    }
  });

  const elem = document.querySelector(".event_box");
  const filtersElem = document.querySelector(".event_filter");
  if (elem) {
    const rdn_events_list = new Isotope(elem, {
      itemSelector: ".event_outer",
      layoutMode: "masonry",
    });
    if (filtersElem) {
      filtersElem.addEventListener("click", function (event) {
        if (!matchesSelector(event.target, "a")) {
          return;
        }
        const filterValue = event.target.getAttribute("data-filter");
        rdn_events_list.arrange({
          filter: filterValue,
        });
        filtersElem.querySelector(".is_active").classList.remove("is_active");
        event.target.classList.add("is_active");
        event.preventDefault();
      });
    }
  }

  $(".owl-banner").owlCarousel({
    center: true,
    items: 1,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    margin: 30,
    responsive: {
      992: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  });

  $(".owl-testimonials").owlCarousel({
    center: true,
    items: 1,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    margin: 30,
    responsive: {
      992: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  });

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function () {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  // Menu elevator animation
  $(".scroll-to-section a[href*=\\#]:not([href=\\#])").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        var width = $(window).width();
        if (width < 767) {
          $(".menu-trigger").removeClass("active");
          $(".header-area .nav").slideUp(200);
        }
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          700
        );
        return false;
      }
    }
  });

  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.scroll-to-section a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $(".scroll-to-section a").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 79,
          },
          500,
          "swing",
          function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".nav a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (
        refElement.position().top <= scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $(".nav ul li a").removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  // Page loading animation
  $(window).on("load", function () {
    if ($(".cover").length) {
      $(".cover").parallax({
        imageSrc: $(".cover").data("image"),
        zIndex: "1",
      });
    }

    $("#preloader").animate(
      {
        opacity: "0",
      },
      600,
      function () {
        setTimeout(function () {
          $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
      }
    );
  });

  const dropdownOpener = $(".main-nav ul.nav .has-sub > a");

  // Open/Close Submenus
  if (dropdownOpener.length) {
    dropdownOpener.each(function () {
      var _this = $(this);

      _this.on("tap click", function (e) {
        var thisItemParent = _this.parent("li"),
          thisItemParentSiblingsWithDrop = thisItemParent.siblings(".has-sub");

        if (thisItemParent.hasClass("has-sub")) {
          var submenu = thisItemParent.find("> ul.sub-menu");

          if (submenu.is(":visible")) {
            submenu.slideUp(450, "easeInOutQuad");
            thisItemParent.removeClass("is-open-sub");
          } else {
            thisItemParent.addClass("is-open-sub");

            if (thisItemParentSiblingsWithDrop.length === 0) {
              thisItemParent
                .find(".sub-menu")
                .slideUp(400, "easeInOutQuad", function () {
                  submenu.slideDown(250, "easeInOutQuad");
                });
            } else {
              thisItemParent
                .siblings()
                .removeClass("is-open-sub")
                .find(".sub-menu")
                .slideUp(250, "easeInOutQuad", function () {
                  submenu.slideDown(250, "easeInOutQuad");
                });
            }
          }
        }

        e.preventDefault();
      });
    });
  }
})(window.jQuery);

function showForm(formId) {
  // Menghapus bagian terkait "one-dimension"
  // document.getElementById("one-dimension").style.display = "none";
  document.getElementById("two-dimension").style.display = "none";
  document.getElementById("three-dimension").style.display = "none";
  // document.getElementById("btn-one-dimension").classList.remove("active");
  document.getElementById("btn-two-dimension").classList.remove("active");
  document.getElementById("btn-three-dimension").classList.remove("active");

  // Mengabaikan "one-dimension" dalam logika if
  // if (formId === "one-dimension") {
  //     document.getElementById("one-dimension").style.display = "block";
  //     document.getElementById("btn-one-dimension").classList.add("active");
  // } else
  if (formId === "two-dimension") {
    document.getElementById("two-dimension").style.display = "block";
    document.getElementById("btn-two-dimension").classList.add("active");
  } else if (formId === "three-dimension") {
    document.getElementById("three-dimension").style.display = "block";
    document.getElementById("btn-three-dimension").classList.add("active");
  }
}

//START FUNGSI KE 1
// Fungsi untuk menghitung sudut antara dua vektor satu dimensi
// Fungsi untuk menghitung sudut antara dua vektor satu dimensi
// Fungsi untuk menghitung sudut antara dua vektor satu dimensi
function calculateAngleOneDim() {
  // Mendapatkan nilai dari input
  var vectorA = parseFloat(document.getElementById("one-var1").value);
  var vectorB = parseFloat(document.getElementById("one-var2").value);

  // Menghitung sudut antara vektor A dan B
  var angleDeg = Math.atan2(vectorB, vectorA) * (180 / Math.PI);

  // Menampilkan hasil
  document.getElementById("output-one").innerHTML =
    "Sudut antara vektor A dan B adalah: " + angleDeg.toFixed(2) + "°";

  // Menampilkan output
  var outputs = document.getElementsByClassName("outputHitung");
  for (var i = 0; i < outputs.length; i++) {
    outputs[i].style.display = "block";
  }

  // Menggambar grafik kartesius satu dimensi
  drawGraphOneDim(vectorA, vectorB, angleDeg.toFixed(2));
}

function drawGraphOneDim(vectorA, vectorB, angleDeg) {
  var traceA = {
    x: [0, vectorA],
    y: [0, 0],
    mode: "lines+text",
    type: "scatter",
    name: "Vector A",
    line: { color: "red", width: 5 },
    text: [`0`, vectorA.toFixed(2)],
    textposition: "top right",
  };

  var traceB = {
    x: [0, vectorB],
    y: [0, 0],
    mode: "lines+text",
    type: "scatter",
    name: "Vector B",
    line: { color: "blue", width: 5 },
    text: [`0`, vectorB.toFixed(2)],
    textposition: "top right",
  };

  var data = [traceA, traceB];

  var layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
    xaxis: { title: "X" },
    yaxis: { visible: false },
    annotations: [
      {
        x: (vectorA + vectorB) / 2,
        y: 0,
        text: `Sudut: ${angleDeg}°`,
        showarrow: false,
        font: {
          color: "black",
          size: 12,
        },
      },
    ],
  };

  Plotly.newPlot("vectorGraph", data, layout);
}

function resetFormOneDim() {
  document.getElementById("one-var1").value = "";
  document.getElementById("one-var2").value = "";
  document.getElementById("output-one").innerHTML = "";
  var outputs = document.getElementsByClassName("outputHitung");
  for (var i = 0; i < outputs.length; i++) {
    outputs[i].style.display = "none";
  }

  // Clear the Plotly plot
  Plotly.purge("vectorGraph");
}

// Event listeners
document
  .getElementById("form-submit-one")
  .addEventListener("click", calculateAngleOneDim);
document
  .getElementById("form-reset-one")
  .addEventListener("click", resetFormOneDim);

//AKHIR FUNGSI KE 1

//START FUNGSI KE 2

// Fungsi untuk menghitung sudut antara dua vektor dua dimensi
// Fungsi untuk menghitung sudut antara dua vektor dua dimensi
function calculateAngleTwoDim() {
  // Mendapatkan nilai dari input
  var vectorAx = parseFloat(document.getElementById("two-var1").value);
  var vectorAy = parseFloat(document.getElementById("two-var2").value);
  var vectorBx = parseFloat(document.getElementById("two-var3").value);
  var vectorBy = parseFloat(document.getElementById("two-var4").value);

  // Menghitung dot product
  var dotProduct = vectorAx * vectorBx + vectorAy * vectorBy;

  // Menghitung magnitudo vektor A
  var magnitudeA = Math.sqrt(vectorAx * vectorAx + vectorAy * vectorAy);

  // Menghitung magnitudo vektor B
  var magnitudeB = Math.sqrt(vectorBx * vectorBx + vectorBy * vectorBy);

  // Menghitung cosinus sudut
  var cosTheta = dotProduct / (magnitudeA * magnitudeB);

  // Menghitung sudut dalam radian
  var angleRad = Math.acos(cosTheta);

  // Mengkonversi sudut dari radian ke derajat
  var angleDeg = (180 / Math.PI) * angleRad;

  // Menampilkan hasil
  document.getElementById("output-two").innerHTML =
    "Sudut antara vektor A dan B adalah: " + angleDeg.toFixed(2) + "°";

  // Menampilkan output
  var outputs = document.getElementsByClassName("outputHitung");
  for (var i = 0; i < outputs.length; i++) {
    outputs[i].style.display = "block";
  }

  // Menggambar grafik kartesius dua dimensi
  drawGraphTwoDim(vectorAx, vectorAy, vectorBx, vectorBy, angleDeg.toFixed(2));
}

function drawGraphTwoDim(ax, ay, bx, by, angleDeg) {
  var traceA = {
    x: [0, ax],
    y: [0, ay],
    mode: "lines+text",
    type: "scatter",
    name: "Vector A",
    line: { color: "red", width: 5 },
    text: [`(0,0)`, `(${ax.toFixed(2)},${ay.toFixed(2)})`],
    textposition: "top right",
  };

  var traceB = {
    x: [0, bx],
    y: [0, by],
    mode: "lines+text",
    type: "scatter",
    name: "Vector B",
    line: { color: "blue", width: 5 },
    text: [`(0,0)`, `(${bx.toFixed(2)},${by.toFixed(2)})`],
    textposition: "top right",
  };

  // Menambahkan garis kartesian
  var traceX = {
    x: [0, ax > bx ? ax : bx],
    y: [0, 0],
    mode: "lines",
    type: "scatter",
    name: "X-Axis",
    line: { color: "black", width: 2, dash: "dash" },
  };

  var traceY = {
    x: [0, 0],
    y: [0, ay > by ? ay : by],
    mode: "lines",
    type: "scatter",
    name: "Y-Axis",
    line: { color: "black", width: 2, dash: "dash" },
  };

  var data = [traceA, traceB, traceX, traceY];

  var layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
    xaxis: { title: "X" },
    yaxis: { title: "Y" },
    annotations: [
      {
        x: (ax + bx) / 2,
        y: (ay + by) / 2,
        text: `Sudut: ${angleDeg}°`,
        showarrow: false,
        font: {
          color: "black",
          size: 12,
        },
      },
    ],
  };

  Plotly.newPlot("vectorGraphTwoDim", data, layout);
}

function resetFormTwoDim() {
  document.getElementById("two-var1").value = "";
  document.getElementById("two-var2").value = "";
  document.getElementById("two-var3").value = "";
  document.getElementById("two-var4").value = "";
  document.getElementById("output-two").innerHTML = "";
  var outputs = document.getElementsByClassName("outputHitung");
  for (var i = 0; i < outputs.length; i++) {
    outputs[i].style.display = "none";
  }

  // Clear the Plotly plot
  Plotly.purge("vectorGraphTwoDim");
}

// Event listeners
document
  .getElementById("form-submit-two")
  .addEventListener("click", calculateAngleTwoDim);
document
  .getElementById("form-reset-two")
  .addEventListener("click", resetFormTwoDim);

//AKHIR FUNGSI KE 2

//START FUUNGSI KE 3

// Fungsi untuk menghitung sudut antara dua vektor tiga dimensi
// Fungsi untuk menghitung sudut antara dua vektor tiga dimensi
function calculateAngleThreeDim() {
  // Mendapatkan nilai dari input
  var vectorAx = parseFloat(document.getElementById("three-var1").value);
  var vectorAy = parseFloat(document.getElementById("three-var2").value);
  var vectorAz = parseFloat(document.getElementById("three-var3").value);
  var vectorBx = parseFloat(document.getElementById("three-var4").value);
  var vectorBy = parseFloat(document.getElementById("three-var5").value);
  var vectorBz = parseFloat(document.getElementById("three-var6").value);

  // Menghitung dot product
  var dotProduct =
    vectorAx * vectorBx + vectorAy * vectorBy + vectorAz * vectorBz;

  // Menghitung magnitudo vektor A
  var magnitudeA = Math.sqrt(
    vectorAx * vectorAx + vectorAy * vectorAy + vectorAz * vectorAz
  );

  // Menghitung magnitudo vektor B
  var magnitudeB = Math.sqrt(
    vectorBx * vectorBx + vectorBy * vectorBy + vectorBz * vectorBz
  );

  // Menghitung cosinus sudut
  var cosTheta = dotProduct / (magnitudeA * magnitudeB);

  // Menghitung sudut dalam radian
  var angleRad = Math.acos(cosTheta);

  // Mengkonversi sudut dari radian ke derajat
  var angleDeg = (180 / Math.PI) * angleRad;

  // Menampilkan hasil
  document.getElementById("output-three").innerHTML =
    "Sudut antara vektor A dan B adalah: " + angleDeg.toFixed(2) + "°";

  // Menampilkan output
  var outputs = document.getElementsByClassName("outputHitung");
  for (var i = 0; i < outputs.length; i++) {
    outputs[i].style.display = "block";
  }

  // Menggambar grafik kartesius 3D
  drawGraphThreeDim(
    vectorAx,
    vectorAy,
    vectorAz,
    vectorBx,
    vectorBy,
    vectorBz,
    angleDeg.toFixed(2)
  );
}

// Fungsi untuk menggambar grafik kartesius 3D
function drawGraphThreeDim(ax, ay, az, bx, by, bz, angleDeg) {
  var traceA = {
    x: [0, ax],
    y: [0, ay],
    z: [0, az],
    mode: "lines+text",
    type: "scatter",
    name: "Vector A",
    line: { color: "red", width: 5 },
    text: [`(0,0,0)`, `(${ax.toFixed(2)},${ay.toFixed(2)},${az.toFixed(2)})`],
    textposition: "top right",
  };

  var traceB = {
    x: [0, bx],
    y: [0, by],
    z: [0, bz],
    mode: "lines+text",
    type: "scatter",
    name: "Vector B",
    line: { color: "blue", width: 5 },
    text: [`(0,0,0)`, `(${bx.toFixed(2)},${by.toFixed(2)},${bz.toFixed(2)})`],
    textposition: "top right",
  };

  // Menambahkan garis kartesian
  var traceX = {
    x: [0, Math.max(ax, bx) * 1.2],
    y: [0, 0],
    mode: "lines",
    type: "scatter",
    name: "X-Axis",
    line: { color: "black", width: 2, dash: "dash" },
  };

  var traceY = {
    x: [0, 0],
    y: [0, Math.max(ay, by) * 1.2],
    mode: "lines",
    type: "scatter",
    name: "Y-Axis",
    line: { color: "black", width: 2, dash: "dash" },
  };

  var data = [traceA, traceB, traceX, traceY];

  var layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
    xaxis: { title: "X" },
    yaxis: { title: "Y" },
    annotations: [
      {
        x: (ax + bx) / 2,
        y: (ay + by) / 2,
        text: `Sudut: ${angleDeg}°`,
        showarrow: false,
        font: {
          color: "black",
          size: 12,
        },
      },
    ],
  };

  Plotly.newPlot("vectorGraphThreeDim", data, layout);
}

// Fungsi untuk mereset form
function resetFormThreeDim() {
  document.getElementById("three-var1").value = "";
  document.getElementById("three-var2").value = "";
  document.getElementById("three-var3").value = "";
  document.getElementById("three-var4").value = "";
  document.getElementById("three-var5").value = "";
  document.getElementById("three-var6").value = "";
  document.getElementById("output-three").innerHTML = "";
  var outputs = document.getElementsByClassName("outputHitung");
  for (var i = 0; i < outputs.length; i++) {
    outputs[i].style.display = "none";
  }

  // Menghapus plot Plotly
  Plotly.purge("vectorGraphThreeDim");
}

function resetFormThreeDim() {
  document.getElementById("three-var1").value = "";
  document.getElementById("three-var2").value = "";
  document.getElementById("three-var3").value = "";
  document.getElementById("three-var4").value = "";
  document.getElementById("three-var5").value = "";
  document.getElementById("three-var6").value = "";
  document.getElementById("output-three").innerHTML = "";
  var outputs = document.getElementsByClassName("outputHitung");
  for (var i = 0; i < outputs.length; i++) {
    outputs[i].style.display = "none";
  }

  // Clear the Plotly plot
  Plotly.purge("vectorGraphThreeDim");
}

document
  .getElementById("form-submit-three")
  .addEventListener("click", calculateAngleThreeDim);
document
  .getElementById("form-reset-three")
  .addEventListener("click", resetFormThreeDim);
