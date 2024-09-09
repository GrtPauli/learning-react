import { useEffect, useState } from "react";
import { IContact } from "../types/";

interface IProps {
  onUpdate: (contact: IContact) => void;
  onSave: (contact: IContact) => void;
  onDismiss: () => void;
  editFormData?: IContact & { isEdit?: boolean };
}

const generateUniqueId = () => {
  const length = 10;
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
};

export default function AddContactForm({
  editFormData,
  onSave,
  onDismiss,
  onUpdate,
}: IProps) {
  const [formData, setFormData] = useState<IContact & { isEdit?: boolean }>({
    contactName: "",
    location: "",
    phoneNumber: "",
  });
  const [error, showError] = useState<boolean>(false);

  const handleSave = () => {
    if (
      formData.contactName !== "" &&
      formData.location !== "" &&
      formData.phoneNumber !== ""
    ) {
    onSave({ ...formData, id: generateUniqueId() });
      handleDismiss();
    } else {
      showError(true);
    }
  };

  const handleUpdate = () => {
    if (
      formData.contactName !== "" &&
      formData.location !== "" &&
      formData.phoneNumber !== ""
    ) {
      onUpdate(formData);
      handleDismiss();
    } else {
      showError(true);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDismiss = () => {
    setFormData({
      contactName: "",
      location: "",
      phoneNumber: "",
    });
    onDismiss();
  };

  useEffect(() => {
    if (
      error &&
      formData.contactName !== "" &&
      formData.location !== "" &&
      formData.phoneNumber !== ""
    ) {
      showError(false);
    }
  }, [formData, error]);

  useEffect(() => {
    if (editFormData) {
      setFormData(editFormData);
    }
  }, [editFormData]);

  return (
    <div className="mb-10">
      <h1 className="mb-10 font-bold text-xl">
        {formData?.isEdit ? "Update Contact" : "Add New Contact"}
      </h1>

      <form className="w-full">
        <div className="mb-10">
          <div className="mb-3">
            <label className="form-label">Contact Name</label>
            <input
              type="text"
              className="form-control"
              name="contactName"
              placeholder=""
              value={formData.contactName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              placeholder=""
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder=""
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && (
          <p className="text-center text-red-600 my-5">
            * All Fields Are Required
          </p>
        )}

        <div className="flex gap-5">
          <button
            onClick={formData?.isEdit ? handleUpdate : handleSave}
            type="button"
            className="bg-blue-700 w-full rounded-full text-white py-3 shadow-2xl"
          >
            {formData?.isEdit ? "Update Contact" : "Save Contact"}
          </button>
          <button
            onClick={handleDismiss}
            type="button"
            className="border-blue-700 border-[1px] text-blue-700 w-full rounded-full py-3 shadow-2xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
