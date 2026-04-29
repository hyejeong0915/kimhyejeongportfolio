const fadeItems = document.querySelectorAll(
  ".section-title, .about-text, .profile-box, .timeline, .skill-list, .skills-wrap, .contact h2, .contact .btn"
);

fadeItems.forEach((item) => {
  item.classList.add("fade-up");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

fadeItems.forEach((item) => observer.observe(item));

const cursorLight = document.querySelector(".cursor-light");

if (cursorLight) {
  document.addEventListener("mousemove", (e) => {
    cursorLight.style.left = e.clientX + "px";
    cursorLight.style.top = e.clientY + "px";
  });
}

const workButtons = document.querySelectorAll(".nav-work");
const workPanel = document.querySelector(".work-panel");
const workDim = document.querySelector(".work-dim");
const closeWork = document.querySelector(".close-work");

function openWorkPanel() {
  workPanel.classList.add("active");
  workDim.classList.add("active");
  document.body.classList.add("panel-open");
}

function closeWorkPanel() {
  workPanel.classList.remove("active");
  workDim.classList.remove("active");
  document.body.classList.remove("panel-open");
}

workButtons.forEach((button) => {
  button.addEventListener("click", openWorkPanel);
});

closeWork.addEventListener("click", closeWorkPanel);
workDim.addEventListener("click", closeWorkPanel);

const workData = {
  detail: {
    category: "Detail Page",
    title: "상세페이지 디자인",
    type: "detail",
    images: [
      "images/info-01.jpg",
      "images/info-02.jpg",
      "images/info-03.jpg",
      "images/info-04.jpg",
      "images/info-05.jpg",
      "images/info-06.jpg",
      "images/info-07.jpg",
      "images/info-08.jpg",
      "images/info-09.jpg",
      "images/info-10.jpg",
      "images/info-11.jpg",
      "images/info-12.jpg",
      "images/info-13.gif",
      "images/info-14.jpg",
      "images/info-15.jpg",
      "images/info-16.jpg",
      "images/info-17.jpg",
      "images/info-18.jpg",
      "images/info-19.jpg",
      "images/info-20.jpg",
      "images/info-21.jpg",
      "images/info-22.jpg",
      "images/info-23.jpg",
      "images/info-24.jpg",
      "images/info-25.jpg",
      "images/info-26.jpg",
      "images/info-27.jpg",
      "images/info-28.jpg",
      "images/info-29.jpg"
    ]
  },

  modeling: {
    category: "3D Modeling",
    title: "3D 모델링",
    type: "carousel-image",
    images: [
      "images/3d-modeling-01.jpg",
      "images/3d-modeling-02.png",
      "images/3d-modeling-03.jpg",
      "images/3d-modeling-04.png",
      "images/3d-modeling-05.png",
      "images/3d-modeling-06.png",
      "images/3d-modeling-07.png"
    ]
  },

  poster: {
    category: "Moving Poster",
    title: "무빙포스터",
    type: "carousel-video",
    videos: [
      "videos/moving-poster-01.mp4",
      "videos/moving-poster-02.mp4"
    ]
  },

  motion: {
    category: "Motion Graphic",
    title: "모션그래픽",
    type: "motion-video",
    videos: [
      "videos/motion-graphic-01.mp4"
    ]
  }
};

const viewButtons = document.querySelectorAll(".view-work");
const viewerModal = document.querySelector(".viewer-modal");
const viewerCategory = document.querySelector(".viewer-category");
const viewerTitle = document.querySelector(".viewer-title");
const viewerContent = document.querySelector(".viewer-content");
const viewerClose = document.querySelector(".viewer-close");

let currentSlide = 0;

function createControls(slideItems) {
  const controls = document.createElement("div");
  controls.className = "model-controls";
  controls.innerHTML = `
    <button type="button" class="prev-slide">이전</button>
    <button type="button" class="next-slide">다음</button>
  `;

  controls.querySelector(".prev-slide").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
    showSlide(slideItems, currentSlide);
  });

  controls.querySelector(".next-slide").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slideItems.length;
    showSlide(slideItems, currentSlide);
  });

  return controls;
}

function showSlide(slideItems, index) {
  slideItems.forEach((slide) => {
    slide.classList.remove("active");

    const video = slide.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });

  slideItems[index].classList.add("active");
}

function openViewer(workKey) {
  const data = workData[workKey];

  viewerCategory.textContent = data.category;
  viewerTitle.textContent = data.title;
  viewerContent.innerHTML = "";

  if (data.type === "detail") {
    const stack = document.createElement("div");
    stack.className = "detail-stack";

    data.images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = data.title;
      stack.appendChild(img);
    });

    viewerContent.appendChild(stack);
  }

  if (data.type === "carousel-image") {
    currentSlide = 0;

    const wrap = document.createElement("div");
    wrap.className = "model-viewer model-viewer-3d";

    const slides = document.createElement("div");
    slides.className = "model-slides";

    data.images.forEach((src, index) => {
      const slide = document.createElement("div");
      slide.className = index === 0 ? "model-slide active" : "model-slide";

      const img = document.createElement("img");
      img.src = src;
      img.alt = `${data.title} ${index + 1}`;

      slide.appendChild(img);
      slides.appendChild(slide);
    });

    wrap.appendChild(slides);
    viewerContent.appendChild(wrap);

    const slideItems = viewerContent.querySelectorAll(".model-slide");

    if (slideItems.length > 1) {
      wrap.appendChild(createControls(slideItems));
    }
  }

  if (data.type === "carousel-video") {
    currentSlide = 0;

    const wrap = document.createElement("div");
    wrap.className = "model-viewer model-viewer-poster";

    const slides = document.createElement("div");
    slides.className = "model-slides";

    data.videos.forEach((src, index) => {
      const slide = document.createElement("div");
      slide.className = index === 0 ? "model-slide active" : "model-slide";

      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.playsInline = true;
      video.muted = true;
      video.loop = true;
      video.autoplay = index === 0;
      video.preload = "auto";

      slide.appendChild(video);
      slides.appendChild(slide);
    });

    wrap.appendChild(slides);
    viewerContent.appendChild(wrap);

    const slideItems = viewerContent.querySelectorAll(".model-slide");

    function playActiveVideo() {
      slideItems.forEach((slide, index) => {
        const video = slide.querySelector("video");
        if (!video) return;

        if (index === currentSlide) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }

    if (slideItems.length > 1) {
      const controls = document.createElement("div");
      controls.className = "model-controls";
      controls.innerHTML = `
        <button type="button" class="prev-slide">이전</button>
        <button type="button" class="next-slide">다음</button>
      `;

      controls.querySelector(".prev-slide").addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
        showSlide(slideItems, currentSlide);
        playActiveVideo();
      });

      controls.querySelector(".next-slide").addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slideItems.length;
        showSlide(slideItems, currentSlide);
        playActiveVideo();
      });

      wrap.appendChild(controls);
    }

    playActiveVideo();
  }

  if (data.type === "motion-video") {
    const wrap = document.createElement("div");
    wrap.className = "model-viewer model-viewer-motion";

    const box = document.createElement("div");
    box.className = "motion-video-box";

    const video = document.createElement("video");
    video.src = data.videos[0];
    video.controls = true;
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.preload = "auto";

    box.appendChild(video);
    wrap.appendChild(box);
    viewerContent.appendChild(wrap);

    video.play().catch(() => {});
  }

  viewerModal.classList.add("active");
  document.body.classList.add("viewer-open");
}

function closeViewer() {
  viewerModal.classList.remove("active");
  document.body.classList.remove("viewer-open");
  viewerContent.innerHTML = "";
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openViewer(button.dataset.work);
  });
});

viewerClose.addEventListener("click", closeViewer);

viewerModal.addEventListener("click", (e) => {
  if (e.target === viewerModal) {
    closeViewer();
  }
});

const contactOpen = document.querySelector(".contact-open");
const contactModal = document.querySelector(".contact-modal");
const contactClose = document.querySelector(".contact-close");

if (contactOpen && contactModal && contactClose) {
  contactOpen.addEventListener("click", () => {
    contactModal.classList.add("active");
    document.body.classList.add("viewer-open");
  });

  contactClose.addEventListener("click", () => {
    contactModal.classList.remove("active");
    document.body.classList.remove("viewer-open");
  });

  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove("active");
      document.body.classList.remove("viewer-open");
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeViewer();
    closeWorkPanel();

    if (contactModal) {
      contactModal.classList.remove("active");
    }

    document.body.classList.remove("viewer-open");
  }
});