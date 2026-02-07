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
        ]
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
        ]
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
        ]
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
        ]
    }
};


let currentQuestionIndex = 0;
let answers = new Array(questions.length).fill(null);
let hasError = false;
let isLoading = false;


let questionsContainer, testContent, resultContent;
let currentQuestionElement, answeredCountElement, progressPercentElement, progressFillElement;
let prevButton, nextButton, finishButton;
let progressContainer;


function initializeTest() {
    console.log("Инициализация теста...");

    // Сначала попробуем найти элементы с отладочной информацией
    console.log("Поиск элементов DOM:");
    const testContentEl = document.getElementById('test-content');
    const resultContentEl = document.getElementById('result-content');
    const questionsContainerEl = document.getElementById('questions-container');
    
    console.log("test-content найден:", !!testContentEl);
    console.log("result-content найден:", !!resultContentEl);
    console.log("questions-container найден:", !!questionsContainerEl);
   
    questionsContainer = questionsContainerEl;
    testContent = testContentEl;
    resultContent = resultContentEl;
    
    // Если основные элементы не найдены, пробуем найти их по-другому
    if (!questionsContainer || !testContent || !resultContent) {
        console.error("Не найдены необходимые DOM элементы");
        console.error("Попытка найти через querySelector...");
        
        questionsContainer = document.querySelector('#questions-container');
        testContent = document.querySelector('#test-content');
        resultContent = document.querySelector('#result-content');
        
        if (!questionsContainer || !testContent || !resultContent) {
            console.error("Элементы все еще не найдены. Проверьте HTML структуру.");
            
            // Покажем сообщение об ошибке
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
    }

    // Находим остальные элементы
    currentQuestionElement = document.getElementById('current-question');
    answeredCountElement = document.getElementById('answered-count');
    progressPercentElement = document.getElementById('progress-percent');
    progressFillElement = document.getElementById('progress-fill');
    prevButton = document.getElementById('prev-btn');
    nextButton = document.getElementById('next-btn');
    finishButton = document.getElementById('finish-btn');
    progressContainer = document.querySelector('.progress-container');
    
    console.log("Все элементы найдены, продолжаем инициализацию...");
    
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
        console.log(`Ответ на вопрос ${index + 1}: ${value}`);
        
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

// Следующий вопрос
function nextQuestion() {
    console.log("Next button clicked, current question:", currentQuestionIndex);
    
    // выбран ли ответ на текущий вопрос
    if (answers[currentQuestionIndex] === null) {
        console.log("No answer selected, showing error");
        showError();
        return;
    }
    
    // Сброс ошибки
    hasError = false;
    
    if (currentQuestionIndex < questions.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    }
}

// Предыдущий вопрос
function prevQuestion() {
    console.log("Prev button clicked");
    
    // Сброс ошибки при переходе назад
    removeError();
    
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

// Показ ошибки
function showError() {
    console.log("Showing error for question:", currentQuestionIndex);
    hasError = true;
    
    // Добавление класса ошибки к карточке вопроса
    const questionCard = document.getElementById(`question-card-${currentQuestionIndex}`);
    if (questionCard) {
        questionCard.classList.add('error');
        
        // Добавление двойной анимации для лучшего эффекта
        setTimeout(() => {
            questionCard.classList.remove('error');
            setTimeout(() => {
                questionCard.classList.add('error');
            }, 50);
        }, 50);
    }
    
    // Добавление класса ошибки к радиокнопкам
    const labels = document.querySelectorAll(`input[name="q${currentQuestionIndex}"]`);
    labels.forEach(input => {
        const label = input.parentElement;
        if (!input.checked) {
            label.classList.add('error');
        }
    });
    
    //  сообщение об ошибке
    const errorMessage = document.getElementById(`error-${currentQuestionIndex}`);
    if (errorMessage) {
        errorMessage.classList.add('show');
        
        // Автоматическое скрытие ошибки через 5 секунд
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
    
    // Добавление анимации к кнопке далее
    if (nextButton) {
        nextButton.classList.add('error');
        setTimeout(() => {
            nextButton.classList.remove('error');
        }, 1500);
    }
    
    // Добавление индикации ошибки в прогресс баре
    if (progressContainer) {
        progressContainer.classList.add('has-error');
        setTimeout(() => {
            progressContainer.classList.remove('has-error');
        }, 3000);
    }
    
    // Прокрутка к ошибке
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
    
    // скрытие сообщения об ошибке
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
        
        // Показываем/скрываем кнопку Далее на последнем вопросе
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.classList.add('hidden');
        } else {
            nextButton.classList.remove('hidden');
        }
    }
}

// Обновить прогресс
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

// Завершить тест и показать результат
function finishTest() {
    // Блокируем повторные нажатия
    if (isLoading) return;
    
    // Проверяем, ответил ли пользователь на ВСЕ вопросы
    const unansweredQuestions = validateAllQuestions();
    
    if (unansweredQuestions.length > 0) {
        // Находим первый неотвеченный вопрос
        const firstUnanswered = unansweredQuestions[0].questionNumber - 1;
        
        // Переходим к нему
        showQuestion(firstUnanswered);
        
        // Показываем ошибку
        setTimeout(() => {
            showError();
            showValidationErrorModal(unansweredQuestions);
        }, 100);
        
        return;
    }
    
    // Устанавливаем состояние загрузки
    isLoading = true;
    if (finishButton) {
        finishButton.classList.add('loading');
        finishButton.innerHTML = '<span>Завершение...</span>';
    }
    
    // Имитируем загрузку для лучшего UX
    setTimeout(() => {
        const scores = calculateScores();
        const result = determineTemperament(scores);
        
        // Показываем результат
        showResult(result, scores);
        
        // Скрываем тест, показываем результат
        if (testContent) testContent.classList.add('hidden');
        if (resultContent) resultContent.classList.remove('hidden');
        
        // Сбрасываем состояние загрузки
        isLoading = false;
        if (finishButton) {
            finishButton.classList.remove('loading');
            finishButton.innerHTML = '<i class="bi bi-check-circle"></i> Завершить тест';
        }
        
        // Убираем обработчики клавиш
        document.removeEventListener('keydown', handleKeyPress);
        
        // Прокручиваем к результату
        if (resultContent) {
            resultContent.scrollIntoView({ behavior: 'smooth' });
        }
    }, 800);
}

// Проверить все вопросы на наличие ответов
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

// Определение темперамента по Айзенку
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

// Показ результата
function showResult(result, scores) {
    const data = temperamentData[result.name] || temperamentData["Сангвиник"];

    // Обновление основной информации
    const resultNameEl = document.getElementById('result-name');
    const resultTypeEl = document.getElementById('result-type');
    const resultDescEl = document.getElementById('result-description');
    
    if (resultNameEl) resultNameEl.textContent = result.name;
    if (resultTypeEl) resultTypeEl.textContent = result.type;
    if (resultDescEl) resultDescEl.textContent = result.description;

    // Обновление баллов
    const scoreEEl = document.getElementById('score-E');
    const scoreNEl = document.getElementById('score-N');
    const scorePEl = document.getElementById('score-P');
    
    if (scoreEEl) scoreEEl.textContent = scores.E;
    if (scoreNEl) scoreNEl.textContent = scores.N;
    if (scorePEl) scorePEl.textContent = scores.P;

    // Обновление статистики
    const statEEl = document.getElementById('stat-e');
    const statNEl = document.getElementById('stat-n');
    const statPEl = document.getElementById('stat-p');
    
    if (statEEl) statEEl.textContent = scores.E;
    if (statNEl) statNEl.textContent = scores.N;
    if (statPEl) statPEl.textContent = scores.P;

    // Обновление иконки и цвета
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

    // Обновление черт характера
    const traitsContainer = document.getElementById('result-traits');
    if (traitsContainer) {
        traitsContainer.innerHTML = result.traits.map(trait =>
            `<span class="trait-badge">${trait}</span>`
        ).join('');
    }

    // Обновление детального анализа
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

// Вспомогательная функция для изменения цвета
function adjustColor(color, amount) {
    // Исправленная версия функции
    const clamp = (value) => Math.max(0, Math.min(255, value));
    
    // Преобразуем hex в RGB
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    
    // Изменяем значение
    const newR = clamp(r + amount);
    const newG = clamp(g + amount);
    const newB = clamp(b + amount);
    
    // Обратно в hex
    const toHex = (num) => {
        const hex = num.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

// Обработчик нажатия клавиш
function handleKeyPress(e) {
    // Стрелки для навигации
    if (e.code === 'ArrowRight' || e.code === 'Enter') {
        e.preventDefault();
        nextQuestion();
    }
    
    if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevQuestion();
    }
    
    // 1 для "Да", 2 для "Нет"
    if (e.code === 'Digit1' || e.code === 'Numpad1') {
        e.preventDefault();
        setAnswer(currentQuestionIndex, true);
    }
    
    if (e.code === 'Digit2' || e.code === 'Numpad2') {
        e.preventDefault();
        setAnswer(currentQuestionIndex, false);
    }
    
    // Пробел для выбора первого варианта
    if (e.code === 'Space' && answers[currentQuestionIndex] === null) {
        e.preventDefault();
        setAnswer(currentQuestionIndex, true);
    }
}

// Начать тест заново
function restartTest() {
    // Сброс ответов
    answers = new Array(questions.length).fill(null);
    currentQuestionIndex = 0;
    hasError = false;
    isLoading = false;
    
    // скрытие результата
    if (testContent) testContent.classList.remove('hidden');
    if (resultContent) resultContent.classList.add('hidden');
    
    // Обновление интерфейса
    showQuestion(currentQuestionIndex);
    updateProgress();
    updateNavigation();
    
    // Добавл обраб клавиш
    document.addEventListener('keydown', handleKeyPress);
    
    // Прокрутка к началу
    if (testContent) {
        testContent.scrollIntoView({ behavior: 'smooth' });
    }
}

// Вернуться на главную
function goToHome() {
    window.location.href = 'index.html';
}

// Функция для шеринга результатов (ДОБАВЛЕНО!)
function shareResult() {
    const resultName = document.getElementById('result-name')?.textContent || 'Результат теста';
    const resultType = document.getElementById('result-type')?.textContent || '';
    const description = document.getElementById('result-description')?.textContent || '';
    
    const shareText = `Мой результат теста на темперамент: ${resultName} (${resultType})\n\n${description}\n\nПройдите тест на PsyTest!`;
    
    // Проверяем поддержку Web Share API
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
        // Используем fallback
        fallbackShare(shareText);
    }
}

// Фолбэк для шеринга
function fallbackShare(text) {
    navigator.clipboard.writeText(text).then(() => {
        showShareNotification();
    }).catch(err => {
        // Резервный вариант
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
    
    // стиль для исчезновения
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

// Создание звездного фона
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

// Экспорт функций в глобальную область видимости
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.finishTest = finishTest;
window.restartTest = restartTest;
window.goToHome = goToHome;
window.setAnswer = setAnswer;
window.shareResult = shareResult; // Теперь эта функция существует!

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM загружен, инициализация теста...");
    initializeTest();
});

// Дополнительная проверка на случай, если DOM уже загружен
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    console.log("DOM уже загружен, запускаем инициализацию...");
    setTimeout(initializeTest, 100);
}
// Функция для принятия cookies
function acceptCookies() {
    try {
        localStorage.setItem('cookiesAccepted', 'true');
        localStorage.setItem('cookieConsent', 'accepted');
        
        // Скрываем ВСЕ возможные уведомления
        const notifications = [
            document.getElementById('cookie-notification'),
            document.querySelector('.cookie-notification'),
            document.querySelector('#cookie-notification')
        ];
        
        notifications.forEach(notification => {
            if (notification) {
                notification.style.display = 'none';
                notification.remove(); // Полностью удаляем из DOM
            }
        });
        
        // Отправляем событие в Яндекс.Метрику
        if (typeof ym !== 'undefined') {
            try {
                ym(106614245, 'reachGoal', 'cookie_accepted');
                ym(106614245, 'params', { cookie_consent: 'accepted' });
            } catch (e) {
                console.log('Метрика не загружена:', e);
            }
        }
        
        // Показываем подтверждение
        showCookieNotification('Согласие на использование cookies принято', 'success');
        
    } catch (error) {
        console.error('Ошибка в acceptCookies:', error);
    }
}

// Функция для отклонения cookies
function declineCookies() {
    try {
        localStorage.setItem('cookiesAccepted', 'false');
        localStorage.setItem('cookieConsent', 'declined');
        
        // Скрываем ВСЕ возможные уведомления
        const notifications = [
            document.getElementById('cookie-notification'),
            document.querySelector('.cookie-notification'),
            document.querySelector('#cookie-notification')
        ];
        
        notifications.forEach(notification => {
            if (notification) {
                notification.style.display = 'none';
                notification.remove(); // Полностью удаляем из DOM
            }
        });
        
        // Отключаем Яндекс.Метрику
        disableYandexMetrika();
        
        // Показываем подтверждение
        showCookieNotification('Использование cookies отклонено', 'warning');
        
    } catch (error) {
        console.error('Ошибка в declineCookies:', error);
    }
}

// Улучшенная инициализация cookie-уведомления
function initializeCookieConsent() {
    console.log('Инициализация cookie-уведомления...');
    
    // Даем время на загрузку DOM
    setTimeout(() => {
        const cookieNotification = document.getElementById('cookie-notification');
        const acceptButton = document.getElementById('cookie-accept');
        const declineButton = document.getElementById('cookie-decline');
        
        console.log('Найдены элементы:', {
            notification: !!cookieNotification,
            acceptButton: !!acceptButton,
            declineButton: !!declineButton
        });
        
        if (!cookieNotification) {
            console.warn('Cookie уведомление не найдено на странице');
            return;
        }
        
        // Проверяем, было ли уже дано согласие
        const consentGiven = localStorage.getItem('cookiesAccepted') || 
                            localStorage.getItem('cookieConsent');
        
        console.log('Статус согласия:', consentGiven);
        
        if (!consentGiven) {
            cookieNotification.style.display = 'block';
            console.log('Показываем cookie уведомление');
        } else {
            cookieNotification.style.display = 'none';
            cookieNotification.remove();
            console.log('Скрываем cookie уведомление, согласие уже дано');
        }
        
        // Вешаем обработчики, если кнопки существуют
        if (acceptButton) {
            console.log('Вешаем обработчик на кнопку Принять');
            acceptButton.addEventListener('click', acceptCookies);
            
            // Дублируем onclick для подстраховки
            acceptButton.onclick = acceptCookies;
        }
        
        if (declineButton) {
            console.log('Вешаем обработчик на кнопку Отклонить');
            declineButton.addEventListener('click', declineCookies);
            
            // Дублируем onclick для подстраховки
            declineButton.onclick = declineCookies;
        }
        
    }, 100); // Небольшая задержка для гарантированной загрузки DOM
}

// ==================== УПРОЩЕННЫЙ COOKIE-УВЕДОМЛЕНИЕ ====================

// Проверка и показ cookie-уведомления
function checkAndShowCookieNotification() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const cookieNotification = document.getElementById('cookie-notification');
    
    if (cookieNotification && !cookiesAccepted) {
        // Показываем уведомление через 1 секунду
        setTimeout(() => {
            cookieNotification.style.display = 'block';
            console.log('Показываем cookie уведомление');
        }, 1000);
    } else if (cookieNotification && cookiesAccepted === 'true') {
        // Скрываем, если уже принято
        cookieNotification.style.display = 'none';
    }
}

// Функция для принятия cookies
function acceptCookies() {
    console.log('Принятие cookies...');
    
    // Сохраняем согласие
    localStorage.setItem('cookiesAccepted', 'true');
    
    // Находим и скрываем уведомление
    const cookieNotification = document.getElementById('cookie-notification');
    if (cookieNotification) {
        cookieNotification.style.display = 'none';
        console.log('Cookie уведомление скрыто');
    }
    
    // Отправляем событие в Яндекс.Метрику
    try {
        if (typeof ym !== 'undefined') {
            ym(106614245, 'reachGoal', 'cookie_accepted');
            console.log('Событие cookie_accepted отправлено в Яндекс.Метрику');
        }
    } catch (e) {
        console.log('Ошибка при отправке в Яндекс.Метрику:', e);
    }
    
    // Показываем уведомление об успехе
    alert('Согласие на использование cookies принято. Спасибо!');
}

// Функция для отклонения cookies
function declineCookies() {
    console.log('Отклонение cookies...');
    
    // Сохраняем отказ
    localStorage.setItem('cookiesAccepted', 'false');
    
    // Находим и скрываем уведомление
    const cookieNotification = document.getElementById('cookie-notification');
    if (cookieNotification) {
        cookieNotification.style.display = 'none';
        console.log('Cookie уведомление скрыто');
    }
    
    // Отключаем Яндекс.Метрику
    disableYandexMetrika();
    
    // Показываем уведомление
    alert('Использование cookies отклонено. Некоторые функции сайта могут быть недоступны.');
}

// Функция для отключения Яндекс.Метрики
function disableYandexMetrika() {
    try {
        // Останавливаем Метрику
        if (typeof ym !== 'undefined') {
            // Создаем новый скрипт, который переопределит ym
            const script = document.createElement('script');
            script.textContent = `
                window.ym = function() {
                    console.log('Yandex.Metrika отключена из-за отказа от cookies');
                };
            `;
            document.head.appendChild(script);
        }
        
        // Удаляем существующий счетчик
        const yandexScripts = document.querySelectorAll('script[src*="metrika"]');
        yandexScripts.forEach(script => script.remove());
        
        // Удаляем noscript с изображением
        const noscript = document.querySelector('noscript');
        if (noscript && noscript.innerHTML.includes('mc.yandex.ru')) {
            noscript.remove();
        }
        
        console.log('Яндекс.Метрика отключена');
    } catch (e) {
        console.log('Ошибка при отключении Яндекс.Метрики:', e);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, проверяем cookies...');
    
    // Проверяем и показываем cookie-уведомление
    checkAndShowCookieNotification();
    
    // Вешаем обработчики на кнопки (на всякий случай)
    const acceptButton = document.getElementById('cookie-accept');
    const declineButton = document.getElementById('cookie-decline');
    
    if (acceptButton) {
        acceptButton.addEventListener('click', acceptCookies);
    }
    
    if (declineButton) {
        declineButton.addEventListener('click', declineCookies);
    }
});

// Глобальные экспорты для кнопок onclick
window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;
window.checkAndShowCookieNotification = checkAndShowCookieNotification;