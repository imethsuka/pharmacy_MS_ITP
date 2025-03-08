import { useState } from "react";
import { uploadPrescription } from "../../services/prescriptionService";

const UploadPrescription = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("prescription", file);

    await uploadPrescription(formData);
    alert("Prescription Uploaded!");
  };

  return (
    <div>
      <h2>Upload Prescription</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPrescription;
