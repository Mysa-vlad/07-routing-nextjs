import { getNotesByTag } from '@/lib/api'
import Link from 'next/link'
import css from "../../NotesPage.module.css"

interface Props {
  params: Promise<{ filters: string[] }>
}

const NotesFilterPage = async ({ params }: Props) => {
  const res = await params
  const tag = res.filters?.[0] || 'all'

  // Отримуємо нотатки, відфільтровані за тегом
  const noteResponse = await getNotesByTag(tag === 'all' ? undefined : tag)

  return (
    <div className={css.container}>
      <h2>Notes {tag !== 'all' ? `- ${tag}` : ''}</h2>
      {noteResponse?.notes && noteResponse.notes.length > 0 ? (
        <ul>
          {noteResponse.notes.map((note) => (
            <li key={note.id}>
              <Link href={`/notes/${note.id}`}>{note.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes found</p>
      )}
    </div>
  )
}

export default NotesFilterPage