# Паралельні маршрути для фільтрації нотаток за тегом

## Структура проекту

### Новий компонент SidebarNotes
- **Локація**: `app/notes/filter/@sidebar/SidebarNotes.tsx`
- **Тип**: Client Component
- **Функціональність**: 
  - Відображає меню з доступними тегами
  - Показує активний тег за поточним URL маршрутом
  - Надає посилання для фільтрації нотаток за тегом

### Доступні теги
```javascript
'Todo', 'Work', 'Personal', 'Meeting', 'Shopping', 'All notes'
```

## Маршрути

### Основні маршрути фільтрації
- `/notes/filter/all` - Всі нотатки без фільтрації
- `/notes/filter/Work` - Нотатки з тегом "Work"
- `/notes/filter/Todo` - Нотатки з тегом "Todo"
- `/notes/filter/Personal` - Нотатки з тегом "Personal"
- `/notes/filter/Meeting` - Нотатки з тегом "Meeting"
- `/notes/filter/Shopping` - Нотатки з тегом "Shopping"

### Catch-all маршрут
- **Локація**: `app/notes/filter/[...filters]/page.tsx`
- **Функціональність**: Обробляє всі маршрути фільтрації і отримує нотатки з бекенду

## Паралельні маршрути

Використовується Next.js паралельна маршрутизація через segment `@sidebar`:
- **Layout**: `app/notes/filter/layout.tsx` - визначає структуру з sidebar і mainContent
- **Sidebar segment**: `@sidebar/` - паралельний сегмент для меню фільтрації
- **Main segment**: `[...filters]/` - основної контент з нотатками

Під час переходу між тегами (наприклад з `/notes/filter/Work` на `/notes/filter/Todo`):
- Оновлюється тільки сегмент `[...filters]` зі списком нотаток
- Sidebar залишається без змін
- Не перезавантажується вся сторінка

## API функції

### getNotesByTag
```typescript
export const getNotesByTag = async (tag?: string): Promise<ResponseNoteList>
```
- Якщо `tag` не передається або дорівнює `'all'` - повертає всі нотатки
- Якщо передається конкретний тег - повертає тільки нотатки з цим тегом
- Параметр передається як `tag` у query параметрах

## Стилізація

### CSS класи
- `.filterLayout` - основний flex контейнер
- `.mainContent` - область для контенту нотаток
- `.sidebar` - область сайдбару
- `.menuList` / `.menuItem` / `.menuLink` - стилі для меню
- `.active` - клас активного посилання з підсвічуванням

## Приклад використання

### Базове меню фільтрації
```tsx
import SidebarNotes from '@/app/notes/filter/@sidebar/SidebarNotes';

<SidebarNotes />
```

### Отримання нотаток по тегу
```tsx
import { getNotesByTag } from '@/lib/api';

// Всі нотатки
const allNotes = await getNotesByTag();

// Нотатки з тегом "Work"
const workNotes = await getNotesByTag('Work');
```

## Особливості реалізації

1. **Статичний список тегів**: Оскільки на бекенді немає маршруту для отримання списку тегів, він визначений прямо в коді компонента
2. **Client Component**: SidebarNotes - це Client Component для визначення активного тегу за поточним маршрутом
3. **Catch-all маршрут**: Використовується `[...filters]` для гнучкої обробки різних параметрів фільтрації
4. **Без перезавантаження**: Завдяки паралельним маршрутам, при змінені тегу фільтрується лише контент, сайдбар не перерісовується

## Примітки

- При натисканні на посилання в сайдбарі URL змінюється на `/notes/filter/{tag}`
- Сайдбар автоматично підсвічує активний тег за поточним маршрутом
- На бекенді параметр фільтрації передається як `tag` у query string (не `categoryId`)
- Для фільтру "All notes" тег не передається у запит (параметр `tag` опускається)
