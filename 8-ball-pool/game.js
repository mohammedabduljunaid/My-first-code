// 8 Ball Pool Game
const canvas = document.getElementById('poolTable');
const ctx = canvas.getContext('2d');

// Game Constants
const BALL_RADIUS = 8;
const POCKET_RADIUS = 12;
const FRICTION = 0.985;
const TABLE_WIDTH = canvas.width;
const TABLE_HEIGHT = canvas.height;
const WALL_OFFSET = 40;
const PLAYABLE_WIDTH = TABLE_WIDTH - 2 * WALL_OFFSET;
const PLAYABLE_HEIGHT = TABLE_HEIGHT - 2 * WALL_OFFSET;

// Ball class
class Ball {
    constructor(x, y, number = 0) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.number = number;
        this.radius = BALL_RADIUS;
        this.pocketed = false;
    }

    draw() {
        if (this.pocketed) return;

        ctx.save();
        ctx.fillStyle = this.getColor();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw stripe or number
        if (this.number > 0) {
            ctx.fillStyle = 'white';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.number, this.x, this.y);

            if (this.number > 8) {
                ctx.strokeStyle = this.getColor();
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius - 2, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        ctx.restore();
    }

    getColor() {
        if (this.number === 0) return 'white';
        if (this.number === 8) return 'black';
        if (this.number <= 7) return '#FFCC00'; // Solids - Yellow
        return '#FFFFFF'; // Stripes - White with stripes
    }

    update() {
        if (this.pocketed) return;

        this.x += this.vx;
        this.y += this.vy;

        // Apply friction
        this.vx *= FRICTION;
        this.vy *= FRICTION;

        // Stop ball if velocity is very small
        if (Math.abs(this.vx) < 0.1) this.vx = 0;
        if (Math.abs(this.vy) < 0.1) this.vy = 0;

        // Wall collisions
        this.wallCollisions();
    }

    wallCollisions() {
        // Top and bottom walls
        if (this.y - this.radius < WALL_OFFSET) {
            this.y = WALL_OFFSET + this.radius;
            this.vy = -this.vy * 0.8;
        }
        if (this.y + this.radius > TABLE_HEIGHT - WALL_OFFSET) {
            this.y = TABLE_HEIGHT - WALL_OFFSET - this.radius;
            this.vy = -this.vy * 0.8;
        }

        // Left and right walls
        if (this.x - this.radius < WALL_OFFSET) {
            this.x = WALL_OFFSET + this.radius;
            this.vx = -this.vx * 0.8;
        }
        if (this.x + this.radius > TABLE_WIDTH - WALL_OFFSET) {
            this.x = TABLE_WIDTH - WALL_OFFSET - this.radius;
            this.vx = -this.vx * 0.8;
        }
    }

    isMoving() {
        return Math.abs(this.vx) > 0.1 || Math.abs(this.vy) > 0.1;
    }
}

// Game state
let balls = [];
let cueBall = null;
let selectedBall = null;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let playerType = null; // 'solid' or 'stripe'
let gameOver = false;
let shotCount = 0;
let message = '';

// Initialize game
function initGame() {
    balls = [];
    gameOver = false;
    shotCount = 0;
    playerType = null;
    message = '';
    updateMessage('Game Started! Click the cue ball and drag to shoot.', 'info');

    // Create cue ball
    cueBall = new Ball(TABLE_WIDTH / 4, TABLE_HEIGHT / 2, 0);
    balls.push(cueBall);

    // Create other balls in triangle formation
    const startX = (TABLE_WIDTH * 2) / 3;
    const startY = TABLE_HEIGHT / 2;
    const spacing = BALL_RADIUS * 2.2;

    let ballNumber = 1;
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col <= row; col++) {
            const x = startX + row * spacing;
            const y = startY + (col - row / 2) * spacing;
            balls.push(new Ball(x, y, ballNumber));
            ballNumber++;
        }
    }

    updateStats();
    draw();
}

// Handle mouse down
canvas.addEventListener('mousedown', (e) => {
    if (gameOver) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if cue ball is clicked
    const dist = Math.sqrt((x - cueBall.x) ** 2 + (y - cueBall.y) ** 2);
    if (dist < cueBall.radius * 3) {
        selectedBall = cueBall;
        isDragging = true;
        dragStartX = x;
        dragStartY = y;
    }
});

// Handle mouse move
canvas.addEventListener('mousemove', (e) => {
    if (!isDragging || !selectedBall) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Preview the shot
    canvas.style.cursor = 'grabbing';
});

// Handle mouse up
canvas.addEventListener('mouseup', (e) => {
    if (!isDragging || !selectedBall) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate power and direction
    const power = Math.sqrt((dragStartX - x) ** 2 + (dragStartY - y) ** 2);
    const angle = Math.atan2(dragStartY - y, dragStartX - x);

    // Apply velocity to cue ball
    const maxPower = 15;
    const velocity = Math.min(power / 30, maxPower);
    selectedBall.vx = velocity * Math.cos(angle);
    selectedBall.vy = velocity * Math.sin(angle);

    isDragging = false;
    selectedBall = null;
    shotCount++;
    updateStats();
    canvas.style.cursor = 'crosshair';
});

// Check pockets
function checkPockets() {
    const pockets = [
        { x: WALL_OFFSET, y: WALL_OFFSET },
        { x: TABLE_WIDTH / 2, y: WALL_OFFSET },
        { x: TABLE_WIDTH - WALL_OFFSET, y: WALL_OFFSET },
        { x: WALL_OFFSET, y: TABLE_HEIGHT - WALL_OFFSET },
        { x: TABLE_WIDTH / 2, y: TABLE_HEIGHT - WALL_OFFSET },
        { x: TABLE_WIDTH - WALL_OFFSET, y: TABLE_HEIGHT - WALL_OFFSET },
    ];

    balls.forEach((ball) => {
        if (ball.pocketed) return;

        pockets.forEach((pocket) => {
            const dist = Math.sqrt((ball.x - pocket.x) ** 2 + (ball.y - pocket.y) ** 2);
            if (dist < POCKET_RADIUS) {
                ball.pocketed = true;

                if (ball.number === 0) {
                    // Cue ball pocketed - scratch
                    updateMessage('Scratch! Cue ball pocketed. Shot over.', 'error');
                    cueBall.x = TABLE_WIDTH / 4;
                    cueBall.y = TABLE_HEIGHT / 2;
                    cueBall.vx = 0;
                    cueBall.vy = 0;
                    ball.pocketed = false;
                } else if (ball.number === 8) {
                    if (playerType === null) {
                        updateMessage('You pocketed the 8 ball too early!', 'error');
                    } else {
                        updateMessage('🎉 You won! You pocketed the 8 ball!', 'success');
                        gameOver = true;
                    }
                } else {
                    if (playerType === null) {
                        playerType = ball.number <= 7 ? 'solid' : 'stripe';
                        updateMessage(`Player is ${playerType}s!`, 'info');
                    }
                }
            }
        });
    });
}

// Collision detection
function checkCollisions() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const b1 = balls[i];
            const b2 = balls[j];

            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < b1.radius + b2.radius) {
                // Collision detected
                const angle = Math.atan2(dy, dx);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);

                // Rotate velocities
                const vx1 = b1.vx * cos + b1.vy * sin;
                const vy1 = b1.vy * cos - b1.vx * sin;
                const vx2 = b2.vx * cos + b2.vy * sin;
                const vy2 = b2.vy * cos - b2.vx * sin;

                // Swap velocities (elastic collision)
                const temp = vx1;
                b1.vx = (vx2 * cos - vy1 * sin) * 0.9;
                b1.vy = (vy1 * cos + vx2 * sin) * 0.9;
                b2.vx = (temp * cos - vy2 * sin) * 0.9;
                b2.vy = (vy2 * cos + temp * sin) * 0.9;

                // Separate balls
                const overlap = (b1.radius + b2.radius - dist) / 2;
                b1.x -= overlap * cos;
                b1.y -= overlap * sin;
                b2.x += overlap * cos;
                b2.y += overlap * sin;
            }
        }
    }
}

// Draw table
function drawTable() {
    // Green felt
    ctx.fillStyle = '#0a5c0a';
    ctx.fillRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT);

    // Dark borders
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, TABLE_WIDTH, WALL_OFFSET);
    ctx.fillRect(0, TABLE_HEIGHT - WALL_OFFSET, TABLE_WIDTH, WALL_OFFSET);
    ctx.fillRect(0, 0, WALL_OFFSET, TABLE_HEIGHT);
    ctx.fillRect(TABLE_WIDTH - WALL_OFFSET, 0, WALL_OFFSET, TABLE_HEIGHT);

    // Draw pockets
    const pockets = [
        { x: WALL_OFFSET, y: WALL_OFFSET },
        { x: TABLE_WIDTH / 2, y: WALL_OFFSET },
        { x: TABLE_WIDTH - WALL_OFFSET, y: WALL_OFFSET },
        { x: WALL_OFFSET, y: TABLE_HEIGHT - WALL_OFFSET },
        { x: TABLE_WIDTH / 2, y: TABLE_HEIGHT - WALL_OFFSET },
        { x: TABLE_WIDTH - WALL_OFFSET, y: TABLE_HEIGHT - WALL_OFFSET },
    ];

    ctx.fillStyle = '#000';
    pockets.forEach((pocket) => {
        ctx.beginPath();
        ctx.arc(pocket.x, pocket.y, POCKET_RADIUS, 0, Math.PI * 2);
        ctx.fill();
    });

    // Center line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(WALL_OFFSET, TABLE_HEIGHT / 2);
    ctx.lineTo(TABLE_WIDTH - WALL_OFFSET, TABLE_HEIGHT / 2);
    ctx.stroke();
    ctx.setLineDash([]);
}

// Draw cue
function drawCue() {
    if (!isDragging || !selectedBall) return;

    const rect = canvas.getBoundingClientRect();
    const dx = dragStartX - selectedBall.x;
    const dy = dragStartY - selectedBall.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const cueLength = 150;
    const startX = selectedBall.x - Math.cos(angle) * cueLength;
    const startY = selectedBall.y - Math.sin(angle) * cueLength;

    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(selectedBall.x, selectedBall.y);
    ctx.stroke();
}

// Main game loop
function update() {
    balls.forEach((ball) => ball.update());
    checkCollisions();
    checkPockets();
    draw();
    requestAnimationFrame(update);
}

function draw() {
    drawTable();

    // Draw balls
    balls.forEach((ball) => ball.draw());

    // Draw cue
    drawCue();
}

// Update UI
function updateStats() {
    document.getElementById('shotCount').textContent = shotCount;
    document.getElementById('playerType').textContent = playerType ? playerType.toUpperCase() : 'Undecided';
    const pocketedCount = balls.filter((b) => b.pocketed && b.number !== 0).length;
    document.getElementById('ballsPocketed').textContent = pocketedCount;
}

function updateMessage(text, type) {
    message = text;
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
}

// Event listeners
document.getElementById('newGameBtn').addEventListener('click', initGame);
document.getElementById('resetBtn').addEventListener('click', () => {
    balls.forEach((b) => {
        if (b.number === 0) {
            b.x = TABLE_WIDTH / 4;
            b.y = TABLE_HEIGHT / 2;
        }
        b.vx = 0;
        b.vy = 0;
        b.pocketed = false;
    });
    updateMessage('Table reset!', 'info');
});

// Start the game
initGame();
update();