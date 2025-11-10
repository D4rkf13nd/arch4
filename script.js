const quizData = [
{
    question: "Bridging consisting of short boards fixed vertically between floor or roof joists.",
    answer: "SOLID BRIDGING"
},
    {
    question: "Bridging composed of diagonal braces set in pairs between floor or roof joists",
    answer: "CROSSBRIDGING"
    },
    {
    question: "The structural surface to which flooring or roofing is applied",
    answer: "DECK"
    },
    {
    question: "Self-supporting units of wood, metal, or concrete capable of spanning beams, joists, rafters, or purlins and serving as a base for flooring or roofing",
    answer: "DECKING"
    },
    {
    question: "Sheet steel strengthened for use as floor or roof decking by cold-rolling a series of ribs or flutes into it, and usually galvanized for corrosion resistance.",
    answer: "METAL DECKING"
    },
    {
    question: "serving as permanent formwork and tensile reinforcement for a concrete slab bonded to it by a deformed or dovetail rib pattern.",
    answer: "COMPOSITE DECKING"
    },
    {
    question: "A steel pin welded to the top flange of a steel beam or girder and embedded in a concrete slab so as to cause the beam and the concrete to act as a structural unit.",
    answer: "SHEAR STUD"
    },
    {
    question: "Metal decking manufactured by welding a corrugated steel sheet to a flat steel sheet, forming a series of raceways for electrical wires and cables.",
    answer: "CELLULAR DECKING"
    },
    {
    question: "A system of removable and interchangeable floor panels supported on adjustable pedestals or stringers to allow free access to the space beneath. Also called a raised flooring system",
    answer: "ACCESS FLOORING SYSTEM"
    },
    {
    question: "Of or pertaining to a wood or stone piece having a back face hollowed out so that it can fit more tightly against an irregular surface",
    answer: "HOLLOWED-BACKED"
    },
    {
    question: "Any of a number of wooden strips laid upon a concrete slab to provide a means of attaching a subfloor or flooring.",
    answer: "SLEEPERS"
    },
    {
    question: " Long-wearing flooring composed of solid wood blocks set in adhesive with their grain oriented vertically.",
    answer: "SOLID BLOCK FLOORING"
    },
    {
    question: "A floor composed of short strips or blocks of wood forming a pattern, sometimes with inlays of other woods or other materials",
    answer: "PARQUET"
    },
    {
    question: "Mosaic work of wood used for floors and wainscoting.",
    answer: "PARQUETRY"
    },
    {
    question: "A flooring block made by joining short lengths of strip flooring edgewise, usually tongued on two adjoining sides and grooved on the other two to ensure proper alignment in setting",
    answer: "UNIT BLOCK"
    },
    {
    question: " A flooring block made by bonding three or more wood veneers with a moisture-resistant adhesive, usually tongued on two opposing sides and grooved on the other two to ensure proper alignment in setting.",
    answer: "LAMINATED BLOCK"
    },
    {
    question: "A flooring block made by assembling narrow slats or fingers of hardwood into larger units.",
    answer: "SLAT BLOCK"
    },
    {
    question: "Laminated wood flooring made by pressure-gluing cross plies for greater dimensional stability and having a wear layer of solid, often prefinished hardwood.",
    answer: "ENGINEERED FLOORING"
    },
    {
    question: "The mixture of stone chips and cementitious or resinous matrix that produces a terrazzo surface",
    answer: "TOPPING"
    },
    {
    question: "A chemical substance applied to a substrate to create a bond between it and a succeeding layer, as between a terrazzo topping and a subfloor",
    answer: "BONDING AGENT"
    },
    {
    question: "The mortar base on which a terrazzo topping is applied.",
    answer: "UNDERBED"
    },
    {
    question: " A latex, polyester, or epoxy binder combined with stone chips to form a terrazzo topping especially resistant to chemicals and abrasion.",
    answer: "RESINOUS MATRIX"
    },
    {
    question: "A thin resinous terrazzo topping directly over a sound wood, metal, or concrete subfloor.",
    answer: "THIN-SET TERRAZZO"
    },
    {
    question: " A terrazzo topping installed directly over a rough finished concrete slab. A chemical bonding agent is used if the concrete surface is too smooth for a mechanical bond.",
    answer: "MONOLITHIC TERRAZZO"
    },
    {
    question: "A terrazzo topping installed over a mortar underbed that is bonded to a rough-finished concrete slab.",
    answer: "BONDING TERRAZZO"
    },
    {
    question: "A terrazzo system for controlling cracking when structural movement is expected, consisting of a terrazzo topping installed over a reinforced mortar underbed that is separated from the subfloor by an isolation membrane and a thin layer of sand.",
    answer: "SAND-CUSHION TERRAZZO"
    }
];
let quizOrder = [];
let currentAnswers = [];
let currentQuestion = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createQuiz() {
    // If quizOrder is not set, initialize and shuffle
    if (!quizOrder.length) {
        quizOrder = Array.from({length: quizData.length}, (_, i) => i);
        shuffleArray(quizOrder);
    }
    if (!currentAnswers.length || currentAnswers.length !== quizData.length) {
        currentAnswers = new Array(quizData.length).fill("");
    }
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    quizOrder.forEach((qIdx, index) => {
        const question = quizData[qIdx];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        if (index === 0) questionDiv.classList.add('active');

        questionDiv.innerHTML = `
            <div class="question">${index + 1}. ${question.question}</div>
            <div class="identification-input" style="display:flex;gap:8px;align-items:center;">
                <input type="text" id="input-${index}" data-q="${index}" autocomplete="off" placeholder="Type your answer..." value="${currentAnswers[index] || ''}" oninput="handleInput(${index})" />
                <button type="button" class="send-btn" id="send-${index}" onclick="sendAnswer(${index})" aria-label="Send answer" style="background:none;border:none;cursor:pointer;padding:0 6px;display:flex;align-items:center;">
                  <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='none' viewBox='0 0 24 24'><path fill='var(--accent)' d='M2.01 21 23 12 2.01 3 2 10l15 2-15 2z'/></svg>
                </button>
            </div>
            <div class="feedback" id="feedback-${index}" aria-live="polite"></div>
        `;
        quizContainer.appendChild(questionDiv);
    });
    // Restore any previous answers (when resetting or revisiting)
    quizOrder.forEach((qIdx, index) => {
        if (currentAnswers[index] && currentAnswers[index] !== "") {
            const input = document.getElementById(`input-${index}`);
            if (input) input.value = currentAnswers[index];
        }
    });
    // Hide score page if visible
    const scorePage = document.getElementById('scorePage');
    if (scorePage) scorePage.style.display = 'none';
    updateNavigation();
}

// For identification: handle input and update answer
function handleInput(questionIndex) {
    const input = document.getElementById(`input-${questionIndex}`);
    currentAnswers[questionIndex] = input.value;
    // Remove feedback and enable input until send is pressed
    const feedbackEl = document.getElementById(`feedback-${questionIndex}`);
    feedbackEl.textContent = '';
    input.classList.remove('correct', 'wrong');
    updateNavigation();
}

function sendAnswer(questionIndex) {
    const input = document.getElementById(`input-${questionIndex}`);
    const feedbackEl = document.getElementById(`feedback-${questionIndex}`);
    const qIdx = quizOrder[questionIndex];
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = quizData[qIdx].answer.trim().toLowerCase();
    if (userAnswer !== "") {
        input.disabled = true;
        if (userAnswer === correctAnswer) {
            feedbackEl.textContent = 'Correct!';
            feedbackEl.style.color = '#2e7d32';
            input.classList.add('correct');
        } else {
            feedbackEl.textContent = `Incorrect. Correct answer: ${quizData[qIdx].answer}`;
            feedbackEl.style.color = '#c62828';
            input.classList.add('wrong');
        }
        setTimeout(() => {
            if (questionIndex < quizData.length - 1) {
                const questions = document.querySelectorAll('.question-container');
                questions[questionIndex].classList.remove('active');
                currentQuestion = questionIndex + 1;
                questions[currentQuestion].classList.add('active');
                updateNavigation();
                // Focus the next input if not already answered
                const nextInput = document.getElementById(`input-${currentQuestion}`);
                if (nextInput && !nextInput.disabled) nextInput.focus();
            }
            // Always update navigation after answer, so submit button logic is correct
            updateNavigation();
        }, 500);
    } else {
        feedbackEl.textContent = '';
        updateNavigation();
    }
}

function checkAnswers() {
    let score = 0;
    const questions = document.querySelectorAll('.question-container');

    questions.forEach((question, index) => {
        const input = question.querySelector('input[type="text"]');
        const userAnswer = (input ? input.value.trim().toLowerCase() : "");
        const qIdx = quizOrder[index];
        const correctAnswer = quizData[qIdx].answer.trim().toLowerCase();
        input.disabled = true;
        const feedbackEl = document.getElementById(`feedback-${index}`);
        if (userAnswer === correctAnswer) {
            score++;
            feedbackEl.textContent = 'Correct!';
            feedbackEl.style.color = '#2e7d32';
        } else {
            feedbackEl.textContent = `Incorrect. Correct answer: ${quizData[qIdx].answer}`;
            feedbackEl.style.color = '#c62828';
        }
    });

    // Hide all questions
    questions.forEach(q => q.style.display = 'none');

    // Show score page
    let scorePage = document.getElementById('scorePage');
    if (!scorePage) {
        scorePage = document.createElement('div');
        scorePage.id = 'scorePage';
        scorePage.className = 'score-page';
        document.getElementById('quiz').appendChild(scorePage);
    }
    scorePage.style.display = 'flex';

    const percentage = (score / quizData.length) * 100;
    scorePage.style.backgroundColor = percentage >= 70 ? '#c8e6c9' : '#ffcdd2';
    let extraMsg = '';
    if (percentage === 100) {
        extraMsg = 'iloveyoumoree baby koo galing galing talaga';
    } else if (percentage > 80) {
        extraMsg = 'kunti nalang ma perfect mo po yan baby ko';
    } else if (percentage >= 75) {
        extraMsg = 'galing naman ng baby kooo';
    } else if (percentage >= 50) {
        extraMsg = 'kaya mo yan baby';
    }
    scorePage.innerHTML = `<div style="font-weight:700;font-size:1.2rem;margin-bottom:8px;">Your score: ${score}/${quizData.length} (${percentage.toFixed(2)}%)</div>`
        + (extraMsg ? `<div class="encouragement">${extraMsg}</div>` : '')
        + `<button class="retry-btn" onclick="resetQuiz()" style="margin-top:18px;display:inline-block;">Try Again</button>`;

    // Hide navigation
    document.querySelector('.submit-btn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('prevBtn').style.display = 'none';
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        const questions = document.querySelectorAll('.question-container');
        questions[currentQuestion].classList.remove('active');
        currentQuestion++;
        questions[currentQuestion].classList.add('active');
        updateNavigation();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        const questions = document.querySelectorAll('.question-container');
        questions[currentQuestion].classList.remove('active');
        currentQuestion--;
        questions[currentQuestion].classList.add('active');
        updateNavigation();
    }
}


function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.querySelector('.submit-btn');
    const counter = document.getElementById('questionCounter');
    const progress = document.getElementById('progress');

    prevBtn.disabled = currentQuestion === 0;

    // Only show submit button on last question and if answered or last input is disabled (already answered)
    let showSubmit = false;
    let enableSubmit = false;
    if (currentQuestion === quizData.length - 1) {
        const lastInput = document.getElementById(`input-${currentQuestion}`);
        if (lastInput) {
            showSubmit = true;
            enableSubmit = (lastInput.value.trim() !== "") || lastInput.disabled;
        }
    }
    if (showSubmit) {
        submitBtn.style.display = 'block';
        submitBtn.disabled = !enableSubmit;
    } else {
        submitBtn.style.display = 'none';
    }

    counter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    progress.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    // Hide next button if present
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.style.display = 'none';
    prevBtn.style.display = 'block';
}

function resetQuiz() {
    // Shuffle question order for new try
    quizOrder = Array.from({length: quizData.length}, (_, i) => i);
    shuffleArray(quizOrder);
    currentAnswers = new Array(quizData.length).fill("");
    currentQuestion = 0;
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    createQuiz();

    // Hide score page if present
    const scorePage = document.getElementById('scorePage');
    if (scorePage) scorePage.style.display = 'none';

    document.querySelector('.submit-btn').style.display = 'none';
    // Hide all retry buttons except the one on score page
    document.querySelectorAll('.retry-btn').forEach(btn => btn.style.display = 'none');
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('prevBtn').style.display = 'block';
    updateNavigation();
}

// Initialize the quiz when the page loads
window.onload = function() {
    quizOrder = Array.from({length: quizData.length}, (_, i) => i);
    shuffleArray(quizOrder);
    currentAnswers = new Array(quizData.length).fill("");
    createQuiz();
};
