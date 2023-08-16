import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast, Toaster } from 'react-hot-toast';

const Profile = () => {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleProfilePicUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("profilePic", selectedFile);

      const response = await fetch("/api/update-profile-pic", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("An error occurred while updating the profile picture");
    }
  };

  return (
    <>
      <h1>Welcome, {session?.user?.name}</h1>
      <img src={session?.user?.profilePic} alt="Profile" />

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleProfilePicUpdate}>Update Profile Picture</button>

      <Toaster />
    </>
  );
};

export default Profile;
