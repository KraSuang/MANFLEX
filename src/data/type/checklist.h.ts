export type Checklist = ChecklistSection[]

type ChecklistSection = {
    name: String
    top: ChecklistItem[]
    below?: ChecklistItem[] | null
    status: 'none' | 'check' | 'skip'
}

type ChecklistItem = {
    title: String,
    equip: String,
    status: 'none' | 'check' | 'skip'
    description? : String[]
}
