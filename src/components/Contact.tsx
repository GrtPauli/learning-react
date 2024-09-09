import { IContact } from "../types/"

interface IProps {
    contact: IContact
    onDelete: (contactId: string) => void
    onEdit: () => void
}

export default function Contact({ contact, onDelete, onEdit }: IProps) {
  return (
    <div className="bg-green-300 flex justify-between px-3 py-2.5 rounded-lg">
    <div className=""> 
      <div className="flex items-center gap-1">
        <p className="font-bold">{contact?.contactName} -</p>
        <p className="font-bold text-red-500">{contact?.phoneNumber}</p>
      </div>
      <h2 className="text-sm">{contact?.location}</h2>
    </div>

    <div className="flex gap-2">
      <button onClick={onEdit} className="btn btn-warning"> 
        Edit
      </button>
      <button onClick={() => onDelete(contact.id as any)} className="btn btn-danger"> 
        Delete
      </button>
    </div>
  </div>
  )
}
