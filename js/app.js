// A subtle, continuous floating effect for the UI cards
gsap.to(".card-1", {
    y: 20,
    rotation: -2,
    duration: 4,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
});

gsap.to(".card-2", {
    y: -25,
    rotation: 6,
    duration: 5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 1
});

// Load in animation
gsap.from(".hero-text-wrapper > *", {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Animate the glowing timeline line
gsap.to(".timeline-progress", {
    height: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: ".timeline-wrapper",
        start: "top center", // Animation starts when top of wrapper hits center of viewport
        end: "bottom center", // Ends when bottom of wrapper hits center
        scrub: 1 // Creates that smooth scrubbing effect as you scroll up/down
    }
});

// 2. Reveal each card and light up the dot
const steps = document.querySelectorAll(".process-step");

steps.forEach((step, index) => {
    ScrollTrigger.create({
        trigger: step,
        start: "top 60%", // Triggers when the top of the step card reaches 60% down the screen
        onEnter: () => {
            step.classList.add("active"); // Lights up the dot via CSS
            gsap.to(step, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        },
        onLeaveBack: () => { // Reverses the animation if they scroll back up
            step.classList.remove("active");
            gsap.to(step, {
                opacity: 0,
                y: 40,
                duration: 0.4,
                ease: "power3.in"
            });
        }
    });
});

// 1. 3D Hover Effect Logic (Disabled on Mobile)
const monoliths = document.querySelectorAll('.monolith-wrapper');

monoliths.forEach(wrapper => {
    const card = wrapper.querySelector('.monolith-card');
    
    // Only run the 3D math if the screen is wider than 900px
    if (window.innerWidth > 900) {
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -12; 
            const rotateY = ((x - centerX) / centerX) * 12;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.4,
                ease: "power1.out"
            });
        });

        wrapper.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            });
        });
    }
});

// 2. Scroll stagger entrance
ScrollTrigger.create({
    trigger: ".services-section",
    start: "top 65%",
    onEnter: () => {
        gsap.to(".monolith-wrapper", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }
});

// 3. ClawdBot Sticky Scroll Logic
const features = document.querySelectorAll('.bot-feature-item');
const orb = document.querySelector('.bot-core-orb');

features.forEach((feature, index) => {
    ScrollTrigger.create({
        trigger: feature,
        start: "top center", // Triggers when the feature hits the center of the screen
        end: "bottom center",
        onEnter: () => {
            // Highlight the text
            gsap.to(feature, { opacity: 1, scale: 1, duration: 0.5 });
            
            // Pulse the AI Core orb on the left to react to the scroll
            gsap.to(orb, {
                scale: 1.2,
                boxShadow: "0 0 80px rgba(226, 226, 226, 0.8), inset 0 0 20px #000",
                duration: 0.3,
                yoyo: true,
                repeat: 1
            });
        },
        onLeaveBack: () => {
            // Dim the text if they scroll back up
            gsap.to(feature, { opacity: 0.3, scale: 0.95, duration: 0.5 });
        },
        onLeave: () => {
            // Dim the text as they scroll past it down
            gsap.to(feature, { opacity: 0.3, scale: 0.95, duration: 0.5 });
        }
    });
});

// Case Studies Stagger Animation
ScrollTrigger.create({
    trigger: ".impact-section",
    start: "top 75%",
    onEnter: () => {
        gsap.fromTo(".metric-card", 
            { 
                y: 50, 
                opacity: 0 
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2, // 0.2 seconds between each card appearing
                ease: "power3.out"
            }
        );
    }
});

// CTA Section Reveal
ScrollTrigger.create({
    trigger: ".cta-section",
    start: "top 80%",
    onEnter: () => {
        gsap.fromTo(".cta-container", 
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.5)" }
        );
    }
});