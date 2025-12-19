// Вопросы теста Айзенка
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

// Данные для детального анализа каждого темперамента
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

// Глобальные переменные
let currentQuestionIndex = 0;
let answers = new Array(questions.length).fill(null);
let hasError = false;
let isLoading = false;

// DOM элементы
let questionsContainer, testContent, resultContent;
let currentQuestionElement, answeredCountElement, progressPercentElement, progressFillElement;
let prevButton, nextButton, finishButton;
let progressContainer;

// Инициализация теста
function initializeTest() {
    console.log("Инициализация теста...");

    // Инициализация DOM элементов
    questionsContainer = document.getElementById('questions-container');
    testContent = document.getElementById('test-content');
    resultContent = document.getElementById('result-content');
    currentQuestionElement = document.getElementById('current-question');
    answeredCountElement = document.getElementById('answered-count');
    progressPercentElement = document.getElementById('progress-percent');
    progressFillElement = document.getElementById('progress-fill');
    prevButton = document.getElementById('prev-btn');
    nextButton = document.getElementById('next-btn');
    finishButton = document.getElementById('finish-btn');
    progressContainer = document.querySelector('.progress-container');

    // Проверка существования элементов
    if (!questionsContainer || !testContent || !resultContent) {
        console.error("Не найдены необходимые DOM элементы");
        return;
    }

    // Скрываем результат, показываем тест
    testContent.classList.remove('hidden');
    resultContent.classList.add('hidden');

    showQuestion(currentQuestionIndex);
    updateProgress();
    updateNavigation();
    createStars();
    
    // Добавляем обработчики событий на кнопки
    prevButton.addEventListener('click', prevQuestion);
    nextButton.addEventListener('click', nextQuestion);
    finishButton.addEventListener('click', finishTest);
    
    // Добавляем обработчики клавиш
    document.addEventListener('keydown', handleKeyPress);
}

// Показать вопрос
function showQuestion(index) {
    currentQuestionIndex = index;
    const question = questions[index];
    
    // Удаляем ошибку при переходе на новый вопрос
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

    questionsContainer.innerHTML = questionHTML;
    currentQuestionElement.textContent = index + 1;
    updateProgress();
    updateNavigation();
    
    // Показываем/скрываем ошибку
    if (hasError && answers[currentQuestionIndex] === null) {
        showError();
    }
}

// Установить ответ
function setAnswer(index, value) {
    if (index >= 0 && index < questions.length) {
        answers[index] = value;
        console.log(`Ответ на вопрос ${index + 1}: ${value}`);
        
        // Убираем ошибку при выборе ответа
        removeError();

        // Обновляем визуальное состояние
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
    
    // Проверяем, выбран ли ответ на текущий вопрос
    if (answers[currentQuestionIndex] === null) {
        console.log("No answer selected, showing error");
        showError();
        return;
    }
    
    // Сбрасываем флаг ошибки
    hasError = false;
    
    if (currentQuestionIndex < questions.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    }
}

// Предыдущий вопрос
function prevQuestion() {
    console.log("Prev button clicked");
    
    // Сбрасываем ошибку при переходе назад
    removeError();
    
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

// Показать ошибку
function showError() {
    console.log("Showing error for question:", currentQuestionIndex);
    hasError = true;
    
    // Добавляем класс ошибки к карточке вопроса
    const questionCard = document.getElementById(`question-card-${currentQuestionIndex}`);
    if (questionCard) {
        questionCard.classList.add('error');
        
        // Добавляем двойную анимацию для лучшего эффекта
        setTimeout(() => {
            questionCard.classList.remove('error');
            setTimeout(() => {
                questionCard.classList.add('error');
            }, 50);
        }, 50);
    }
    
    // Добавляем класс ошибки к радиокнопкам
    const labels = document.querySelectorAll(`input[name="q${currentQuestionIndex}"]`);
    labels.forEach(input => {
        const label = input.parentElement;
        if (!input.checked) {
            label.classList.add('error');
        }
    });
    
    // Показываем сообщение об ошибке
    const errorMessage = document.getElementById(`error-${currentQuestionIndex}`);
    if (errorMessage) {
        errorMessage.classList.add('show');
        
        // Автоматически скрываем ошибку через 5 секунд
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
    
    // Добавляем анимацию к кнопке далее
    if (nextButton) {
        nextButton.classList.add('error');
        setTimeout(() => {
            nextButton.classList.remove('error');
        }, 1500);
    }
    
    // Добавляем индикацию ошибки в прогресс баре
    if (progressContainer) {
        progressContainer.classList.add('has-error');
        setTimeout(() => {
            progressContainer.classList.remove('has-error');
        }, 3000);
    }
    
    // Прокручиваем к ошибке
    questionCard?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
    });
}

// Убрать ошибку
function removeError() {
    hasError = false;
    
    // Убираем класс ошибки с карточки вопроса
    const questionCard = document.getElementById(`question-card-${currentQuestionIndex}`);
    if (questionCard) {
        questionCard.classList.remove('error');
    }
    
    // Убираем класс ошибки с радиокнопок
    const labels = document.querySelectorAll(`input[name="q${currentQuestionIndex}"]`);
    labels.forEach(input => {
        const label = input.parentElement;
        label.classList.remove('error');
    });
    
    // Скрываем сообщение об ошибке
    const errorMessage = document.getElementById(`error-${currentQuestionIndex}`);
    if (errorMessage) {
        errorMessage.classList.remove('show');
    }
    
    // Убираем анимацию с кнопки
    if (nextButton) {
        nextButton.classList.remove('error');
    }
}

// Обновить навигацию
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
        testContent.classList.add('hidden');
        resultContent.classList.remove('hidden');
        
        // Сбрасываем состояние загрузки
        isLoading = false;
        if (finishButton) {
            finishButton.classList.remove('loading');
            finishButton.innerHTML = '<i class="bi bi-check-circle"></i> Завершить тест';
        }
        
        // Убираем обработчики клавиш
        document.removeEventListener('keydown', handleKeyPress);
        
        // Прокручиваем к результату
        resultContent.scrollIntoView({ behavior: 'smooth' });
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

// Показать модальное окно с ошибкой валидации
function showValidationErrorModal(unansweredQuestions) {
    // Создаем модальное окно с ошибкой
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
    
    // Закрытие по клику вне модального окна
    errorModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function closeModal(e) {
        if (e.key === 'Escape') {
            errorModal.remove();
            document.removeEventListener('keydown', closeModal);
        }
    });
    
    // Автоматическое удаление через 15 секунд
    setTimeout(() => {
        if (errorModal.parentElement) {
            errorModal.remove();
        }
    }, 15000);
}

// Подсчитать баллы
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

// Определить темперамент по Айзенку
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

// Показать результат
function showResult(result, scores) {
    const data = temperamentData[result.name] || temperamentData["Сангвиник"];

    // Обновляем основную информацию
    document.getElementById('result-name').textContent = result.name;
    document.getElementById('result-type').textContent = result.type;
    document.getElementById('result-description').textContent = result.description;

    // Обновляем баллы
    document.getElementById('score-E').textContent = scores.E;
    document.getElementById('score-N').textContent = scores.N;
    document.getElementById('score-P').textContent = scores.P;

    // Обновляем статистику
    document.getElementById('stat-e').textContent = scores.E;
    document.getElementById('stat-n').textContent = scores.N;
    document.getElementById('stat-p').textContent = scores.P;

    // Обновляем иконку и цвет
    const resultBadge = document.getElementById('result-badge');
    const resultIcon = document.getElementById('result-icon');
    
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

    // Обновляем черты характера
    const traitsContainer = document.getElementById('result-traits');
    if (traitsContainer) {
        traitsContainer.innerHTML = result.traits.map(trait =>
            `<span class="trait-badge">${trait}</span>`
        ).join('');
    }

    // Обновляем детальный анализ
    updateDetailedAnalysis(data);
}

// Обновить детальный анализ
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
    return '#' + color.replace(/^#/, '').replace(/../g, color =>
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
    );
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
    // Сбрасываем ответы
    answers = new Array(questions.length).fill(null);
    currentQuestionIndex = 0;
    hasError = false;
    isLoading = false;
    
    // Показываем тест, скрываем результат
    testContent.classList.remove('hidden');
    resultContent.classList.add('hidden');
    
    // Обновляем интерфейс
    showQuestion(currentQuestionIndex);
    updateProgress();
    updateNavigation();
    
    // Добавляем обработчики клавиш
    document.addEventListener('keydown', handleKeyPress);
    
    // Прокручиваем к началу теста
    testContent.scrollIntoView({ behavior: 'smooth' });
}

// Вернуться на главную
function goToHome() {
    window.location.href = 'index.html';
}

// Поделиться результатом
function shareResult() {
    const resultName = document.getElementById('result-name').textContent;
    const resultType = document.getElementById('result-type').textContent;
    
    const shareText = `🎯 Мой результат теста на темперамент: ${resultName} (${resultType})\n\n📊 Пройти тест и узнать свой тип: ${window.location.origin}`;

    if (navigator.share) {
        navigator.share({
            title: 'Мой результат теста на темперамент',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('Ошибка при попытке поделиться:', err);
            fallbackShare(shareText);
        });
    } else {
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

// Показать уведомление о копировании
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
    
    // Автоматически скрываем через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // Добавляем стиль для исчезновения
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

// Экспортируем функции в глобальную область видимости
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.finishTest = finishTest;
window.restartTest = restartTest;
window.goToHome = goToHome;
window.setAnswer = setAnswer;
window.shareResult = shareResult;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM загружен, инициализация теста...");
    initializeTest();
});