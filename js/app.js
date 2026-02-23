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

// --- Voice AI Page: Dashboard Typewriter Effect ---
if (document.querySelector('.intercept-dashboard')) {
    // Reveal the dashboard with a smooth float in
    gsap.from(".intercept-dashboard", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Make the AI text type out
    const typingText = document.querySelector('.typing-text');
    const fullText = typingText.innerHTML;
    typingText.innerHTML = "";
    typingText.style.opacity = 1;

    let charIndex = 0;
    function typeWriter() {
        if (charIndex < fullText.length) {
            typingText.innerHTML += fullText.charAt(charIndex);
            charIndex++;
            // Randomize typing speed slightly for realism (between 10ms and 40ms)
            setTimeout(typeWriter, Math.random() * 30 + 10);
        }
    }

    // Start typing after a brief delay (simulating the AI "thinking")
    setTimeout(typeWriter, 1200);
}

// --- Voice AI Page: Accordion Touch/Click Logic ---
const panels = document.querySelectorAll('.fluid-panel');
if (panels.length > 0) {
    panels.forEach(panel => {
        // Supports both desktop hover and mobile tap
        ['mouseenter', 'click'].forEach(evt => {
            panel.addEventListener(evt, () => {
                panels.forEach(p => p.classList.remove('active'));
                panel.classList.add('active');
            });
        });
    });
}

// --- Voice AI Page: Telecom Pipeline Animation ---
if (document.querySelector('.telecom-pipeline')) {
    const pulse = document.querySelector('.telecom-pulse');
    const steps = document.querySelectorAll('.flow-step');

    // Shoot the pulse down the line
    gsap.to(pulse, {
        opacity: 1,
        y: () => document.querySelector('.telecom-line').offsetHeight - 120,
        ease: "none",
        scrollTrigger: {
            trigger: ".telecom-pipeline",
            start: "top center",
            end: "bottom center",
            scrub: 0.5
        }
    });

    // Light up nodes and fade in cards
    steps.forEach(step => {
        ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            onEnter: () => {
                step.classList.add('active');
                gsap.to(step, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
            },
            onLeaveBack: () => {
                step.classList.remove('active');
                gsap.to(step, { opacity: 0, y: 30, duration: 0.4 });
            }
        });
    });
}

// --- CRM Page: Pipeline Scrub Animation ---
if (document.querySelector('.pipeline-container')) {
    const beam = document.querySelector('.pipeline-beam');
    const nodes = document.querySelectorAll('.pipeline-node');

    // 1. Move the glowing beam down the track
    gsap.to(beam, {
        opacity: 1,
        y: () => document.querySelector('.pipeline-track').offsetHeight - 100, // Moves to bottom
        ease: "none",
        scrollTrigger: {
            trigger: ".pipeline-container",
            start: "top center",
            end: "bottom center",
            scrub: 1
        }
    });

    // 2. Light up nodes as the beam passes them
    nodes.forEach(node => {
        ScrollTrigger.create({
            trigger: node,
            start: "top 60%", // Triggers slightly before center
            onEnter: () => {
                node.classList.add('active');
                gsap.to(node, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
            },
            onLeaveBack: () => {
                node.classList.remove('active');
                gsap.to(node, { opacity: 0, y: 30, duration: 0.4 });
            }
        });
    });

    // 3. Hero 3D Stack Parallax
    const stack = document.querySelector('.data-stack');
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 900 && stack) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            gsap.to(stack, { rotateX: 60 - y, rotateZ: -45 + x, duration: 1 });
        }
    });
}

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

// --- OpenClaw Page: Swarm Data Flow Animation ---
if (document.querySelector('.swarm-grid')) {
    const particles = document.querySelectorAll('.stream-particle');

    // Create an infinite loop of data shooting from the core to the agents
    particles.forEach((particle, index) => {
        gsap.to(particle, {
            y: 80,
            opacity: 1,
            duration: 1.5,
            ease: "power2.in",
            repeat: -1,
            delay: index * 0.4,
            keyframes: {
                "0%": { opacity: 0, y: 0 },
                "20%": { opacity: 1 },
                "80%": { opacity: 1 },
                "100%": { opacity: 0, y: 120 }
            }
        });
    });

    // Pulse the core node
    gsap.to(".core-node", {
        boxShadow: "0 0 40px rgba(242, 200, 0, 0.3)",
        borderColor: "rgba(242, 200, 0, 0.8)",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });
}

// OpenClaw Routing SVG Animation
if (document.querySelector('.matrix-lines')) {
    const lines = document.querySelectorAll('.route-line');

    // Animate the actual lines drawing themselves
    lines.forEach(line => {
        const length = line.getTotalLength();
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;

        gsap.to(line, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: ".routing-matrix-section",
                start: "top center"
            }
        });
    });

    // Make the glowing data packets feel alive by animating agent text statuses
    const statusTexts = ["Processing NLP...", "Retrieving context...", "Executing Python...", "Output generated."];
    const agentStatuses = document.querySelectorAll('.agent-status');

    setInterval(() => {
        agentStatuses.forEach(status => {
            if (Math.random() > 0.5) {
                status.innerText = statusTexts[Math.floor(Math.random() * statusTexts.length)];
                status.style.color = "#00FFA3";
                setTimeout(() => { status.style.color = "#728A81"; }, 500);
            }
        });
    }, 2000);
}

// --- OpenClaw Page: Interactive Console Logic & Mobile Scroll ---
const consoleTabs = document.querySelectorAll('.console-tab');
const consoleModules = document.querySelectorAll('.viewport-module');

if (consoleTabs.length > 0) {
    consoleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Switch active classes
            consoleTabs.forEach(t => t.classList.remove('active'));
            consoleModules.forEach(m => m.classList.remove('active'));
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Mobile specific: Scroll the viewport into view when a tab is tapped
            if (window.innerWidth <= 900) {
                setTimeout(() => {
                    const viewport = document.querySelector('.console-viewport');
                    const offset = viewport.getBoundingClientRect().top + window.scrollY - 80; // Account for sticky nav
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }, 100);
            }
        });
    });
}

// --- Mobile Navbar Toggle Logic ---
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

if (mobileMenuBtn && mobileNavOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileMenuBtn.classList.toggle('active');
        if (isActive) {
            mobileNavOverlay.classList.add('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close the menu if any link inside the overlay is clicked
    const mobileLinks = mobileNavOverlay.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}