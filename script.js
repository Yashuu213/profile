/* 
  YASH SHARMA: LIQUID INTELLIGENCE ENGINE (EVOLVED)
  Neural Network / Constellation Swarm System
*/

new p5((p) => {
    let nodes = [];
    const skillsList = ['PYTHON', 'SQL', 'JAVASCRIPT', 'TENSORFLOW', 'KERAS', 'YOLO', 'BERT', 'SHAP', 'LANGCHAIN', 'OPENCV', 'PANDAS', 'FASTAPI', 'FLASK', 'DOCKER', 'MONGODB', 'LABVIEW', 'RAG', 'XAI', 'NLP', 'VISION', 'GEN-AI'];

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('p5-canvas');
        p.textFont('JetBrains Mono');

        // Initialize Skill Nodes
        for (let i = 0; i < skillsList.length; i++) {
            nodes.push(new SkillNode(p, skillsList[i]));
        }
    };

    p.draw = () => {
        p.clear();

        // Draw Connections First
        p.strokeWeight(1);
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                let d = p.dist(nodes[i].pos.x, nodes[i].pos.y, nodes[j].pos.x, nodes[j].pos.y);
                if (d < 200) {
                    let alpha = p.map(d, 0, 200, 100, 0);
                    p.stroke(255, 62, 0, alpha); // Accent color connections
                    p.line(nodes[i].pos.x, nodes[i].pos.y, nodes[j].pos.x, nodes[j].pos.y);
                }
            }
        }

        // Update and Display Nodes
        nodes.forEach(node => {
            node.update();
            node.display();
        });
    };

    p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);

    class SkillNode {
        constructor(p, label) {
            this.p = p;
            this.label = label;
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p.createVector(p.random(-0.5, 0.5), p.random(-0.5, 0.5));
            this.baseSize = 4;
            this.isIndigo = p.random() > 0.5;
        }

        update() {
            // Mouse Interaction
            let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
            let distToMouse = p5.Vector.dist(mouse, this.pos);

            if (distToMouse < 250) {
                let force = p5.Vector.sub(this.pos, mouse);
                force.setMag(0.5);
                this.vel.add(force);
            }

            this.pos.add(this.vel);
            this.vel.limit(1.2);

            // Boundary Check (Smooth Wrap)
            if (this.pos.x < 0) this.pos.x = this.p.width;
            if (this.pos.x > this.p.width) this.pos.x = 0;
            if (this.pos.y < 0) this.pos.y = this.p.height;
            if (this.pos.y > this.p.height) this.pos.y = 0;
        }

        display() {
            let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
            let d = p5.Vector.dist(mouse, this.pos);

            // Core Node
            this.p.noStroke();
            let color = this.isIndigo ? this.p.color(112, 0, 255) : this.p.color(255, 62, 0);

            if (d < 150) {
                // Expanded State
                this.p.fill(color);
                this.p.circle(this.pos.x, this.pos.y, 8);

                // Glow
                this.p.fill(this.isIndigo ? 112 : 255, this.isIndigo ? 0 : 62, this.isIndigo ? 255 : 0, 50);
                this.p.circle(this.pos.x, this.pos.y, 25);

                // Text Label
                this.p.fill(255);
                this.p.textSize(12);
                this.p.textAlign(this.p.CENTER);
                this.p.textStyle(this.p.BOLD);
                this.p.text(this.label, this.pos.x, this.pos.y - 20);
            } else {
                // Subtle State
                this.p.fill(color, 150);
                this.p.circle(this.pos.x, this.pos.y, this.baseSize);
            }
        }
    }
});

// --- ECharts Radar Chart ---
function initRadarChart() {
    const chartDom = document.getElementById('skills-radar');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom, 'dark');

    const option = {
        radar: {
            indicator: [
                { name: 'Languages', max: 100 },
                { name: 'ML / DL', max: 100 },
                { name: 'Data & Viz', max: 100 },
                { name: 'Web & APIs', max: 100 },
                { name: 'DevOps', max: 100 },
                { name: 'Concepts', max: 100 }
            ],
            shape: 'circle',
            splitNumber: 5,
            axisName: { color: '#888', fontStyle: 'italic', fontSize: 10 },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
            splitArea: { show: false },
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
        },
        series: [{
            type: 'radar',
            data: [{
                value: [90, 95, 88, 85, 82, 92],
                name: 'Yash Sharma',
                lineStyle: { color: '#ff3e00', width: 2 },
                areaStyle: { color: 'rgba(255, 62, 0, 0.2)' },
                symbol: 'none'
            }]
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

// --- Dynamic Project Loader ---
async function loadProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    try {
        const response = await fetch('projects.json');
        const projects = await response.json();

        grid.innerHTML = projects.map(p => `
            <div class="project-box glass-card" style="height: auto; display: flex; flex-direction: column; padding: 0; overflow: hidden; border-radius: 24px;">
                <!-- Image Section -->
                <div style="height: 280px; width: 100%; overflow: hidden; position: relative; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <img src="${p.image.includes('gradient') ? 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' : p.image}" 
                         style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s;">
                    <div style="position: absolute; top: 1rem; right: 1rem; display: flex; gap: 0.5rem;">
                        ${p.badge ? `<span style="background: var(--accent); color: white; font-size: 0.6rem; padding: 0.3rem 0.7rem; border-radius: 4px; font-weight: 800; text-transform: uppercase;">${p.badge}</span>` : ''}
                    </div>
                    <div style="position: absolute; bottom: 1rem; left: 1.5rem; font-family: var(--font-mono); color: var(--accent); font-size: 0.7rem; letter-spacing: 0.2em; font-weight: 700; background: rgba(0,0,0,0.7); padding: 0.2rem 0.6rem; border-radius: 4px; backdrop-filter: blur(4px);">
                        ${p.category.toUpperCase()}
                    </div>
                </div>

                <!-- Content Section -->
                <div style="padding: 2rem; background: rgba(255,255,255,0.02); display: flex; flex-direction: column; flex-grow: 1;">
                    <h2 style="font-size: 2rem; margin: 0 0 1rem 0; color: #fff; font-family: var(--font-hero); line-height: 1.1;">${p.title}</h2>
                    <p style="font-size: 0.9rem; margin-bottom: 1.5rem; color: rgba(255,255,255,0.6); line-height: 1.6;">${p.description}</p>
                    
                    <div style="margin-bottom: 1.5rem; background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="font-size: 0.7rem; font-weight: 800; color: var(--accent); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Technical Architecture</div>
                        <ul style="list-style: none; font-size: 0.85rem; color: #aaa; display: flex; flex-direction: column; gap: 0.5rem;">
                            ${(p.details.features || []).slice(0, 3).map(f => `<li style="display: flex; align-items: center; gap: 0.6rem;"><span style="color: var(--accent); font-weight: bold;">•</span> ${f}</li>`).join('')}
                        </ul>
                    </div>

                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
                        ${p.tags.map(tag => `<span style="font-size: 0.6rem; background: rgba(255,255,255,0.05); padding: 0.3rem 0.7rem; border-radius: 4px; color: #888; border: 1px solid rgba(255,255,255,0.1);">${tag}</span>`).join('')}
                    </div>

                    <div style="display: flex; gap: 1rem; margin-top: auto;">
                        ${p.links.demo !== '#' ? `<a href="${p.links.demo}" target="_blank" style="flex: 1; background: var(--accent); color: white; padding: 0.9rem; border-radius: 8px; font-weight: 800; text-decoration: none; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">Live Demo <i data-lucide="external-link" style="width: 14px;"></i></a>` : ''}
                        <a href="${p.links.code}" target="_blank" style="flex: 1; background: rgba(255,255,255,0.1); color: white; padding: 0.9rem; border-radius: 8px; font-weight: 800; text-decoration: none; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; border: 1px solid rgba(255,255,255,0.1);">Source Code <i data-lucide="github" style="width: 14px;"></i></a>
                    </div>
                </div>
            </div>
        `).join('');

        ScrollTrigger.refresh();
        lucide.createIcons();
    } catch (e) {
        console.error("Project load failed", e);
    }
}

// --- GSAP & Cursor ---
function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.glass-card').forEach(card => {
        gsap.from(card, {
            y: 50, opacity: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" }
        });
    });
}

function initCursor() {
    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" });
    });
}

window.onload = () => {
    initRadarChart();
    loadProjects();
    initGSAP();
    initCursor();
};
