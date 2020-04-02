# Easy2Manage

#### Язык реализации: Java  
#### Технологии: Angular, Spring Boot, MySql 
#### Среда разработки: Intellij idea

### Содержание
1. [Часть 1](#part1) <br>
  1.1 [Тип приложения](#1) <br>
  1.2 [Выбор стратегии развертывания](#2) <br>
  1.3 [Выбор технологии](#3) <br>
  1.4 [Показатели качества](#4) <br>
    	1.4.1 [Графический дизайн и взаимодействие с пользователем](#4.1) <br>
		1.4.1.1 [Стандартный дизайн](#4.1.1) <br>
		1.4.1.2 [Навигация](#4.1.2) <br>
	1.4.2 [Производительность и стабильнотсть](#4.2) <br>
		1.4.2.1 [Стабильность](#4.2.1) <br>
		1.4.2.2 [Производительность](#4.2.2) <br>
		1.4.2.3 [Качество визуализации](#4.2.3) <br>
2. [Часть 2](#part2) <br>
	2.1 ["To Be Архитектура"](#to_be) <br>
  	2.2 ["As Is" архитектура](#as_is) <br>
3. [Часть 3](#part3)   
  3.1 [Сравнение и анализ](#compare_and_analysis)   
  3.2 [Пути улучшения архитектуры](#way_upgrade)  


## Часть 1 <a name="part1"></a>

### 1. Тип приложения <a name="1"></a>
Проект предполагает проектирование и создание web-приложения для управления проектами на языке Java с использованием технологий Angular, Spring Boot, MySql.

### 2. Выбор стратегии развертывания <a name="2"></a>
Установка и развертывание приложения предполагается посредством запуска исполняемого .war архива, собранного разработчиками. Данный архив можно будет скачать из сети или получить копию с флэш-накопителя.

### 3. Выбор технологии <a name="3"></a>
Выбор технологий обусловлен простотой их осваивания и использования, а также их популярностью.
Язык Java выбран по причине большого количества java-разработчиков в команде. Также он предоставляет большую вариативность функциональности для разработки, а также Spring framework. 
Spring Boot позволяет упростить процесс разработки встроенными возможностями. Данный фреймворк предоставляет все необходимые возможности для создания полноценного веб-приложения, используя технологию внедрения зависимостей и инверсии управлени.
Angular позволяет создавать UI "на ходу", без необходимости пересобирать проект при добавлении каждой новой строчки. Это один из самых современных фреймворков для создания UI, использующий typescript. 

### 4. Показатели качества <a name="4"></a>
#### 4.1. Качества дизайна<a name="4.1"></a>
##### 4.1.1. Удобство и простота обслуживания <a name="4.1.1"></a>
* В приложении реализован принцип единой ответственности, что позволяет добавлять или изменять функциональности отдельных компонент, не влияя на другие компоненты.
* Интерфейсы системы легко расширяются и не завязаны на реализации. 
##### 4.1.2. Концептуальная целостность <a name="4.1.2"></a>
* Код отдельно взятых микросервисов соответствует одному стилю написания кода.
* Названия переменных отражают их область использования.
#### 4.2. Качества времени выполнения <a name="4.3"></a>
##### 4.2.1. Масштабируемость <a name="4.3.1"></a>
* Увеличение количества активных пользователей, проектов не влияет на производительность системы.
* Максимальное колличество проектов, создаваемых одним пользователем ограничено.
##### 4.2.2. Безопасность <a name="4.3.2"></a>
* Благодаря обработке ошибок и исключений обычный пользователь не может повлиять на работоспособность системы.
* Данные о пользователях хранятся в криптостойком виде.
#### 4.3. Качества системы <a name="4.3"></a>
##### 4.3.1. Тестируемость <a name="4.3.1"></a>
* Система позволяет достаточно просто создать критерий проверки для системы и ее компонентов и выполнить эти тесты.
#### 4.4. Качества взаимодействия с пользователем <a name="4.3"></a>
##### 4.4.1. Удобство и простота использования <a name="4.3.1"></a>
* При наведении курсором на элементы пользовательского интерфейса появляются подсказки.
## Часть 2 <a name="part2"/></a>

### To Be Архитектура: <a name="to_be"></a>
Архитектурное решение команды по реализации идеи можно увидеть на [структурной схеме](https://github.com/IlyaMarkevichV/Easy2Manage/blob/master/Documentation/diagrams/structure/%D0%A1%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%BD%D0%B0%D1%8F%20%D1%81%D1%85%D0%B5%D0%BC%D0%B0.PNG) <br>
Наглядный пример желаемого GUI приведен с помощью [мокапов](https://github.com/IlyaMarkevichV/Easy2Manage/tree/master/Documentation/mockup) <br>
  
### As is architecture:<a name="as_is"/></a>
[Диаграмма классов](https://github.com/IlyaMarkevichV/Easy2Manage/blob/master/Documentation/diagrams/class/class-diagram.jpg)  <br>

## Часть 3 <a name="part3"/></a>

**1. Сравнение и анализ** <a name="compare_and_analysis"/></a>
На данный момент архитектура AS-IS не имеет отличительных особенностей от архитектуры TO-BE. При разработке приложения команда придерживалась структурной схемы, которая представлена в виде диаграммы компонентов + развертывания. Также команда старается жестко придерживаться изначального решения в виде схемы базы данных и мокапов. При сравнении AS-IS и TO-BE архитектур можно увидеть сходства, хотя архитектуры представлены разными диаграммами. На AS-IS диаграмме классов можно заметить, что, к примеру, классы компонента Controller используют классы компонента Facade, что соответствует TO-BE архитектуре.

**2. Пути улучшения архитектуры** <a name="way_upgrade"/></a>
Одним из возможных путей улучшения архитектуры является разделение frontend части на функциональные компоненты([E2M-16](https://trello.com/c/74Fto685/36-e2m-16-dev-%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-frontend-%D0%BD%D0%B0-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B)). Также имеется возможность вынесения модуля безопасности в отдельный микросервис, что позволит, например, заменять данный модуль([E2M-17](https://trello.com/c/5eFBb2An/37-e2m-17-dev-%D0%B2%D1%8B%D0%BD%D0%B5%D1%81%D0%B5%D0%BD%D0%B8%D0%B5-security-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8F-%D0%B2-%D0%BE%D1%82%D0%B4%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9-%D0%BC%D0%B8%D0%BA%D1%80%D0%BE%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81)). 
