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
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            gsap.to(stack, { rotateX: 60 - y, rotateZ: -45 + x, duration: 1, ease: "power2.out" });
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

// --- Voice AI Logic Simulator ---
const scenarios = {
    price: {
        human: "Honestly, $5,000 a month is way out of our budget right now. We're looking for something cheaper.",
        intent: "PRICE_OBJECTION_HIGH_FRICTION",
        ai: "I completely understand keeping overhead low. However, our system replaces two full-time SDRs and works 24/7. If we could guarantee a minimum of 15 qualified appointments booked per week, would the ROI make sense for you?"
    },
    competitor: {
        human: "I was looking at ChatBot Pro, and they only charge $200 a month for an AI widget.",
        intent: "COMPETITOR_COMPARISON",
        ai: "ChatBot Pro is great for basic text FAQs. But Pylon engineers live voice agents that physically execute API webhooks to charge cards and book calendars. We aren't a widget; we are telecom infrastructure. Would you like me to pull up a side-by-side feature comparison?"
    },
    booking: {
        human: "Actually, cancel my meeting for tomorrow. I need to push it to Thursday afternoon, but I don't know my schedule yet.",
        intent: "DYNAMIC_RESCHEDULE",
        ai: "No problem, I've just removed tomorrow's hold from the calendar. I'll send you an SMS right now with a secure link so you can lock in a Thursday afternoon slot once you know your schedule. Did you receive the text?"
    }
};

function runSim(type) {
    const data = scenarios[type];

    // Reset UI
    document.getElementById('sim-default').style.display = 'none';
    document.getElementById('sim-active').style.display = 'block';
    document.getElementById('sim-processing').style.display = 'none';
    document.getElementById('sim-ai-wrapper').style.display = 'none';

    // Type Human Text
    const humanDiv = document.getElementById('sim-human');
    humanDiv.innerHTML = "";
    let i = 0;

    function typeHuman() {
        if (i < data.human.length) {
            humanDiv.innerHTML += data.human.charAt(i);
            i++;
            setTimeout(typeHuman, 15);
        } else {
            // Start Processing Steps
            document.getElementById('sim-processing').style.display = 'block';
            document.getElementById('intent-tag').innerText = data.intent;

            const steps = document.querySelectorAll('.proc-step');
            steps.forEach(s => s.style.opacity = '0');

            setTimeout(() => { steps[0].style.opacity = '1'; }, 200);
            setTimeout(() => { steps[1].style.opacity = '1'; }, 600);
            setTimeout(() => { steps[2].style.opacity = '1'; }, 1100);
            setTimeout(() => {
                steps[3].style.opacity = '1';

                // Finally, Type AI Text
                setTimeout(() => {
                    document.getElementById('sim-ai-wrapper').style.display = 'block';
                    const aiDiv = document.getElementById('sim-ai');
                    aiDiv.innerHTML = "";
                    let j = 0;
                    function typeAI() {
                        if (j < data.ai.length) {
                            aiDiv.innerHTML += data.ai.charAt(j);
                            j++;
                            setTimeout(typeAI, 20);
                        }
                    }
                    typeAI();
                }, 500);

            }, 1600);
        }
    }
    typeHuman();
}

// --- CRM Autonomous Engine Simulator ---
const crmScenarios = {
    newLead: {
        title: "INBOUND LEAD (WEBHOOK)",
        steps: [
            { t: "[00ms]", a: "Webhook received from /contact-form" },
            { t: "[42ms]", a: "Extracting email domain: <span class='crm-highlight'>@acmecorp.com</span>" },
            { t: "[115ms]", a: "Querying LinkedIn API for company data..." },
            { t: "[850ms]", a: "Data enriched: 500+ employees, Series B, SaaS" },
            { t: "[920ms]", a: "Calculating Lead Score: <span class='crm-success-text'>94/100 (Tier 1)</span>" },
            { t: "[1.2s]", a: "Routing lead directly to Enterprise AE (Salesforce ID: #0093)" },
            { t: "[1.5s]", a: "Drafting personalized intro email using Claude 3.5 Sonnet..." },
            { t: "[3.1s]", a: "Email sent. Logging action to CRM timeline." }
        ]
    },
    stalledDeal: {
        title: "STALLED DEAL (CRON JOB)",
        steps: [
            { t: "[00ms]", a: "Hourly database scan initiated." },
            { t: "[34ms]", a: "Flagged: Deal #8812 ('TechNova Expansion') idle for 48h+" },
            { t: "[88ms]", a: "Checking recent comms: Last email sent Tuesday, no reply." },
            { t: "[120ms]", a: "Action determined: Send gentle text bump via Twilio API." },
            { t: "[450ms]", a: "Drafting SMS: 'Hey John, just floating this to the top...'" },
            { t: "[810ms]", a: "SMS triggered. Updating CRM stage to <span class='crm-highlight'>'Follow-up 1'</span>." },
            { t: "[1.1s]", a: "Sending Slack alert to Account Exec: 'Automated bump sent to TechNova.'" }
        ]
    },
    notInterested: {
        title: "OBJECTION REPLY (IMAP PARSE)",
        steps: [
            { t: "[00ms]", a: "New email reply detected from prospect." },
            { t: "[80ms]", a: "Running sentiment analysis. Result: <span class='crm-highlight'>Negative/Timing</span>." },
            { t: "[130ms]", a: "Extracting intent: 'Not a priority right now, maybe Q3.'" },
            { t: "[200ms]", a: "Updating CRM status from 'Active' to <span class='crm-highlight'>'Nurture - Q3'</span>." },
            { t: "[280ms]", a: "Creating automated follow-up task for July 1st." },
            { t: "[340ms]", a: "Removing prospect from active high-frequency sequence." },
            { t: "[500ms]", a: "Adding prospect to slow-drip educational newsletter." }
        ]
    }
};

function runCrmSim(type) {
    const data = crmScenarios[type];

    // Reset UI
    document.getElementById('crm-default').style.display = 'none';
    document.getElementById('crm-active').style.display = 'block';
    document.getElementById('crm-success').style.display = 'none';

    document.getElementById('crm-trigger-name').innerText = data.title;

    const stepsContainer = document.getElementById('crm-execution-steps');
    stepsContainer.innerHTML = ''; // Clear old steps

    // Generate step elements
    data.steps.forEach((step, index) => {
        const div = document.createElement('div');
        div.className = 'crm-step';
        div.id = `crm-step-${index}`;
        div.innerHTML = `<span class="crm-time">${step.t}</span><span class="crm-action">${step.a}</span>`;
        stepsContainer.appendChild(div);
    });

    // Animate steps appearing sequentially
    let delay = 0;
    data.steps.forEach((step, index) => {
        delay += 600; // 600ms between each line printing
        setTimeout(() => {
            const stepEl = document.getElementById(`crm-step-${index}`);
            if (stepEl) {
                stepEl.style.opacity = '1';
            }

            // If it's the last step, show success block shortly after
            if (index === data.steps.length - 1) {
                setTimeout(() => {
                    document.getElementById('crm-success').style.display = 'block';
                }, 800);
            }
        }, delay);
    });
}

// --- Voice AI Audio Waveform Visualizer ---
function toggleWave(element) {
    const isPlaying = element.classList.contains('playing');
    document.querySelectorAll('.audio-player').forEach(el => el.classList.remove('playing'));
    if (!isPlaying) { element.classList.add('playing'); }
}

// --- Voice AI ROI Calculator ---
const slider = document.getElementById('callVolume');
if (slider) {
    slider.addEventListener('input', function () {
        const volume = parseInt(this.value);
        document.getElementById('volumeDisplay').innerText = volume.toLocaleString() + " calls";

        // Rough agency math: Humans cost ~$5 per call (salary + overhead). AI costs ~$0.35.
        const humanCost = volume * 5;
        const aiCost = volume * 0.35;

        document.getElementById('humanCost').innerText = "$" + humanCost.toLocaleString() + "/mo";
        document.getElementById('aiCost').innerText = "$" + aiCost.toLocaleString() + "/mo";
    });
}

// --- OpenClaw Live JSON Configurator ---
let swarmConfig = {
    "pylon_deployment": {
        "client": "PENDING_AUDIT",
        "framework": "OpenClaw v2.1",
        "modules": ["core_engine"],
        "security": "standard",
        "estimated_api_cost": "$$$"
    }
};

function toggleConfig(module, element) {
    element.classList.toggle('active');
    const isActive = element.classList.contains('active');

    if (module === 'metal') {
        swarmConfig.pylon_deployment.security = isActive ? "VPC_PRIVATE_CLUSTER_ISOLATED" : "standard";
    }
    if (module === 'routing') {
        if (isActive) {
            swarmConfig.pylon_deployment.modules.push("llama_3_local_router");
            swarmConfig.pylon_deployment.estimated_api_cost = "$";
        } else {
            swarmConfig.pylon_deployment.modules = swarmConfig.pylon_deployment.modules.filter(e => e !== "llama_3_local_router");
            swarmConfig.pylon_deployment.estimated_api_cost = "$$$";
        }
    }
    if (module === 'marketing') {
        if (isActive) {
            swarmConfig.pylon_deployment.agents = ["scraper_agent", "copy_agent", "qa_agent"];
        } else {
            delete swarmConfig.pylon_deployment.agents;
        }
    }

    // Pretty print the updated JSON to the terminal
    document.getElementById('json-output').innerText = JSON.stringify(swarmConfig, null, 2);

    // Quick flash effect to show code updating
    const terminal = document.getElementById('json-output');
    terminal.style.color = "#00FFA3";
    setTimeout(() => { terminal.style.color = "#A5D6FF"; }, 200);
}

// --- CRM Page: Lead Enrichment Sandbox ---
function runEnrichment() {
    document.getElementById('enrich-waiting').style.display = 'none';
    document.getElementById('enrich-result').style.display = 'none';
    const processing = document.getElementById('enrich-processing');
    processing.style.display = 'block';

    const steps = document.querySelectorAll('.enrich-step');
    steps.forEach(s => { s.style.opacity = '0'; s.style.transform = 'translateY(10px)'; });

    // Simulate API scraping delays
    setTimeout(() => { steps[0].style.opacity = '1'; steps[0].style.transform = 'translateY(0)'; }, 300);
    setTimeout(() => { steps[1].style.opacity = '1'; steps[1].style.transform = 'translateY(0)'; }, 1100);
    setTimeout(() => { steps[2].style.opacity = '1'; steps[2].style.transform = 'translateY(0)'; }, 1800);
    setTimeout(() => { steps[3].style.opacity = '1'; steps[3].style.transform = 'translateY(0)'; }, 2400);

    // Reveal final card
    setTimeout(() => {
        processing.style.display = 'none';
        document.getElementById('enrich-result').style.display = 'block';
        gsap.from("#enrich-result", { opacity: 0, x: -20, duration: 0.5 });
    }, 3000);
}

// --- CRM Page: Payload Tracer Animation ---
function firePayload() {
    // Reset nodes
    document.querySelectorAll('.target-node').forEach(node => {
        node.classList.remove('success');
        node.querySelector('.node-status').innerText = "Awaiting Payload...";
        node.querySelector('.node-status').style.color = "var(--text-muted)";
    });

    if (typeof MotionPathPlugin !== "undefined") {
        gsap.registerPlugin(MotionPathPlugin);

        const paths = ['#path-ghl', '#path-slack', '#path-email'];
        const pulses = ['#pulse-ghl', '#pulse-slack', '#pulse-email'];
        const nodes = ['#node-ghl', '#node-slack', '#node-email'];
        const messages = ["Pipeline Updated", "Sales Team Alerted", "Email Dispatched"];

        pulses.forEach((pulse, index) => {
            gsap.set(pulse, { opacity: 1 });
            gsap.to(pulse, {
                duration: 1.2,
                ease: "power2.inOut",
                motionPath: {
                    path: paths[index],
                    align: paths[index],
                    alignOrigin: [0.5, 0.5]
                },
                onComplete: () => {
                    gsap.set(pulse, { opacity: 0 }); // Hide pulse at end
                    // Light up target node
                    const target = document.querySelector(nodes[index]);
                    target.classList.add('success');
                    target.querySelector('.node-status').innerText = messages[index];
                    target.querySelector('.node-status').style.color = "var(--electric-yellow)";
                }
            });
        });
    } else {
        // Fallback if plugin isn't loaded - just light them up sequentially
        setTimeout(() => { lightUpNode('#node-ghl', "Pipeline Updated"); }, 400);
        setTimeout(() => { lightUpNode('#node-slack', "Sales Team Alerted"); }, 800);
        setTimeout(() => { lightUpNode('#node-email', "Email Dispatched"); }, 1200);
    }
}

function lightUpNode(selector, msg) {
    const target = document.querySelector(selector);
    target.classList.add('success');
    target.querySelector('.node-status').innerText = msg;
    target.querySelector('.node-status').style.color = "var(--electric-yellow)"; // Changed from green to yellow
}