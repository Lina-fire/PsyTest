const questions = [
    // Шкала экстраверсии-интроверсии (E)
    { text: "Вы обычно оживлены и активны в компании?", dimension: "E", positive: true },
    { text: "Вы часто чувствуете необходимость в острых ощущениях?", dimension: "E", positive: true },
    { text: "Вы предпочитаете книги общению с людьми?", dimension: "E", positive: false },
    { text: "Вы легко заводите новых друзей?", dimension: "E", positive: true },
    { text: "Вы обычно молчаливы и сдержанны в компании?", dimension: "E", positive: false },
    { text: "Вы любите шумные и веселые вечеринки?", dimension: "E", positive: true },
    { text: "Вы предпочитаете работать в одиночку?", dimension: "E", positive: false },
    { text: "Вы часто инициируете разговоры с незнакомцами?", dimension: "E", positive: true },

    // Шкала нейротизма-стабильности (N)
    { text: "Ваше настроение часто меняется?", dimension: "N", positive: true },
    { text: "Вы часто чувствуете себя несчастным без особой причины?", dimension: "N", positive: true },
    { text: "Вы часто испытываете чувство тревоги?", dimension: "N", positive: true },
    { text: "Вы легко расстраиваетесь?", dimension: "N", positive: true },
    { text: "Вы часто чувствуете себя уставшим без причины?", dimension: "N", positive: true },
    { text: "Вы обычно спокойны и хладнокровны?", dimension: "N", positive: false },
    { text: "Вы легко поддаетесь панике?", dimension: "N", positive: true },
    { text: "Вы часто беспокоитесь о будущем?", dimension: "N", positive: true },

    // Шкала психотизма (P)
    { text: "Вы легко прощаете обиды?", dimension: "P", positive: false },
    { text: "Вы часто критикуете других?", dimension: "P", positive: true },
    { text: "Вы считаете себя обидчивым человеком?", dimension: "P", positive: true },
    { text: "Вы обычно уступаете в спорах?", dimension: "P", positive: false },
    { text: "Вы часто чувствуете себя одиноким?", dimension: "P", positive: true },
    { text: "Вы легко приспосабливаетесь к новым условиям?", dimension: "P", positive: false },
    { text: "Вы часто испытываете чувство вины?", dimension: "P", positive: true }
];

const temperamentData = {
    "Сангвиник": {
        color: "#ff6b6b",
        strengths: [
            "Отличные коммуникативные навыки",
            "Быстрая адаптация к изменениям",
            "Оптимизм и позитивное мышление",
            "Энтузиазм и энергия",
            "Легкость в установлении контактов"
        ],
        recommendations: [
            "Развивайте усидчивость и концентрацию",
            "Учитесь доводить дела до конца",
            "Практикуйте планирование времени",
            "Развивайте глубину в отношениях"
        ],
        professions: [
            "Менеджер по продажам",
            "PR-специалист",
            "Ведущий мероприятий",
            "Журналист",
            "Тренер"
        ],
        pdfUrl: "./sangvinik.pdf"
    },
    "Холерик": {
        color: "#ffa726",
        strengths: [
            "Лидерские качества",
            "Решительность и целеустремленность",
            "Высокая работоспособность",
            "Стратегическое мышление",
            "Организаторские способности"
        ],
        recommendations: [
            "Учитесь контролировать эмоции",
            "Развивайте эмпатию и терпимость",
            "Практикуйте активное слушание",
            "Давайте обратную связь мягче"
        ],
        professions: [
            "Руководитель проекта",
            "Предприниматель",
            "Военный",
            "Спортсмен",
            "Политик"
        ],
        pdfUrl: "./holerik.pdf"
    },
    "Флегматик": {
        color: "#66bb6a",
        strengths: [
            "Невероятная надежность",
            "Хладнокровие в стрессовых ситуациях",
            "Терпение и выдержка",
            "Способность к глубокой концентрации",
            "Дипломатические навыки"
        ],
        recommendations: [
            "Развивайте инициативность",
            "Учитесь быстрее адаптироваться",
            "Практикуйте принятие решений",
            "Будьте более спонтанными"
        ],
        professions: [
            "Аналитик",
            "Бухгалтер",
            "Системный администратор",
            "Научный сотрудник",
            "Архивариус"
        ],
        pdfUrl: "./flegmatik.pdf"
    },
    "Меланхолик": {
        color: "#42a5f5",
        strengths: [
            "Глубокое аналитическое мышление",
            "Внимание к деталям",
            "Творческий потенциал",
            "Высокая эмпатия",
            "Способность к перфекционизму"
        ],
        recommendations: [
            "Работайте над уверенностью в себе",
            "Учитесь делегировать задачи",
            "Практикуйте позитивное мышление",
            "Развивайте стрессоустойчивость"
        ],
        professions: [
            "Художник",
            "Писатель",
            "Дизайнер",
            "Исследователь",
            "Психолог"
        ],
        pdfUrl: "./melanholik.pdf"
    }
};

let currentQuestionIndex = 0;
let answers = new Array(questions.length).fill(null);
let hasError = false;
let isLoading = false;
let currentResult = null;

let questionsContainer, testContent, resultContent;
let currentQuestionElement, answeredCountElement, progressPercentElement, progressFillElement;
let prevButton, nextButton, finishButton;
let progressContainer;

function initializeTest() {
    console.log("Инициализация теста...");

    const testContentEl = document.getElementById('test-content');
    const resultContentEl = document.getElementById('result-content');
    const questionsContainerEl = document.getElementById('questions-container');
    
    questionsContainer = questionsContainerEl;
    testContent = testContentEl;
    resultContent = resultContentEl;
    
    if (!questionsContainer || !testContent || !resultContent) {
        console.error("Не найдены необходимые DOM элементы");
        setTimeout(() => {
            const body = document.body;
            if (body) {
                body.innerHTML = `
                    <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
                        <h2 style="color: #ff6b6b;">Ошибка загрузки теста</h2>
                        <p>Не удалось загрузить элементы теста. Пожалуйста, обновите страницу.</p>
                        <button onclick="location.reload()" style="
                            background: #8b5cf6; 
                            color: white; 
                            border: none; 
                            padding: 10px 20px; 
                            border-radius: 5px; 
                            cursor: pointer;
                            margin-top: 20px;
                        ">
                            Обновить страницу
                        </button>
                    </div>
                `;
            }
        }, 100);
        return;
    }

    currentQuestionElement = document.getElementById('current-question');
    answeredCountElement = document.getElementById('answered-count');
    progressPercentElement = document.getElementById('progress-percent');
    progressFillElement = document.getElementById('progress-fill');
    prevButton = document.getElementById('prev-btn');
    nextButton = document.getElementById('next-btn');
    finishButton = document.getElementById('finish-btn');
    progressContainer = document.querySelector('.progress-container');
    
    testContent.classList.remove('hidden');
    resultContent.classList.add('hidden');

    showQuestion(currentQuestionIndex);
    updateProgress();
    updateNavigation();
    createStars();
    
    if (prevButton) prevButton.addEventListener('click', prevQuestion);
    if (nextButton) nextButton.addEventListener('click', nextQuestion);
    if (finishButton) finishButton.addEventListener('click', finishTest);
    
    document.addEventListener('keydown', handleKeyPress);
    
    console.log("Тест успешно инициализирован!");
}

function showQuestion(index) {
    currentQuestionIndex = index;
    const question = questions[index];
    
    removeError();

    const questionHTML = `
        <div class="question-card" id="question-card-${index}">
            <div class="question-number">Вопрос ${index + 1} из ${questions.length}</div>
            <h3 class="question-text">${question.text}</h3>
            <div class="options-container">
                <label class="option-label ${answers[index] === true ? 'selected' : ''} ${hasError && answers[index] === null ? 'error' : ''}">
                    <input type="radio" name="q${index}" value="true" class="option-radio"
                           ${answers[index] === true ? 'checked' : ''}
                           onchange="setAnswer(${index}, true)">
                    <span class="option-text">Да</span>
                </label>
                <label class="option-label ${answers[index] === false ? 'selected' : ''} ${hasError && answers[index] === null ? 'error' : ''}">
                    <input type="radio" name="q${index}" value="false" class="option-radio"
                           ${answers[index] === false ? 'checked' : ''}
                           onchange="setAnswer(${index}, false)">
                    <span class="option-text">Нет</span>
                </label>
            </div>
            <div class="error-message" id="error-${index}">
                <i class="bi bi-exclamation-circle"></i> Пожалуйста, выберите ответ на этот вопрос
            </div>
        </div>
    `;

    if (questionsContainer) {
        questionsContainer.innerHTML = questionHTML;
    }
    
    if (currentQuestionElement) {
        currentQuestionElement.textContent = index + 1;
    }
    
    updateProgress();
    updateNavigation();
    
    if (hasError && answers[currentQuestionIndex] === null) {
        showError();
    }
}

function setAnswer(index, value) {
    if (index >= 0 && index < questions.length) {
        answers[index] = value;
        
        removeError();

        const labels = document.querySelectorAll(`input[name="q${index}"]`);
        labels.forEach(input => {
            const label = input.parentElement;
            if (input.checked) {
                label.classList.add('selected');
                label.classList.remove('error');
            } else {
                label.classList.remove('selected');
            }
        });

        updateNavigation();
        updateProgress();
    }
}

function nextQuestion() {
    if (answers[currentQuestionIndex] === null) {
        showError();
        return;
    }
    
    hasError = false;
    
    if (currentQuestionIndex < questions.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    }
}

function prevQuestion() {
    removeError();
    
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

function showError() {
    hasError = true;
    
    const questionCard = document.getElementById(`question-card-${currentQuestionIndex}`);
    if (questionCard) {
        questionCard.classList.add('error');
        
        setTimeout(() => {
            questionCard.classList.remove('error');
            setTimeout(() => {
                questionCard.classList.add('error');
            }, 50);
        }, 50);
    }
    
    const labels = document.querySelectorAll(`input[name="q${currentQuestionIndex}"]`);
    labels.forEach(input => {
        const label = input.parentElement;
        if (!input.checked) {
            label.classList.add('error');
        }
    });
    
    const errorMessage = document.getElementById(`error-${currentQuestionIndex}`);
    if (errorMessage) {
        errorMessage.classList.add('show');
        
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
    
    if (nextButton) {
        nextButton.classList.add('error');
        setTimeout(() => {
            nextButton.classList.remove('error');
        }, 1500);
    }
    
    if (progressContainer) {
        progressContainer.classList.add('has-error');
        setTimeout(() => {
            progressContainer.classList.remove('has-error');
        }, 3000);
    }
    
    if (questionCard) {
        questionCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
        });
    }
}

function removeError() {
    hasError = false;
    
    const questionCard = document.getElementById(`question-card-${currentQuestionIndex}`);
    if (questionCard) {
        questionCard.classList.remove('error');
    }
    
    const labels = document.querySelectorAll(`input[name="q${currentQuestionIndex}"]`);
    labels.forEach(input => {
        const label = input.parentElement;
        label.classList.remove('error');
    });
    
    const errorMessage = document.getElementById(`error-${currentQuestionIndex}`);
    if (errorMessage) {
        errorMessage.classList.remove('show');
    }
    
    if (nextButton) {
        nextButton.classList.remove('error');
    }
}

function updateNavigation() {
    if (prevButton) {
        prevButton.disabled = currentQuestionIndex === 0;
        prevButton.classList.toggle('disabled', currentQuestionIndex === 0);
    }

    if (nextButton) {
        const isLastQuestion = currentQuestionIndex === questions.length - 1;
        nextButton.disabled = isLastQuestion;
    }

    if (finishButton) {
        const isTestComplete = answers.every(answer => answer !== null);
        finishButton.classList.toggle('hidden', !isTestComplete);
        
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.classList.add('hidden');
        } else {
            nextButton.classList.remove('hidden');
        }
    }
}

function updateProgress() {
    const answeredCount = answers.filter(answer => answer !== null).length;
    const progress = (answeredCount / questions.length) * 100;

    if (answeredCountElement) {
        answeredCountElement.textContent = answeredCount;
    }

    if (progressPercentElement) {
        progressPercentElement.textContent = Math.round(progress);
    }

    if (progressFillElement) {
        progressFillElement.style.width = progress + '%';
    }
}

function finishTest() {
    if (isLoading) return;
    
    const unansweredQuestions = validateAllQuestions();
    
    if (unansweredQuestions.length > 0) {
        const firstUnanswered = unansweredQuestions[0].questionNumber - 1;
        showQuestion(firstUnanswered);
        
        setTimeout(() => {
            showError();
            showValidationErrorModal(unansweredQuestions);
        }, 100);
        
        return;
    }
    
    isLoading = true;
    if (finishButton) {
        finishButton.classList.add('loading');
        finishButton.innerHTML = '<span>Завершение...</span>';
    }
    
    // Отправляем событие о начале завершения теста
    if (typeof ym !== 'undefined') {
        ym(106614245, 'reachGoal', 'test_completed');
    }
    
    setTimeout(() => {
        const scores = calculateScores();
        const result = determineTemperament(scores);
        currentResult = result;
        
        showResult(result, scores);
        
        testContent.classList.add('hidden');
        resultContent.classList.remove('hidden');
        
        isLoading = false;
        if (finishButton) {
            finishButton.classList.remove('loading');
            finishButton.innerHTML = '<i class="bi bi-check-circle"></i> Завершить тест';
        }
        
        document.removeEventListener('keydown', handleKeyPress);
        
        if (resultContent) {
            resultContent.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Отправляем событие с результатом теста
        if (typeof ym !== 'undefined') {
            ym(106614245, 'reachGoal', 'test_result', {
                'temperament': result.name,
                'scores': JSON.stringify(scores)
            });
        }
        
        // АВТОМАТИЧЕСКОЕ СКАЧИВАНИЕ PDF
        setTimeout(() => {
            downloadTemperamentPDF(result.name);
        }, 1000);
    }, 800);
}

function validateAllQuestions() {
    const errors = [];
    
    answers.forEach((answer, index) => {
        if (answer === null) {
            errors.push({
                questionNumber: index + 1,
                questionText: questions[index].text
            });
        }
    });
    
    return errors;
}

function showValidationErrorModal(unansweredQuestions) {
    const errorModal = document.createElement('div');
    errorModal.className = 'error-modal';
    
    const questionsList = unansweredQuestions.map(q => 
        `<li><a href="javascript:void(0)" onclick="showQuestion(${q.questionNumber - 1}); document.querySelector('.error-modal')?.remove();">Вопрос ${q.questionNumber}</a></li>`
    ).join('');
    
    errorModal.innerHTML = `
        <div class="error-modal-content">
            <div class="error-modal-icon">
                <i class="bi bi-exclamation-triangle"></i>
            </div>
            <h3 class="error-modal-title">Не все вопросы отвечены</h3>
            <p class="error-modal-message">
                Пожалуйста, ответьте на все вопросы перед завершением теста.
                <span>Найдено ${unansweredQuestions.length} неотвеченных вопросов</span>
            </p>
            <div class="validation-summary">
                <div class="validation-summary-title">
                    <i class="bi bi-list-ul"></i>
                    <span>Неотвеченные вопросы:</span>
                </div>
                <ul class="validation-summary-list">
                    ${questionsList}
                </ul>
            </div>
            <button class="btn-primary error-modal-close" onclick="this.parentElement.parentElement.remove()">
                Понятно
            </button>
        </div>
    `;
    
    document.body.appendChild(errorModal);

    errorModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
    
    document.addEventListener('keydown', function closeModal(e) {
        if (e.key === 'Escape') {
            errorModal.remove();
            document.removeEventListener('keydown', closeModal);
        }
    });
    
    setTimeout(() => {
        if (errorModal.parentElement) {
            errorModal.remove();
        }
    }, 15000);
}

function calculateScores() {
    const scores = { E: 0, N: 0, P: 0 };

    questions.forEach((question, index) => {
        if (answers[index] !== null) {
            let score = 0;
            if (question.positive && answers[index]) score = 1;
            if (!question.positive && !answers[index]) score = 1;
            scores[question.dimension] += score;
        }
    });

    return scores;
}

function determineTemperament(scores) {
    const isExtrovert = scores.E >= 5;
    const isNeurotic = scores.N >= 5;

    if (isExtrovert && isNeurotic) {
        return {
            name: "Холерик",
            type: "Нестабильный экстраверт",
            description: "Вы - активный, энергичный, импульсивный человек с сильными эмоциональными реакциями. Обладаете лидерскими качествами, но можете быть вспыльчивыми и нетерпеливыми.",
            traits: ["Энергичный", "Инициативный", "Решительный", "Вспыльчивый", "Нетерпеливый"]
        };
    } else if (isExtrovert && !isNeurotic) {
        return {
            name: "Сангвиник",
            type: "Стабильный экстраверт",
            description: "Вы - общительный, открытый, жизнерадостный человек. Легко адаптируетесь к новым ситуациям, обладаете высокой работоспособностью и оптимизмом.",
            traits: ["Общительный", "Активный", "Отзывчивый", "Непостоянный", "Поверхностный"]
        };
    } else if (!isExtrovert && isNeurotic) {
        return {
            name: "Меланхолик",
            type: "Нестабильный интроверт",
            description: "Вы - глубокий, вдумчивый, чувствительный человек с богатым внутренним миром. Обладаете высокой эмпатией, но склонны к тревожности и перфекционизму.",
            traits: ["Глубокий", "Чуткий", "Аналитичный", "Тревожный", "Ранимый"]
        };
    } else {
        return {
            name: "Флегматик",
            type: "Стабильный интроверт",
            description: "Вы - спокойный, надежный, уравновешенный человек. Сохраняете хладнокровие в стрессовых ситуациях, методичны и последовательны в действиях.",
            traits: ["Спокойный", "Надежный", "Упорный", "Медлительный", "Пассивный"]
        };
    }
}

function showResult(result, scores) {
    const data = temperamentData[result.name] || temperamentData["Сангвиник"];

    const resultNameEl = document.getElementById('result-name');
    const resultTypeEl = document.getElementById('result-type');
    const resultDescEl = document.getElementById('result-description');
    
    if (resultNameEl) resultNameEl.textContent = result.name;
    if (resultTypeEl) resultTypeEl.textContent = result.type;
    if (resultDescEl) resultDescEl.textContent = result.description;

    const scoreEEl = document.getElementById('score-E');
    const scoreNEl = document.getElementById('score-N');
    const scorePEl = document.getElementById('score-P');
    
    if (scoreEEl) scoreEEl.textContent = scores.E;
    if (scoreNEl) scoreNEl.textContent = scores.N;
    if (scorePEl) scorePEl.textContent = scores.P;

    const statEEl = document.getElementById('stat-e');
    const statNEl = document.getElementById('stat-n');
    const statPEl = document.getElementById('stat-p');
    
    if (statEEl) statEEl.textContent = scores.E;
    if (statNEl) statNEl.textContent = scores.N;
    if (statPEl) statPEl.textContent = scores.P;

    const resultBadge = document.getElementById('result-badge');
    const resultIcon = document.getElementById('result-icon');
    
    if (resultBadge && resultIcon) {
        switch(result.name) {
            case 'Сангвиник':
                resultIcon.className = 'bi bi-star-fill result-icon';
                resultBadge.style.background = `linear-gradient(135deg, ${data.color}, ${adjustColor(data.color, -20)})`;
                break;
            case 'Холерик':
                resultIcon.className = 'bi bi-fire result-icon';
                resultBadge.style.background = `linear-gradient(135deg, ${data.color}, ${adjustColor(data.color, -20)})`;
                break;
            case 'Флегматик':
                resultIcon.className = 'bi bi-triangle-fill result-icon';
                resultBadge.style.background = `linear-gradient(135deg, ${data.color}, ${adjustColor(data.color, -20)})`;
                break;
            case 'Меланхолик':
                resultIcon.className = 'bi bi-droplet-fill result-icon';
                resultBadge.style.background = `linear-gradient(135deg, ${data.color}, ${adjustColor(data.color, -20)})`;
                break;
        }
    }

    const traitsContainer = document.getElementById('result-traits');
    if (traitsContainer) {
        traitsContainer.innerHTML = result.traits.map(trait =>
            `<span class="trait-badge">${trait}</span>`
        ).join('');
    }

    updateDetailedAnalysis(data);
}

function updateDetailedAnalysis(data) {
    const strengthsList = document.getElementById('strengths-list');
    const recommendationsList = document.getElementById('recommendations-list');
    const professionsList = document.getElementById('professions-list');

    if (strengthsList) {
        strengthsList.innerHTML = data.strengths.map(strength =>
            `<li>${strength}</li>`
        ).join('');
    }

    if (recommendationsList) {
        recommendationsList.innerHTML = data.recommendations.map(rec =>
            `<li>${rec}</li>`
        ).join('');
    }

    if (professionsList) {
        professionsList.innerHTML = data.professions.map(prof =>
            `<li>${prof}</li>`
        ).join('');
    }
}

function downloadTemperamentPDF(temperamentName) {
    const data = temperamentData[temperamentName];
    if (data && data.pdfUrl) {
        // Отправляем событие в Яндекс.Метрику
        if (typeof ym !== 'undefined') {
            try {
                // Основная цель - скачивание файла
                ym(106614245, 'reachGoal', 'download_pdf', {
                    'temperament': temperamentName,
                    'file_name': `${temperamentName.toLowerCase()}.pdf`
                });
                
                // Дополнительные цели для детального анализа
                ym(106614245, 'reachGoal', `${temperamentName.toLowerCase()}_download`);
                
                console.log(`Событие download_pdf отправлено для ${temperamentName}`);
            } catch (e) {
                console.log('Ошибка при отправке в Метрику:', e);
            }
        }
        
        const link = document.createElement('a');
        link.href = data.pdfUrl;
        link.download = `${temperamentName.toLowerCase()}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showDownloadNotification(temperamentName);
    }
}

function showDownloadNotification(temperamentName) {
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="download-notification-content">
            <i class="bi bi-check-circle-fill"></i>
            <div>
                <strong>Скачивание начато!</strong><br>
                <span>Руководство для ${temperamentName}а загружается...</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

function adjustColor(color, amount) {
    const clamp = (value) => Math.max(0, Math.min(255, value));
    
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    
    const newR = clamp(r + amount);
    const newG = clamp(g + amount);
    const newB = clamp(b + amount);
    
    const toHex = (num) => {
        const hex = num.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

function handleKeyPress(e) {
    if (e.code === 'ArrowRight' || e.code === 'Enter') {
        e.preventDefault();
        nextQuestion();
    }
    
    if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevQuestion();
    }
    
    if (e.code === 'Digit1' || e.code === 'Numpad1') {
        e.preventDefault();
        setAnswer(currentQuestionIndex, true);
    }
    
    if (e.code === 'Digit2' || e.code === 'Numpad2') {
        e.preventDefault();
        setAnswer(currentQuestionIndex, false);
    }
    
    if (e.code === 'Space' && answers[currentQuestionIndex] === null) {
        e.preventDefault();
        setAnswer(currentQuestionIndex, true);
    }
}

function restartTest() {
    answers = new Array(questions.length).fill(null);
    currentQuestionIndex = 0;
    hasError = false;
    isLoading = false;
    currentResult = null;
    
    if (testContent) testContent.classList.remove('hidden');
    if (resultContent) resultContent.classList.add('hidden');
    
    showQuestion(currentQuestionIndex);
    updateProgress();
    updateNavigation();
    
    document.addEventListener('keydown', handleKeyPress);
    
    if (testContent) {
        testContent.scrollIntoView({ behavior: 'smooth' });
    }
}

function goToHome() {
    window.location.href = 'index.html';
}

function shareResult() {
    const resultName = document.getElementById('result-name')?.textContent || 'Результат теста';
    const resultType = document.getElementById('result-type')?.textContent || '';
    const description = document.getElementById('result-description')?.textContent || '';
    
    const shareText = `Мой результат теста на темперамент: ${resultName} (${resultType})\n\n${description}\n\nПройдите тест на PsyTest!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат теста на темперамент',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('Ошибка при шеринге:', err);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

function fallbackShare(text) {
    navigator.clipboard.writeText(text).then(() => {
        showShareNotification();
    }).catch(err => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showShareNotification();
        } catch (err) {
            alert('Не удалось скопировать результат. Скопируйте текст вручную:\n\n' + text);
        }
        document.body.removeChild(textArea);
    });
}

function showShareNotification() {
    const notification = document.createElement('div');
    notification.className = 'share-notification';
    notification.innerHTML = `
        <div class="share-notification-content">
            <i class="bi bi-check-circle"></i>
            <span>Результат скопирован в буфер обмена!</span>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    if (!document.querySelector('#share-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'share-notification-styles';
        style.textContent = `
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function createStars() {
    const starsBg = document.getElementById('starsBg');
    if (!starsBg) return;

    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 2 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 3;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.animationDelay = `${delay}s`;

        starsBg.appendChild(star);
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('test.html') || path.endsWith('/test')) {
        return 'test';
    }
    return 'index';
}

function init() {
    console.log('Инициализация приложения...');
    console.log('Текущая страница:', getCurrentPage());
    
    if (getCurrentPage() === 'test') {
        initializeTest();
    }
}

window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.finishTest = finishTest;
window.restartTest = restartTest;
window.goToHome = goToHome;
window.setAnswer = setAnswer;
window.shareResult = shareResult;
window.downloadTemperamentPDF = downloadTemperamentPDF;

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM загружен, инициализация теста...");
    init();
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    console.log("DOM уже загружен, запускаем инициализацию...");
    setTimeout(init, 100);
}

// Стили для уведомлений
const style = document.createElement('style');
style.textContent = `
    .download-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    }
    
    .download-notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .download-notification-content i {
        font-size: 24px;
    }
    
    .share-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8b5cf6, #6d28d9);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    }
    
    .share-notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);