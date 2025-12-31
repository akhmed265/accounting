// Главный объект приложения
const App = {
    currentTab: 'about',
    operations: [],
    currentTask: 0,
    // Массив задач для тренажера проводок
    transactionTasks: [
        {
            id: 0,
            description: 'Сняли 50 000 руб. с расчетного счета в банке и положили их в кассу компании.',
            correctDebit: 'cash',
            correctCredit: 'bank',
            explanation: 'Верно! Деньги поступили в кассу (Дебет), и одновременно уменьшились на расчетном счете (Кредит).',
            hint: 'Подсказка: когда деньги снимают со счета, этот счет записывается по Кредиту, а куда они приходят — по Дебету.'
        },
        {
            id: 1,
            description: 'Оплатили аренду офиса наличными из кассы в размере 30 000 руб.',
            correctDebit: 'expenses',
            correctCredit: 'cash',
            explanation: 'Верно! Расходы по аренде увеличились (Дебет), а денежные средства в кассе уменьшились (Кредит).',
            hint: 'Подсказка: когда оплачиваем расходы наличными, расходы записываются по Дебету, а касса — по Кредиту.'
        },
        {
            id: 2,
            description: 'Получили выручку от продажи товаров покупателю наличными в размере 75 000 руб.',
            correctDebit: 'cash',
            correctCredit: 'revenue',
            explanation: 'Верно! Деньги поступили в кассу (Дебет), а выручка увеличилась (Кредит).',
            hint: 'Подсказка: при получении выручки наличными касса увеличивается (Дебет), а выручка записывается по Кредиту.'
        },
        {
            id: 3,
            description: 'Оплатили поставщику за товары с расчетного счета 120 000 руб.',
            correctDebit: 'goods',
            correctCredit: 'bank',
            explanation: 'Верно! Товары поступили на склад (Дебет), а деньги списались с расчетного счета (Кредит).',
            hint: 'Подсказка: при покупке товаров товары записываются по Дебету, а расчетный счет уменьшается (Кредит).'
        },
        {
            id: 4,
            description: 'Перечислили зарплату сотрудникам с расчетного счета в размере 200 000 руб.',
            correctDebit: 'expenses',
            correctCredit: 'bank',
            explanation: 'Верно! Расходы на зарплату увеличились (Дебет), а средства на расчетном счете уменьшились (Кредит).',
            hint: 'Подсказка: при выплате зарплаты расходы записываются по Дебету, а расчетный счет по Кредиту.'
        }
    ],
    
    // Инициализация приложения
    init() {
        this.setupTabNavigation();
        this.loadTab('about');
    },
    
    // Настройка навигации по вкладкам
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });
    },
    
    // Переключение вкладки
    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Обновление активной кнопки
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            }
        });
        
        // Загрузка контента вкладки
        this.loadTab(tabName);
    },
    
    // Загрузка контента выбранной вкладки
    loadTab(tabName) {
        const contentArea = document.getElementById('content');
        
        switch(tabName) {
            case 'about':
                contentArea.innerHTML = this.getAboutContent();
                break;
            case 'terms':
                contentArea.innerHTML = this.getTermsContent();
                this.setupTermsInteraction();
                break;
            case 'calculator':
                contentArea.innerHTML = this.getCalculatorContent();
                this.setupCalculator();
                break;
            case 'transaction':
                contentArea.innerHTML = this.getTransactionContent();
                this.setupTransactionTrainer();
                break;
        }
    },
    
    // Контент: Кто такой бухгалтер?
    getAboutContent() {
        return `
            <div class="content-section">
                <h2>Кто такой бухгалтер?</h2>
                
                <p>
                    Бухгалтер — это специалист, который ведет учет всех финансовых операций компании. 
                    Он знает, откуда пришли деньги, куда они ушли, сколько компания заработала и потратила.
                </p>
                
                <h3>Основные задачи бухгалтера:</h3>
                <ul>
                    <li>
                        <strong>Учет операций:</strong> Ведет запись всех финансовых операций компании — 
                        что пришло, что ушло, сколько денег на счетах, сколько товаров на складе.
                    </li>
                    <li>
                        <strong>Подготовка отчетов:</strong> Составляет отчеты для руководства компании 
                        и государственных органов. Эти отчеты показывают финансовое состояние бизнеса.
                    </li>
                    <li>
                        <strong>Расчет налогов:</strong> Правильно рассчитывает, сколько компания должна 
                        заплатить налогов государству, и следит за своевременной их уплатой.
                    </li>
                    <li>
                        <strong>Расчет зарплаты:</strong> Начисляет заработную плату сотрудникам, 
                        рассчитывает отпускные, больничные и удерживает подоходный налог.
                    </li>
                    <li>
                        <strong>Контроль финансов:</strong> Следит за финансовым здоровьем бизнеса, 
                        помогает руководителям принимать правильные решения на основе цифр.
                    </li>
                </ul>
                
                <h3>Почему это важно?</h3>
                <p>
                    Без правильного учета компания не сможет понять, прибыльна ли она, сколько денег 
                    реально зарабатывает, куда уходят средства. Бухгалтер помогает "видеть" финансовую 
                    картину бизнеса целиком и принимать взвешенные решения.
                </p>
            </div>
        `;
    },
    
    // Контент: Основные термины (глоссарий)
    getTermsContent() {
        return `
            <div class="content-section">
                <h2>Основные термины</h2>
                <p>Кликните на термин, чтобы увидеть его определение:</p>
                
                <ul class="terms-list">
                    <li class="term-item" data-term="active">
                        <div class="term-name">Актив</div>
                        <div class="term-definition">
                            То, чем владеет компания и что имеет стоимость. Например: деньги в кассе, 
                            товары на складе, оборудование, недвижимость, деньги на банковском счете. 
                            Активы — это ресурсы компании.
                        </div>
                    </li>
                    <li class="term-item" data-term="passive">
                        <div class="term-name">Пассив</div>
                        <div class="term-definition">
                            Источники, за счет которых появились активы компании. Пассивы показывают, 
                            откуда взялись деньги: собственный капитал (вложения владельцев, прибыль) 
                            или обязательства (кредиты, задолженности перед поставщиками).
                        </div>
                    </li>
                    <li class="term-item" data-term="debit">
                        <div class="term-name">Дебет</div>
                        <div class="term-definition">
                            Левая сторона бухгалтерского счета. Для активных счетов дебет означает 
                            увеличение актива (например, поступление денег). Для пассивных счетов 
                            дебет означает уменьшение пассива.
                        </div>
                    </li>
                    <li class="term-item" data-term="credit">
                        <div class="term-name">Кредит</div>
                        <div class="term-definition">
                            Правая сторона бухгалтерского счета. Для активных счетов кредит означает 
                            уменьшение актива (например, расход денег). Для пассивных счетов кредит 
                            означает увеличение пассива.
                        </div>
                    </li>
                    <li class="term-item" data-term="balance">
                        <div class="term-name">Баланс</div>
                        <div class="term-definition">
                            Главный отчет компании, который показывает ее финансовое положение на 
                            определенную дату. В балансе активы всегда равны пассивам. Это основной 
                            принцип бухгалтерского учета.
                        </div>
                    </li>
                    <li class="term-item" data-term="profit">
                        <div class="term-name">Прибыль</div>
                        <div class="term-definition">
                            Разница между доходами и расходами компании. Если доходы больше расходов — 
                            это прибыль. Если расходы больше доходов — это убыток. Прибыль увеличивает 
                            собственный капитал компании.
                        </div>
                    </li>
                    <li class="term-item" data-term="account">
                        <div class="term-name">Счет</div>
                        <div class="term-definition">
                            Способ группировки однородных операций. Каждый счет имеет название и номер. 
                            Например, счет "Денежные средства" учитывает все операции с деньгами, 
                            счет "Выручка" — все доходы от продаж. В проводке всегда участвуют два счета.
                        </div>
                    </li>
                </ul>
            </div>
        `;
    },
    
    // Настройка интерактивности глоссария
    setupTermsInteraction() {
        const termsList = document.querySelector('.terms-list');
        const termItems = document.querySelectorAll('.term-item');
        
        termItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); // Предотвращаем всплытие события
                
                const definition = item.querySelector('.term-definition');
                const isCurrentlyOpen = definition.classList.contains('show');
                
                // Закрываем все открытые определения
                document.querySelectorAll('.term-definition').forEach(def => {
                    def.classList.remove('show');
                });
                
                // Если элемент был закрыт, открываем его; если был открыт - остается закрытым
                if (!isCurrentlyOpen) {
                    definition.classList.add('show');
                }
            });
        });
        
        // Закрытие терминов при клике вне списка терминов
        document.addEventListener('click', (e) => {
            // Проверяем, что клик был вне элементов списка терминов
            if (!termsList.contains(e.target)) {
                document.querySelectorAll('.term-definition').forEach(def => {
                    def.classList.remove('show');
                });
            }
        });
    },
    
    // Контент: Калькулятор оборотов
    getCalculatorContent() {
        return `
            <div class="content-section">
                <h2>Калькулятор оборотов</h2>
                <p>Симулятор учета доходов и расходов. Добавляйте операции и следите за финансовым результатом.</p>
                
                <form class="calculator-form" id="calculator-form">
                    <div class="form-group">
                        <label for="amount">Сумма</label>
                        <input type="number" id="amount" placeholder="Введите сумму" min="0" step="0.01" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="operation-type">Тип операции</label>
                        <select id="operation-type" required>
                            <option value="income">Доход</option>
                            <option value="expense">Расход</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="operation-item">Статья</label>
                        <select id="operation-item" required>
                            <option value="">Выберите статью</option>
                            <option value="revenue" data-type="income">Выручка от продаж</option>
                            <option value="services" data-type="income">Услуги</option>
                            <option value="other-income" data-type="income">Прочие доходы</option>
                            <option value="purchase" data-type="expense">Закупка товаров</option>
                            <option value="salary" data-type="expense">Зарплата</option>
                            <option value="rent" data-type="expense">Аренда</option>
                            <option value="utilities" data-type="expense">Коммунальные услуги</option>
                            <option value="marketing" data-type="expense">Реклама и маркетинг</option>
                            <option value="transport" data-type="expense">Транспортные расходы</option>
                            <option value="other-expense" data-type="expense">Прочие расходы</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="btn">Добавить операцию</button>
                </form>
                
                <div class="table-wrapper">
                    <table class="operations-table" id="operations-table">
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Сумма</th>
                            <th>Тип</th>
                            <th>Статья</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody id="operations-tbody">
                        <!-- Операции будут добавляться динамически -->
                    </tbody>
                </table>
                </div>
                
                <div class="summary" id="summary">
                    <div class="summary-item">
                        <h3>Итого доходов:</h3>
                        <div class="amount" id="total-income">0 руб.</div>
                    </div>
                    <div class="summary-item">
                        <h3>Итого расходов:</h3>
                        <div class="amount" id="total-expense">0 руб.</div>
                    </div>
                    <div class="summary-item" id="result-item">
                        <h3>Финансовый результат:</h3>
                        <div class="amount" id="financial-result">0 руб.</div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Настройка калькулятора
    setupCalculator() {
        const form = document.getElementById('calculator-form');
        const operationType = document.getElementById('operation-type');
        const operationItem = document.getElementById('operation-item');
        
        // Синхронизация типа операции со статьей
        operationType.addEventListener('change', () => {
            this.filterOperationItems();
        });
        
        // Фильтрация статей при изменении типа
        operationItem.addEventListener('change', () => {
            const selectedOption = operationItem.options[operationItem.selectedIndex];
            if (selectedOption.dataset.type && selectedOption.dataset.type !== operationType.value) {
                operationType.value = selectedOption.dataset.type;
            }
        });
        
        // Обработка формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addOperation();
        });
        
        // Первоначальная фильтрация статей
        this.filterOperationItems();
        
        // Обновление таблицы операций
        this.updateOperationsTable();
    },
    
    // Фильтрация статей по типу операции
    filterOperationItems() {
        const operationType = document.getElementById('operation-type').value;
        const operationItem = document.getElementById('operation-item');
        
        Array.from(operationItem.options).forEach(option => {
            if (option.value === '') {
                return; // Оставляем первую опцию "Выберите статью"
            }
            if (option.dataset.type === operationType) {
                option.style.display = 'block';
            } else {
                option.style.display = 'none';
            }
        });
        
        // Сбрасываем выбор, если текущая статья не подходит
        const selectedOption = operationItem.options[operationItem.selectedIndex];
        if (selectedOption.dataset.type && selectedOption.dataset.type !== operationType) {
            operationItem.value = '';
        }
    },
    
    // Добавление операции
    addOperation() {
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('operation-type').value;
        const itemValue = document.getElementById('operation-item').value;
        
        if (!amount || amount <= 0 || !itemValue) {
            alert('Заполните все поля корректно!');
            return;
        }
        
        const itemLabels = {
            'revenue': 'Выручка от продаж',
            'services': 'Услуги',
            'other-income': 'Прочие доходы',
            'purchase': 'Закупка товаров',
            'salary': 'Зарплата',
            'rent': 'Аренда',
            'utilities': 'Коммунальные услуги',
            'marketing': 'Реклама и маркетинг',
            'transport': 'Транспортные расходы',
            'other-expense': 'Прочие расходы'
        };
        
        const operation = {
            id: Date.now(),
            date: new Date().toLocaleDateString('ru-RU'),
            amount: amount,
            type: type,
            item: itemLabels[itemValue]
        };
        
        this.operations.push(operation);
        this.updateOperationsTable();
        
        // Очистка формы
        document.getElementById('calculator-form').reset();
    },
    
    // Обновление таблицы операций
    updateOperationsTable() {
        const tbody = document.getElementById('operations-tbody');
        tbody.innerHTML = '';
        
        if (this.operations.length === 0) {
            const row = tbody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 5;
            cell.textContent = 'Нет операций. Добавьте первую операцию.';
            cell.style.textAlign = 'center';
            cell.style.color = '#999';
            cell.style.padding = '2rem';
        } else {
            this.operations.forEach(operation => {
                const row = tbody.insertRow();
                row.insertCell().textContent = operation.date;
                row.insertCell().textContent = operation.amount.toFixed(2) + ' руб.';
                row.insertCell().textContent = operation.type === 'income' ? 'Доход' : 'Расход';
                row.insertCell().textContent = operation.item;
                
                const deleteCell = row.insertCell();
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Удалить';
                deleteBtn.className = 'delete-btn';
                deleteBtn.onclick = () => this.deleteOperation(operation.id);
                deleteCell.appendChild(deleteBtn);
            });
        }
        
        this.updateSummary();
    },
    
    // Удаление операции
    deleteOperation(id) {
        this.operations = this.operations.filter(op => op.id !== id);
        this.updateOperationsTable();
    },
    
    // Обновление итогов
    updateSummary() {
        const totalIncome = this.operations
            .filter(op => op.type === 'income')
            .reduce((sum, op) => sum + op.amount, 0);
        
        const totalExpense = this.operations
            .filter(op => op.type === 'expense')
            .reduce((sum, op) => sum + op.amount, 0);
        
        const result = totalIncome - totalExpense;
        
        document.getElementById('total-income').textContent = totalIncome.toFixed(2) + ' руб.';
        document.getElementById('total-expense').textContent = totalExpense.toFixed(2) + ' руб.';
        document.getElementById('financial-result').textContent = result.toFixed(2) + ' руб.';
        
        const resultItem = document.getElementById('result-item');
        resultItem.className = 'summary-item';
        if (result > 0) {
            resultItem.classList.add('profit');
            document.getElementById('financial-result').textContent = '+ ' + result.toFixed(2) + ' руб. (Прибыль)';
        } else if (result < 0) {
            resultItem.classList.add('loss');
            document.getElementById('financial-result').textContent = result.toFixed(2) + ' руб. (Убыток)';
        } else {
            document.getElementById('financial-result').textContent = '0 руб. (Ноль)';
        }
    },
    
    // Контент: Тренажер проводок
    getTransactionContent() {
        return `
            <div class="content-section">
                <h2>Проводка (Дебет/Кредит)</h2>
                
                <div class="trainer-explanation">
                    <h3>Что такое проводка?</h3>
                    <p>
                        Каждая хозяйственная операция в бухгалтерском учете отражается двойной записью: 
                        один счет записывается по Дебету (Дт), другой — по Кредиту (Кт). Сумма по 
                        дебету всегда равна сумме по кредиту.
                    </p>
                    <div class="trainer-example">
                        Пример: Оплатили аренду наличными 10 000 руб.<br>
                        Дт "Расходы по аренде" 10 000 руб. / Кт "Наличные деньги" 10 000 руб.
                    </div>
                </div>
                
                <div class="task-selector">
                    <label for="task-select"><strong>Выберите задачу:</strong></label>
                    <select id="task-select" class="task-select">
                        ${this.transactionTasks.map((task, index) => 
                            `<option value="${task.id}" ${task.id === this.currentTask ? 'selected' : ''}>Задача ${index + 1}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="trainer-form">
                    <div class="trainer-scenario">
                        <p><strong>Ситуация:</strong></p>
                        <p id="task-description">${this.transactionTasks[this.currentTask].description}</p>
                        <p><strong>Задача:</strong> Выберите правильную проводку (Дебет и Кредит).</p>
                    </div>
                    
                    <form id="trainer-form">
                        <div class="trainer-selects">
                            <div class="form-group">
                                <label for="debit-account">Дебет (Дт):</label>
                                <select id="debit-account" required>
                                    <option value="">Выберите счет</option>
                                    <option value="cash">Касса (Наличные деньги)</option>
                                    <option value="bank">Расчетный счет</option>
                                    <option value="revenue">Выручка</option>
                                    <option value="expenses">Расходы</option>
                                    <option value="goods">Товары</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="credit-account">Кредит (Кт):</label>
                                <select id="credit-account" required>
                                    <option value="">Выберите счет</option>
                                    <option value="cash">Касса (Наличные деньги)</option>
                                    <option value="bank">Расчетный счет</option>
                                    <option value="revenue">Выручка</option>
                                    <option value="expenses">Расходы</option>
                                    <option value="goods">Товары</option>
                                </select>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn">Сверить</button>
                    </form>
                    
                    <div id="trainer-result" class="result-message"></div>
                </div>
            </div>
        `;
    },
    
    // Настройка тренажера проводок
    setupTransactionTrainer() {
        // Обработка выбора задачи
        const taskSelect = document.getElementById('task-select');
        taskSelect.addEventListener('change', (e) => {
            this.currentTask = parseInt(e.target.value);
            this.loadTask(this.currentTask);
        });
        
        // Обработка формы проверки
        const form = document.getElementById('trainer-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.checkTransaction();
        });
    },
    
    // Загрузка выбранной задачи
    loadTask(taskId) {
        const task = this.transactionTasks[taskId];
        document.getElementById('task-description').textContent = task.description;
        
        // Сброс формы и результата
        document.getElementById('trainer-form').reset();
        const resultMessage = document.getElementById('trainer-result');
        resultMessage.classList.remove('show');
        resultMessage.textContent = '';
    },
    
    // Проверка правильности проводки
    checkTransaction() {
        const debitAccount = document.getElementById('debit-account').value;
        const creditAccount = document.getElementById('credit-account').value;
        const resultMessage = document.getElementById('trainer-result');
        
        // Получаем правильные ответы для текущей задачи
        const currentTask = this.transactionTasks[this.currentTask];
        const correctDebit = currentTask.correctDebit;
        const correctCredit = currentTask.correctCredit;
        
        if (debitAccount === correctDebit && creditAccount === correctCredit) {
            resultMessage.textContent = currentTask.explanation;
            resultMessage.className = 'result-message success show';
        } else {
            resultMessage.textContent = 'Попробуйте еще раз! ' + currentTask.hint;
            resultMessage.className = 'result-message error show';
        }
    }
};

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

