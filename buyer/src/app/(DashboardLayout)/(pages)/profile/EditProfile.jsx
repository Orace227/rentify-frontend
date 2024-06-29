'use client';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button, Typography, Box } from '@mui/material';

import { styled } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';

import axios from 'axios';
import { useSeller } from '@/app/hooks/useSeller';

function EditProfile({ showEditProfilePic, setShowEditProfilePic }) {
  const [profileImage, setProfileImage] = useState(null); // State to store the selected profile image
  const { seller } = useSeller();

  const onDrop = (acceptedFiles) => {
    setProfileImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    if (!profileImage) {
      console.log('nothing provided go fuck your self and provide a fucking image');
      return;
    }
    console.log('this is profile image   ', profileImage);
    console.log('this is the data of the customer from the hook', customer);
    try {
      const formData = new FormData();
      formData.append('profileImage', profileImage);
      const response = await axios.post('/customer/upload-customerProfile-img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          customerId: customer.customerId,
        },
      });
      updateCustomer({ profileImagePath: response.data.data.path });
      // updateServiceProvider({ profileImage: response.data.data.path });
      console.log('Image uploaded successfully:', response.data);

      // Optionally, you can update the profile image in your UI here
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error
    }
  };

  const ProfileImage = styled(Box)(() => ({
    backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
    borderRadius: '50%',
    width: '200px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  return (
    <>
      <Dialog
        maxWidth="xs"
        open={showEditProfilePic}
        onClose={() => setShowEditProfilePic(false)}
        fullWidth
      >
        <DialogTitle variant="subTitle2">Edit Your Profile Pic</DialogTitle>
        <div className="mx-5 my-3">
          <DialogContent>
            <Box className="flex flex-col justify-center items-center ">
              <div className="">
                <ProfileImage className=" relative ">
                  <Avatar
                    src={`http://localhost:8000/api/v1/customer/customerProfileImages/${customer?.profileImagePath}`}
                    alt="profileImage"
                    sx={{
                      borderRadius: '50%',
                      width: '190px',
                      height: '190px',
                      border: '4px solid #fff',
                    }}
                  />
                </ProfileImage>
              </div>
            </Box>
            <div {...getRootProps()} style={{ cursor: 'pointer' }}>
              <Box
                className={` h-[150px] mt-5 flex flex-col justify-center items-center border border-dashed ${
                  isDragActive ? 'border-blue-500' : ''
                }`}
              >
                {/* Dropzone for uploading profile picture */}
                <input {...getInputProps()} />

                <Typography variant="heading1" className={`${isDragActive ? 'text-blue-600' : ''}`}>
                  {isDragActive
                    ? 'Drop the image here'
                    : 'Drag and drop image here, or click to select'}
                </Typography>
              </Box>
            </div>
          </DialogContent>

          <DialogActions className=" flex justify-end">
            <Box>
              <Button
                color="primary"
                size="large"
                fullWidth
                onClick={() => setShowEditProfilePic(false)}
              >
                Close
              </Button>
            </Box>
            <Box>
              <Button
                sx={{
                  bgcolor: (theme) => theme.palette.success.light,
                  color: (theme) => theme.palette.success.main,
                  borderRadius: '8px',
                }}
                // variant="contained"
                size="large"
                fullWidth
                onClick={handleSubmit}
              >
                Update Profile
              </Button>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export default EditProfile;
