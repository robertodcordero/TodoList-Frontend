export interface Task {
  id: number
  title: string
  description: string
  ownerId: string
  created: Date
  isCompleted: boolean
  isDeleted: boolean
}
