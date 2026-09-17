/* ====================================================
   SSB — SHREE SKHANDHA BUILDERS
   script.js
   - Navbar scroll behaviour
   - Active nav link
   - Scroll reveal
   - Enquiry form: validation + WhatsApp redirect
   - Lightbox gallery
==================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ── NAVBAR SCROLL CLASS ── */
  const navbar = document.querySelector('.ssb-navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.ssb-navbar .nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── ENQUIRY FORM ── */
  const form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors(form);

      const name = form.querySelector('#f-name');
      const phone = form.querySelector('#f-phone');
      const projectType = form.querySelector('#f-project');
      const message = form.querySelector('#f-message');
      let valid = true;

      if (!name.value.trim()) {
        showError(name, 'Please enter your name.'); valid = false;
      }
      if (!phone.value.trim() || !/^[\d\s\+\-\(\)]{7,15}$/.test(phone.value.trim())) {
        showError(phone, 'Please enter a valid phone number.'); valid = false;
      }
      if (!projectType.value) {
        showError(projectType, 'Please select a project type.'); valid = false;
      }
      if (!message.value.trim()) {
        showError(message, 'Please enter your message.'); valid = false;
      }

      if (!valid) return;

      /* Build WhatsApp message */
      const waNumber = '918610436594';
      const text = [
        'Hello SSB — Shree Skhandha Builders,',
        '',
        'I would like to enquire about your construction services.',
        '',
        'Name: ' + name.value.trim(),
        'Phone: ' + phone.value.trim(),
        'Project Type: ' + projectType.value,
        'Message: ' + message.value.trim(),
      ].join('\n');

      const waUrl = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank');

      // Show confirmation
      const successMsg = document.getElementById('form-success');
      if (successMsg) successMsg.classList.add('show');
      form.reset();
    });
  }

  function showError(field, msg) {
    field.style.borderColor = '#E21B23';
    const err = document.createElement('div');
    err.className = 'field-error';
    err.style.cssText = 'color:#E21B23;font-size:0.75rem;margin-top:0.25rem;';
    err.textContent = msg;
    field.parentNode.appendChild(err);
  }
  function clearErrors(form) {
    form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.style.borderColor = '';
    });
    const successMsg = document.getElementById('form-success');
    if (successMsg) successMsg.classList.remove('show');
  }

  /* ── LIGHTBOX (Bootstrap modal) ── */
  const galleryItems = document.querySelectorAll('.gallery-item[data-img]');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCat = document.getElementById('lightbox-cat');

  if (galleryItems.length && lightboxModal) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const src = item.getAttribute('data-img');
        const cat = item.getAttribute('data-cat') || '';
        lightboxImg.setAttribute('src', src);
        lightboxImg.setAttribute('alt', cat);
        if (lightboxCat) lightboxCat.textContent = cat;
        const modal = new bootstrap.Modal(lightboxModal);
        modal.show();
      });
    });
  }

  /* ── MOBILE NAV: close on link click ── */
  const navLinks = document.querySelectorAll('.ssb-navbar .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

});




let services_card = [
  {
    count: 1,
    emojie: "⚙️",
    name: "Civil Engineering",
    desc: "Structural and civil engineering work executed with precision, from foundations to full-scale civil infrastructure."
  },
  {
    count: 2,
    emojie: "🏠",
    name: "Residential Construction",
    desc: "Building quality homes with careful attention to design requirements, materials and construction standards."
  },
  {
    count: 3,
    emojie: "🏗️",
    name: "Commercial Construction",
    desc: "End-to-end construction of commercial and multi-purpose buildings, managed professionally from planning to completion."
  },
  {
    count: 4,
    emojie: "📐",
    name: "Construction & Contracting",
    desc: "Contracting services for projects of varying scope — bringing professional site management and quality workmanship."
  },
  // {
  //   count: 5,
  //   emojie: "🧭",
  //   name: "Vastu Consultation",
  //   desc: "Vastu-based planning guidance for residential and building projects."
  // },
  // {
  //   count: 6,
  //   emojie: "🏛️",
  //   name: "Elevation Design",
  //   desc: "Thoughtful building elevation designs that enhance appearance and architectural character."
  // },
  // {
  //   count: 7,
  //   emojie: "📋",
  //   name: "Building Approval",
  //   desc: "Assistance with building approval processes and required documentation."
  // },
  // {
  //   count: 8,
  //   emojie: "💰",
  //   name: "Property Valuation",
  //   desc: "Property valuation services to help assess the estimated value of buildings and properties."
  // },
  // {
  //   count: 9,
  //   emojie: "🏦",
  //   name: "Bank Loan Assistance",
  //   desc: "Guidance and assistance with documentation for construction and property-related bank loans."
  // },
  // {
  //   count: 10,
  //   emojie: "🧮",
  //   name: "Construction Estimation",
  //   desc: "Construction cost estimation and quantity calculations to support effective project planning."
  // }
];




function showServicesHome() {
  let data = "";

  let servicesContainer = document.getElementById("showServices");

  // If this page doesn't have the services container, stop here
  if (!servicesContainer) {
    return;
  }

  services_card.map((v) => (
    data += `
      <div class="col-lg-3 col-md-6 col-12 mb-4">

        <div class="card h-100 shadow-sm" id="service-card">

          <div class="card-body" style="height: 280px;">

            <span class="service-num" aria-hidden="true">
              ${String(v.count).padStart(2, "0")}
            </span>

            <span class="service-icon" aria-hidden="true">
              ${v.emojie}
            </span>

            <h3>${v.name}</h3>

            <p>
              ${v.desc}
            </p>

          </div>

        </div>

      </div>
    `
  ));

  document.getElementById("showServices").innerHTML = data;
}

showServicesHome()








let services_detail = [
  {
    count: 1,
    image: "../IMAGES/Civil Engineering.jpg",
    name: "Civil Engineering",
    desc: "SSB undertakes civil engineering work with an emphasis on structural integrity and precise execution. From site preparation and foundation work through to completed civil structures, each project is managed with technical care and professional oversight.",
    points: "Foundations • Structural work • Site development • Civil infrastructure"
  },
  {
    count: 2,
    image: "../IMAGES/Residential_Construction.png",
    name: "Residential Construction",
    desc: "Building homes requires attention to detail, quality materials and craftsmanship that stands up over time. SSB approaches residential construction with careful planning and consistent workmanship standards — ensuring the final result meets the client's expectations.",
    points: "Individual homes • Residential buildings • Home extensions"
  },
  {
    count: 3,
    image: "../IMAGES/building_construction.png",
    name: "Commercial Construction",
    desc: "From planning through to completion, SSB manages commercial construction projects with professional site organisation and quality-focused execution.",
    points: "Commercial buildings • Multi-storey structures • Mixed-use developments"
  },
  {
    count: 4,
    image: "../IMAGES/Construction.jpg",
    name: "Construction & Contracting",
    desc: "SSB provides contracting services for construction projects of varying scope and type. We bring professional site management, organised execution and a reliable work ethic to every project.",
    points: "Project contracting • Site management • Sub-contracting • Turnkey delivery"
  },
  {
    count: 5,
    image: "../IMAGES/VastuConsultation.jpg",
    name: "Vastu Consultation",
    desc: "SSB provides Vastu-based planning guidance for residential and building projects, helping clients consider traditional Vastu principles during the planning stage.",
    points: "Vastu planning • Site orientation • Room placement • Building layout"
  },
  {
    count: 6,
    image: "../IMAGES/elevation.png",
    name: "Elevation Design",
    desc: "SSB provides elevation design solutions that focus on creating an attractive and practical exterior appearance while complementing the overall building structure.",
    points: "Front elevation • Exterior design • Architectural appearance • 3D elevation"
  },
  {
    count: 7,
    image: "../IMAGES/approvel.png",
    name: "Building Approval",
    desc: "SSB assists clients with building approval requirements and documentation, helping to streamline the approval process for construction projects.",
    points: "Approval assistance • Documentation • Plan submission • Compliance"
  },
  {
    count: 8,
    image: "../IMAGES/valuation.png",
    name: "Property Valuation",
    desc: "SSB provides property valuation services to help clients understand the estimated value of buildings and properties for different requirements.",
    points: "Property assessment • Building valuation • Market reference • Valuation reports"
  },
  {
    count: 9,
    image: "../IMAGES/bank-loan.png",
    name: "Bank Loan Assistance",
    desc: "SSB provides guidance and assistance with documentation required for construction and property-related bank loan applications.",
    points: "Loan documentation • Construction estimates • Property documents • Bank assistance"
  },
  {
    count: 10,
    image: "../IMAGES/estimation.png",
    name: "Construction Estimation",
    desc: "SSB prepares construction cost estimates and quantity calculations to help clients understand project requirements and plan their construction budget effectively.",
    points: "Cost estimation • Quantity calculation • Material estimation • Budget planning"
  }
];



let currentServicePage = 0;

let servicesPerPage = 4;


function getServicesPerPage() {

  if (window.innerWidth <= 576) {
    return 1;
  }

  if (window.innerWidth <= 992) {
    return 2;
  }

  return 4;
}


function showServicesDetail() {

  let servicesContainer =
    document.getElementById("servicesDetailContainer");

  let dotsContainer =
    document.getElementById("servicesDots");

  if (!servicesContainer || !dotsContainer) return;


  servicesPerPage = getServicesPerPage();


  let totalPages =
    Math.ceil(services_detail.length / servicesPerPage);


  if (currentServicePage >= totalPages) {
    currentServicePage = totalPages - 1;
  }


  let start =
    currentServicePage * servicesPerPage;

  let end =
    start + servicesPerPage;


  let currentServices =
    services_detail.slice(start, end);


  /* =========================
     SERVICES
  ========================= */

  let data = "";


  currentServices.forEach((v, index) => {

    let actualIndex = start + index;

    data += `

      <div class="service-carousel-item">

        <div class="service-carousel-image">

          <img
            src="${v.image}"
            alt="${v.name}"
            loading="lazy"
          >

        </div>


        <span class="service-carousel-number">
          ${String(v.count).padStart(2, "0")}
        </span>


        <h3>
          ${v.name}
        </h3>


      


       <button
  class="btn-ssb-primary"
  onclick="showServiceModal(${actualIndex})"
  data-bs-toggle="modal"
  data-bs-target="#serviceModal"
>
  View Details
</button>

      </div>

    `;
  });


  servicesContainer.innerHTML = data;


  /* =========================
     DOTS
  ========================= */

  let dots = "";


  for (let i = 0; i < totalPages; i++) {

    dots += `

      <span
        class="services-dot ${
          i === currentServicePage ? "active" : ""
        }"
        onclick="goToServicePage(${i})"
      ></span>

    `;
  }


  dotsContainer.innerHTML = dots;
}


function nextService() {

  let totalPages =
    Math.ceil(
      services_detail.length /
      getServicesPerPage()
    );


  if (currentServicePage < totalPages - 1) {

    currentServicePage++;

    showServicesDetail();

  }

}


function previousService() {

  if (currentServicePage > 0) {

    currentServicePage--;

    showServicesDetail();

  }

}

function goToServicePage(page) {

  currentServicePage = page;

  showServicesDetail();

}

showServicesDetail();




function showServiceModal(index) {

  let service = services_detail[index];

  document.getElementById("serviceModalLabel").innerText =
    service.name;

  document.getElementById("serviceModalBody").innerHTML = `

    <div class="row align-items-center">

      <div class="col-md-5 mb-3 mb-md-0">

        <img
          src="${service.image}"
          alt="${service.name}"
          class="img-fluid rounded"
        >

      </div>

      <div class="col-md-7">

   

        <h3 class="mt-2">
          ${service.name}
        </h3>

        <p>
          ${service.desc}
        </p>

        <p class="mb-0">
          <strong>Services Include:</strong>
        </p>

        <p>
          ${service.points}
        </p>

      </div>

    </div>

  `;
}