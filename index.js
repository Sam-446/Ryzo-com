document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Header Scroll Effect
  // =========================================================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // =========================================================================
  // 2. Mobile Navigation Toggle (Hamburger)
  // =========================================================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // =========================================================================
  // 3. Device Mockup Slider (Carousel)
  // =========================================================================
  const slider = document.getElementById('screen-slider');
  const dots = document.querySelectorAll('#slider-dots .dot');
  let currentSlide = 0;
  const slideCount = dots.length;
  let sliderInterval;

  function updateSlider(index) {
    if (!slider) return;
    currentSlide = index;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
  }

  function startAutoplay() {
    sliderInterval = setInterval(() => {
      let nextSlide = (currentSlide + 1) % slideCount;
      updateSlider(nextSlide);
    }, 4000);
  }

  function stopAutoplay() {
    clearInterval(sliderInterval);
  }

  if (slider && dots.length > 0) {
    // Add click listeners to dots
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        stopAutoplay();
        updateSlider(idx);
        startAutoplay(); // Restart autoplay from clicked index
      });
    });

    // Touch Swipe Support
    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopAutoplay();
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          // Swipe Left -> Next
          updateSlider((currentSlide + 1) % slideCount);
        } else {
          // Swipe Right -> Prev
          updateSlider((currentSlide - 1 + slideCount) % slideCount);
        }
      }
      startAutoplay();
    }, { passive: true });

    startAutoplay();
  }

  // =========================================================================
  // 4. Interactive AI Coach Playground
  // =========================================================================
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const suggestions = document.querySelectorAll('.suggestion-pill');
  const typingIndicator = document.getElementById('typing-indicator');

  // AI Canned Responses
  const responses = {
    "why am i not gaining weight?":
      "Based on your profile and daily logs, you might not be in a consistent caloric surplus. To gain muscle, you must consume about 300-500 calories above your maintenance level daily. Focus on protein-dense foods (aim for 1.6g-2g of protein per kg of body weight) and trace your nutrition metrics carefully using our AI scanner! 💪",

    "how do i cut belly fat?":
      "Belly fat (visceral fat) is lost through a sustained, moderate caloric deficit. You cannot spot-reduce fat, but by keeping a deficit of 300-500 kcal daily and combining it with resistance training, your overall body fat percentage will drop. Track your daily macros using the Ryzo food scanner to ensure you keep your protein high and stay on track! ⚡",

    "how can i increase strength?":
      "To build strength, focus on progressive overload—gradually increasing the weight, reps, or sets on compound exercises (like squats, deadlifts, and overhead presses). Give yourself adequate recovery (48 hours between same-muscle groups) and make sure you're hitting your carb targets for glycogen replenishment. Check your daily Ryzo workout plan for specific set and rep guidance! 🔥",

    "is creatine safe?":
      "Yes, creatine monohydrate is one of the most researched and safe supplements in the world. It helps regenerate ATP (energy) in your muscle cells, increasing power output and strength. A standard dose of 3-5g daily is sufficient. Remember to stay hydrated and hit your daily water goals (aim for 3L+) using the hydration tracker! 💧",

    "default":
      "Great question! To get the most tailored guidance, make sure to log your physical stats, goals, and daily meals in the Ryzo app. As your AI Coach, I can analyze your active workout sheets and calorie trends to give you precise, step-by-step advice. Keep pushing your limits! 🚀"
  };

  function sendChatMessage(text) {
    if (!text.trim()) return;

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = text;
    chatBody.insertBefore(userMsg, typingIndicator);

    // Clear & Scroll
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Show Typing Indicator
    typingIndicator.style.display = 'flex';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Get response key
    const normalizedKey = text.trim().toLowerCase().replace(/[?.,!]/g, '');
    let responseText = responses[normalizedKey] || responses['default'];

    // Delay responses to look authentic
    setTimeout(() => {
      // Hide typing
      typingIndicator.style.display = 'none';

      // Append Coach Response
      const coachMsg = document.createElement('div');
      coachMsg.className = 'msg coach';
      coachMsg.textContent = responseText;
      chatBody.insertBefore(coachMsg, typingIndicator);

      // Scroll Down
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1500);
  }

  if (chatSend && chatInput) {
    chatSend.addEventListener('click', () => {
      sendChatMessage(chatInput.value);
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage(chatInput.value);
      }
    });
  }

  // Suggestion Pills
  suggestions.forEach(pill => {
    pill.addEventListener('click', () => {
      const query = pill.getAttribute('data-q');
      sendChatMessage(query);
    });
  });

});
