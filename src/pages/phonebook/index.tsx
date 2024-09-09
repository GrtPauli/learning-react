import { useState } from "react";
import { AddContactForm, Contact } from "../../components";
import { IContact } from "../../types/";

export default function PhoneBookPage() {
  const [contactList, setContactList] = useState<IContact[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [contact, setContact] = useState<IContact | null>(null);

  const handleSubmit = (contact: IContact) => {
    setContactList([contact, ...contactList]);
  };

  const handleDelete = (contactId: string) => {
    const newData = contactList?.filter((item) => item.id !== contactId);
    setContactList(newData);
  };

  const handleUpdate = (contact: IContact) => {
    const newData = contactList?.filter((item) => item.id !== contact.id);
    setContactList([contact, ...newData]);
    setContact(null);
  };

  return (
    <div className="bg-blue-700 h-screen flex flex-1 p-10">
      <div className="bg-white flex-1 flex flex-col w-[75%] p-5 rounded-tl-3xl rounded-br-3xl overflow-auto">
        {showForm && (
          <AddContactForm
            onUpdate={handleUpdate}
            onSave={handleSubmit}
            onDismiss={() => setShowForm(false)}
            editFormData={contact as any}
          />
        )}

        <div className="">
          <div className="flex justify-between items-center  border-b-[1px] border-blue-700 pb-3">
            <h1 className="font-bold text-xl">Contact List</h1>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-700 text-sm px-5 rounded-full text-white py-3 shadow-2xl hover:bg-white hover:!text-blue-700 duration-150 ease-in"
              >
                Add Contact
              </button>
            )}
          </div>

          {contactList?.length > 0 ? (
            <div className="mt-[25px] flex gap-3 flex-col">
              {contactList?.map((item) => (
                <Contact
                  onEdit={() => {
                    setShowForm(true);
                    setContact({ ...item, isEdit: true } as any);
                  }}
                  onDelete={handleDelete}
                  contact={item}
                  key={item.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center flex items-center justify-center p-10">
              <p>No Contact Added</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
