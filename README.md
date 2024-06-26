# Онлайн библиотека "My Book Shelf"

- Deploy: https://my-book-shelf-vladtarnovskiy.vercel.app/

## Используемые технологии

- **_npm/yarn_** - Менеджер пакетов.
- **_Angular_** - Framework для создания пользовательских интерфейсов.
- **_RxJs_** - Управление асинхронными операциями и событиями в приложении.
- **_NgRx_** - Для управления внутренним состоянием приложения.
- **_Firebase-store_** - Облачное хранилище для данных (данные пользователя, добавленные, недавние и любимые книги, обзоры на книги)
- **_Firebase-Authentication_** - Система аутентификации пользователей на основе токенов на платформе firebase
- **_ngx-translate_** - библиотека для перевода (en/ru)

- **_Google Books API_** - Библиотека c информацией о книгах

## Функционал:

- регистрация пользователя
- логин пользователя
- отправка подтверждения на электронную почту
- просмотр каталога книг на главной странице
- поиск книг по названию, автору или категории
- отображение полной информации о книге
- elastic search
- возможность добавления книг в избранное
- смены языка
- Реализовать добавление своих книг в определённом формате
- Удаление и редактирование названия и описания своих книг
- страницу для чтения созданных книг
- страницу для чтения google книг
- смена темы
- возможность оставлять обзоры лайки к ним под книгами

## Дополнительный функционал

- Приложение развернуто на хостинге vercel
- Настроено CI/CD, используя [GitHub Actions](https://github.com/features/actions).
- Проект разрабатывался с помощью eslint, prettier, husky.

### В проекте реализована:

- Обработка ошибок
- Реализация выполнена без использования UI библиотек.
- Валидация всех текстовых полей
- Оптимизацию дизайна под мобильные устройства.
- Пагинация больших списков.
- Покрытие тестами приложения.
- Анимации при наведения, нажатии на кнопки, прокрутки карусели и слайдеров, появлении элементов на странице при рендере и скролле.

## Описание экранов

1. #### Страница регистрации

Страница регистрации содержит поля Name, Email, Password, Confirm Password и кнопку Register.

Добавлена валидация полей email, password, а также проверено сходство введённых паролей пароля. Также выводится информация, если пользователь не верно ввёл данные.

Реализована отправка ссылку подтверждения пользователю на почту.

2. #### Страница логина

Страница логина содержит поля Email, Password и кнопку Login.

Добавлена валидация полей email, password, а также выводится информация, если пользователь не верно ввёл данные.

Пользователь может войти с помощью Google или GitHub

3. #### Главная страница

Главная страница как и все остальные включает в себя меню слева, которое предполагает реализацию перехода между страницами, а также смену темы.

Поле для поиска книг по определённым критериям, которые может выбрать пользователь(All, Title, Author и т.д.).

Переключатель языка в приложении.

Иконка и имя пользователя с выпадающим списком.

Блок с цитатами авторов.

Главный блок отображения каталога книг.

Блоки недавно посещенных и рекомендуемых книг.

Есть по Show all есть возможность подробного просмотра рекомендуемых и недавних книг.

4. #### Страница Search

При переходе на страницу Search отображаются все найденные книги, или сообщение, что книги не найдены если их нет.

На странице представлен список найденных книг в виде списка с краткой информацией, а также с возможностью добавления определённой книги в избранное и кнопка "Preview" для перехода на страницу с более детальной информацией о книге.

Также реализован выпадающий список для книг с поиском по категории.

Реализована пагинацию на этой странице.

5. #### Страница Book Preview

На этой странице представлена детальная информация о книге, указан рейтинг книги, а также отзывы.

Есть возможность добавлять отзывы, удалять их и ставить лайки.

При клике на автора книги, осуществляется поиск по этому автору.

6. #### Страница Favorites

На данной странице находятся книги которые пользователь добавил в избранное (свои и google книги), а также возможность просмотра детальной информации.

7. #### Страница My Books

Данная страница предоставляет список книг загруженных пользователем.

Есть возможность добавить книгу в избранное или удалить ее.

9. #### Страница Upload Books

Страница предоставляет возможность загрузить собственную книгу, пользователю обязательно необходимо указать, имя автора, описание, а также возможность загрузить обложку книги, и сам файл книги в формате pdf.

При клике на кнопку "Upload", пользователя перебрасывает на страницу "My Books", где отображаются все книги загруженные пользователем.

10. #### Страница Read Book

Реализована возможность просмотра загруженного файла книги.

Есть возможность чтения книги в полноэкранном режиме.

11. #### Страница Read Google Book

Реализована возможность просмотра google книги.

Есть возможность чтения книги в полноэкранном режиме.

12. #### Recent books

Содержит недавно посещенные книги за период 2 недели.

13. #### Recommended books

Содержит сгенерированный список рекомендаций google книг.

14. #### Not Found page
