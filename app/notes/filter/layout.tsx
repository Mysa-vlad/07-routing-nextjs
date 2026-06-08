import React from 'react'

interface Props {
  children: React.ReactNode
  sidebar: React.ReactNode
}
const NoteListLayout = ({ children, sidebar }: Props) => {
  return (
    <div >
      {sidebar}
      {children}
    </div>
  )
}

export default NoteListLayout