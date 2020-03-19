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
#### 4.1. Графический дизайн и взаимодействие с пользователем <a name="4.1"></a>
##### 4.1.1. Удобный дизайн <a name="4.1.1"></a>
* В приложении используется понятный и простой интерфейс.
##### 4.1.2. Навигация <a name="4.1.2"></a>
* Для более удобного просмотра продуктов будет добавлена пагинация.
* При нажатии кнопки "Домой" всегда происходит переход к главной странице приложения.
#### 4.2. Производительность и стабильнотсть <a name="4.3"></a>
##### 4.2.1. Стабильность <a name="4.3.1"></a>
* При работе приложения не должно происходить аварийных или вынужденных закрытий приложения, зависаний или других аномалий в его работе на любых устройствах.
##### 4.2.2. Производительность <a name="4.3.2"></a>
* Моментальная загрузка главной страницы приложения, содержащей список проектов.
##### 4.2.3. Качество визуализации <a name="4.3.3"></a>
* Отображение текста, виджетов и других элементов интерфейса без заметных искажений, смазываний или эффектов пикселизации на всех поддерживаемых размерах и разрешениях экрана компьютера.
* Отсутствие обрезанных букв или слов, где это не предусмотрено.
 
## Часть 2 <a name="part2"/></a>

### To Be Архитектура: <a name="to_be"></a>
Архитектурное решение команды по реализации идеи можно увидеть на [структурной схеме]() <br>
Наглядный пример желаемого GUI приведен с помощью [мокапов](https://github.com/IlyaMarkevichV/Easy2Manage/tree/master/Documentation/mockup) <br>
  
### As is architecture:<a name="as_is"/></a>
[Диаграмма классов](https://github.com/IlyaMarkevichV/Easy2Manage/blob/master/Documentation/diagrams/class-diagram.jpg)  <br>

## Часть 3 <a name="part3"/></a>

**1. Сравнение и анализ** <a name="compare_and_analysis"/></a>
На данный момент архитектура AS-IS не имеет отличительных особенностей от архитектуры TO-BE, поскольку она является довольно примитивной и не имеет сложных связей и решений реализации. Также команда старается жестко придерживаться изначального решения в виде схем, мокапов и диаграмм для воплощении идеи.

**2. Пути улучшения архитектуры** <a name="way_upgrade"/></a>
