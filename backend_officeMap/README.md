# Карта офиса (тестовое задание)
Создать интерактивную карту с возможностью просмотра и добавления рабочих мест сотрудников, используя `Vue.js`.
Карта должна создаваться на основе изображения, загруженного через панель администратора.
Визуальные и технические решения остаются на Ваше усмотрение.
Итогом задания является демонстрация MVP продукта, в тех объемах, которые Вы считаете достаточными для демонстрации ваших навыков.

## Запуск backend
### Запуск с помощью Docker
Для запуска локального backend сервера для разработки c помощью докера, находясь в папке проекта, исполните команды:
```bash
docker build . -t backend
docker run -p 8000:8000 backend
```
В контейнере будет установлен `python3.12` и библиотеки зависимостей (можно посмотреть в файле `requirements.txt` в корне проекта).
Проект будет запущен по адресу `127.0.0.1:8000`

### Запуск без Docker
Для запуска без Docker потребуется установленный Python.
Рекомендуется создать виртуальное окружение и последующие действия выполнять в нём.
В корневой папке проекта выполните команду:
```bash
python -m venv .venv
```
Затем нужно активировать виртуальное окружение:

Для Windows:
```bash
.venv\Scripts\activate
```
Для Linux:
```bash
source .venv/bin/activate
```

Теперь нужно установить библиотеки зависимостей из файла `requirements.txt`:
```bash
pip install -r requirements.txt
```

После этого примените миграции к базе данных:
```bash
python manage.py migrate
```
И запустите тестовый сервер:
```bash
python manage.py runserver
```
Сервер будет запущен по адресу `127.0.0.1:8000`

### Порт для frontend части
По умолчанию разрешённый порт для frontend части `5173`.
Если нужно добавить другой порт, то в корне проекта backend части нужно добавить файл `.env` и в него добавить следующий параметр:
```
CORS_ORIGIN_WHITELIST=http://127.0.0.1:5173,http://localhost:5173
```
Где вместо `5173` нужно вписать свой порт.

## Функционал
### Использование панели администратора
`<base url>/admin/` - адрес панели администратора django.
Для создания суперпользователя в консоле:
```bash
python manage.py createsuperuser
```
Затем можно заходить в панель администратора django.
Создайте план помещения, указав его наименование и добавив изображение карты.


### API endpoints
`plans/` [`GET`, `POST`] - список планов помещений.

`workplaces/` [`GET`, `POST`] - список всех рабочих мест на всех планах.

`plans/<id плана>/` [`GET`, `PUT`, `PATCH`, `DELETE`] - объект плана со списком всех его рабочих мест.
Список полей:
- `id` - уникальный идентификатор плана;
- `workplaces` - список рабочих мест данного плана;
- `name` - наименование плана;
- `img` - изображение плана;
- `width` - автозаполняемое поле при сохранении объекта изображения;
- `height` - автозаполняемое поле при сохранении объекта изображения;


`workplaces/<id рабочего места>/` [`GET`, `PUT`, `PATCH`, `DELETE`] - объект рабочего места.
Список полей:
- `id` - уникальный идентификатор рабочего места;
- `x` - координата по оси X;
- `y` - координата по оси Y;
- `plan` - уникальный идентификатор плана, к которому привязано данное рабочее место;
- `employee` - уникальный идентификатор сотрудника, к которому привязано данное рабочее место (связь один к одному);

Для обозначения информации о сотруднике достаточно вывода его id.