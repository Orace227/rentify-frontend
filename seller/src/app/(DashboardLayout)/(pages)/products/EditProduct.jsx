'use client';

import React, { useState } from 'react';
import { Box, Button, Grid, Alert, DialogActions, Typography } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import moment from 'moment';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomStar from '../../components/forms/theme-elements/CustomStar';
import Select from 'react-select';
import Link from 'next/link';
import { useTheme } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { IconPlus, IconX } from '@tabler/icons-react';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { InsertInvitation } from '@mui/icons-material';

const availabilityStatuses = [
  {
    value: 'available',
    label: 'Available',
  },
  {
    value: 'rented',
    label: 'Rented',
  },
];
const FurnitureCategories = [
  {
    value: 'sofa',
    label: 'Sofa',
  },
  {
    value: 'armchair',
    label: 'Armchair',
  },
  {
    value: 'loveseat',
    label: 'Loveseat',
  },
  {
    value: 'sectional',
    label: 'Sectional Sofa',
  },
  {
    value: 'recliner',
    label: 'Recliner',
  },
  {
    value: 'ottoman',
    label: 'Ottoman',
  },
  {
    value: 'coffee_table',
    label: 'Coffee Table',
  },
  {
    value: 'side_table',
    label: 'Side Table',
  },
  {
    value: 'console_table',
    label: 'Console Table',
  },
  {
    value: 'dining_table',
    label: 'Dining Table',
  },
  {
    value: 'dining_chair',
    label: 'Dining Chair',
  },
  {
    value: 'bar_stool',
    label: 'Bar Stool',
  },
  {
    value: 'bed',
    label: 'Bed',
  },
  {
    value: 'mattress',
    label: 'Mattress',
  },
  {
    value: 'dresser',
    label: 'Dresser',
  },
  {
    value: 'nightstand',
    label: 'Nightstand',
  },
  {
    value: 'wardrobe',
    label: 'Wardrobe',
  },
  {
    value: 'desk',
    label: 'Desk',
  },
  {
    value: 'bookcase',
    label: 'Bookcase',
  },
  {
    value: 'cabinet',
    label: 'Cabinet',
  },
  {
    value: 'bench',
    label: 'Bench',
  },
  {
    value: 'chaise_lounge',
    label: 'Chaise Lounge',
  },
  {
    value: 'futon',
    label: 'Futon',
  },
  {
    value: 'bean_bag',
    label: 'Bean Bag Chair',
  },
  {
    value: 'folding_chair',
    label: 'Folding Chair',
  },
  {
    value: 'stool',
    label: 'Stool',
  },
  {
    value: 'rocking_chair',
    label: 'Rocking Chair',
  },
  {
    value: 'room_divider',
    label: 'Room Divider',
  },
  {
    value: 'tv_stand',
    label: 'TV Stand',
  },
  {
    value: 'storage_bench',
    label: 'Storage Bench',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const categorySchema = Yup.object({
  label: Yup.string().required('Label is Required'),
  value: Yup.string().required('Value is Required'),
});
const availabilityStatusSchema = Yup.object({
  label: Yup.string().required('Label is Required'),
  value: Yup.string().required('Value is Required'),
});

const validationSchema = Yup.object({
  name: Yup.string().required('Product name is Required'),
  description: Yup.string().required('Product description is Required'),
  category: categorySchema,
  rentalPrice: Yup.string().required('Rental Price is Required'),
  availabilityStatus: availabilityStatusSchema,
  rentalStartDate: Yup.date()
    .min(moment(), 'Date & time must be after or equal to current date & time')
    .required('Date & time is required'),
  rentalEndDate: Yup.date()
    .min(moment().add(2, 'days'), 'Date & time must be at least two days from today')
    .required('Date & time is required'),
});

const AddProductForm = ({ row, showEditForm, setShowEditForm }) => {
  const theme = useTheme();
  const [images, setImages] = useState([]);

  const initialValues = {
    name: row.name,
    description: row.description,
    rentalPrice: row.rentalPrice,
    availabilityStatus: row.availabilityStatus,
    rentalStartDate: moment(),
    rentalEndDate: moment(),
    category: row.category,
  };
  const reactSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: theme.palette.mode === 'dark' ? '#171c23' : 'white', // Adjust control background color
      border: '1px solid #455670',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme.palette.mode === 'dark'
          ? '#2e2e2e'
          : '#f0f0f0'
        : 'transparent', // Adjust option background color
      color: state.isSelected
        ? theme.palette.mode === 'dark'
          ? 'white'
          : 'black'
        : theme.palette.text.primary, // Adjust option text color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme.palette.mode === 'dark' ? '#2e2e2e' : 'white', // Adjust menu background color
      zIndex: theme.zIndex.modal + 1,
    }),

    multiValue: (styles) => ({
      ...styles,
      backgroundColor: theme.palette.success.main, // Customize the background color of the selected chip
      color: theme.palette.success.main, // Customize the text color of the selected chip
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: theme.palette.primary.light, // Customize the color of the remove button
      ':hover': {
        backgroundColor: theme.palette.success.dark, // Customize the background color on hover
        color: theme.palette.background.default, // Customize the color on hover
      },
    }),

    singleValue: (styles) => ({
      ...styles,
      // backgroundColor: theme.palette.success.main, // Customize the background color of the selected chip
      color: theme.palette.success.main, // Customize the text color of the selected chip
    }),
  };

  const onDrop = (acceptedFiles) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true, // Allow multiple files
  });

  const uploadImage = async (formData) => {
    try {
      const uploadedImages = await axios.post('/uploadImage', formData);
      console.log(uploadedImages);
      return uploadedImages.data.urls;
    } catch (error) {
      console.log('error in uploading image', error);
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);
    if (images.length === 0) {
      console.log('no image provided');
      try {
        const updateProduct = await axios.post('/serviceProvider/updateFurniture', values);
        console.log(updateProduct);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('images', images);
        const imageUrls = await uploadImage(formData);
        values.imageUrls = imageUrls;
        const createdProduct = await axios.post('/serviceProvider/updateFurniture', values);
        console.log(createdProduct);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <>
      <Dialog maxWidth="lg" open={showEditForm} onClose={() => setShowEditForm(false)} fullWidth>
        <DialogTitle variant="subTitle2">Edit Your Profile Pic</DialogTitle>
        <div className="mx-5 my-3">
          <DialogContent>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, isSubmitting, setFieldValue }) => (
                <Form className="" fullWidth>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <CustomFormLabel htmlFor="name">
                          Product Name{<CustomStar />}
                        </CustomFormLabel>
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter Product Name"
                          as={CustomTextField}
                          variant="outlined"
                          // style={{ color: theme?.palette?.background?.default }}
                          fullWidth
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                          }}
                        >
                          <ErrorMessage name="name" />
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <CustomFormLabel htmlFor="description">
                          Product Description {<CustomStar />}
                        </CustomFormLabel>
                        <Field
                          id="description"
                          name="description"
                          type="text"
                          placeholder="Enter Product Description"
                          as={CustomTextField}
                          variant="outlined"
                          fullWidth
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                          }}
                        >
                          <ErrorMessage name="description" />
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <CustomFormLabel htmlFor="rentalPrice">
                          ₹ Enter Rental Price (per month){<CustomStar />}
                        </CustomFormLabel>
                        <Field
                          id="rentalPrice"
                          name="rentalPrice"
                          type="number"
                          placeholder="Enter Rental Price ₹"
                          as={CustomTextField}
                          variant="outlined"
                          InputProps={{
                            inputProps: {
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            },
                            sx: {
                              '& input[type=number]': {
                                MozAppearance: 'textfield',
                              },
                              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                                {
                                  WebkitAppearance: 'none',
                                  margin: 0,
                                },
                            },
                          }}
                          fullWidth
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                          }}
                        >
                          <ErrorMessage name="rentalPrice" />
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <CustomFormLabel>
                          Select Availability Status{<CustomStar />}
                        </CustomFormLabel>
                        <Select
                          styles={reactSelectStyles}
                          options={availabilityStatuses}
                          value={values.availabilityStatus}
                          onChange={(selectedOption) => {
                            setFieldValue('availabilityStatus', selectedOption);
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: 'none',
                            marginTop: '5px',
                          }}
                        ></Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                          }}
                        >
                          <ErrorMessage name="availabilityStatus" />
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box>
                        <CustomFormLabel htmlFor="rentalStartDate">
                          Rental Start Date {<CustomStar />}
                        </CustomFormLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            onChange={(newValue) => {
                              setFieldValue('rentalStartDate', newValue);
                            }}
                            minDateTime={new Date()}
                            renderInput={(inputProps) => (
                              <CustomTextField
                                variant="outlined"
                                size="large"
                                inputProps={{ 'aria-label': 'basic date picker' }}
                                {...inputProps}
                                fullWidth
                              />
                            )}
                            value={values.rentalStartDate}
                          />
                        </LocalizationProvider>
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                          }}
                        >
                          <ErrorMessage name="rentalStartDate" />
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <CustomFormLabel htmlFor="rentalStartDate">
                          Rental End Date {<CustomStar />}
                        </CustomFormLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            onChange={(newValue) => {
                              setFieldValue('rentalEndDate', newValue);
                            }}
                            minDateTime={new Date()}
                            renderInput={(inputProps) => (
                              <CustomTextField
                                variant="outlined"
                                size="large"
                                inputProps={{ 'aria-label': 'basic date picker' }}
                                {...inputProps}
                                fullWidth
                              />
                            )}
                            value={values.rentalEndDate}
                          />
                        </LocalizationProvider>
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                          }}
                        >
                          <ErrorMessage name="rentalEndDate" />
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Box>
                        <CustomFormLabel>Select Category{<CustomStar />}</CustomFormLabel>
                        <Select
                          styles={reactSelectStyles}
                          options={FurnitureCategories}
                          value={values.category}
                          onChange={(selectedOption) => {
                            setFieldValue('category', selectedOption);
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: 'none',
                            marginTop: '5px',
                          }}
                        ></Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                          }}
                        >
                          <ErrorMessage name="category" />
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CustomFormLabel>Upload Images</CustomFormLabel>
                      <div className="mx-5 my-3 border-2 rounded-lg">
                        <Box className="flex flex-col justify-center items-center">
                          <div className="flex flex-wrap justify-center">
                            {images.map((image, index) => (
                              <Box
                                key={index}
                                className="relative m-2 border rounded-md overflow-hidden"
                              >
                                <Image
                                  width="100"
                                  height="100"
                                  src={URL.createObjectURL(image)}
                                  alt={`profileImage-${index}`}
                                  className="object-cover w-full h-40"
                                />
                                <button
                                  onClick={() => handleRemoveImage(index)}
                                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                  aria-label="Remove image"
                                >
                                  <IconX />
                                </button>
                              </Box>
                            ))}
                            <Box
                              {...getRootProps()}
                              className="relative m-2 border-dashed border-gray-300 rounded-md overflow-hidden"
                              style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                            >
                              <input {...getInputProps()} />
                              <Button
                                variant="body1"
                                className={`text-gray-600 flex items-center justify-center ${
                                  isDragActive ? 'text-blue-600' : ''
                                }`}
                                style={{ width: '100%', height: '100%' }}
                              >
                                {isDragActive ? 'Drop here' : <IconPlus />}
                              </Button>
                            </Box>
                          </div>
                        </Box>
                      </div>
                    </Grid>
                  </Grid>

                  <DialogActions className=" flex justify-end mt-2 ">
                    <Box>
                      <Button
                        color="primary"
                        size="large"
                        onClick={() => {
                          setShowEditForm(false);
                        }}
                        fullWidth
                      >
                        Cancel
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        sx={{
                          bgcolor: (theme) => theme.palette.success.light,
                          color: (theme) => theme.palette.success.main,
                          borderRadius: '8px',
                        }}
                        size="large"
                        fullWidth
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Edit Product'}
                      </Button>
                    </Box>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default AddProductForm;
