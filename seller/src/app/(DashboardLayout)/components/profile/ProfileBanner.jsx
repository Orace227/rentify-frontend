import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import EditProfile from '@/app/(DashboardLayout)/(pages)/profile/EditProfile';
// import { useCustomer } from '@/app/hooks/useCustomer';
import IconButton from '@mui/material/IconButton';
import {
  IconBrandFacebook,
  IconBrandYoutube,
  IconFileDescription,
  IconUserCheck,
  IconWorldStar,
  IconMilitaryRank,
  IconMilitaryAward,
} from '@tabler/icons-react';
import ProfileTab from './ProfileTab';
import BlankCard from '../shared/BlankCard';
import React, { useState } from 'react';
import Image from 'next/image';
import { useSeller } from '@/app/hooks/useSeller';
const ProfileBanner = ({ serviceProvider }) => {
  const [showEditProfilePic, setShowEditProfilePic] = useState(false);
  const ProfileImage = styled(Box)(() => ({
    backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const SmallEditIcon = styled(EditIcon)`
    font-size: 16px; /* Adjust the font size as needed */
  `;
  const { seller } = useSeller();

  const handleEditProfilePic = () => {
    // Add your logic to handle editing the profile picture
    console.log('Editing profile picture...');
    setShowEditProfilePic(true);
  };

  const EditButton = styled(IconButton)`
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: #171c23;
    border: 2px solid white;
    &:hover {
      background-color: #333f55;
    }
  `;

  return (
    <>
      <BlankCard>
        <CardMedia
          component="img"
          image={'/images/backgrounds/profilebg.jpg'}
          alt={'profilecover'}
          width="100%"
          height="330px"
        />
        {showEditProfilePic && (
          <EditProfile
            showEditProfilePic={showEditProfilePic}
            setShowEditProfilePic={setShowEditProfilePic}
          />
        )}

        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {/* Post | Followers | Following */}
          <Grid
            item
            lg={4}
            sm={12}
            md={5}
            xs={12}
            sx={{
              order: {
                xs: '2',
                sm: '2',
                lg: '1',
              },
            }}
          >
            <Stack direction="row" textAlign="center" justifyContent="center" gap={6} m={3}>
              <Box>
                <Typography className="flex justify-center items-center" color="text.secondary">
                  <IconFileDescription width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  938
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Hired Service providers
                </Typography>
              </Box>
              {/* <Box>
                <Typography className="flex justify-center items-center" color="text.secondary">
                  <IconWorldStar width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {serviceProvider?.profile?.rating}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Rating
                </Typography>
              </Box> */}
              <Box>
                <Typography className="flex justify-center items-center" color="text.secondary">
                  <IconUserCheck width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  2,659
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Reviews
                </Typography>
              </Box>
            </Stack>
          </Grid>
          {/* about profile */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '1',
                sm: '1',
                lg: '2',
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              sx={{
                mt: '-85px',
              }}
            >
              <Box>
                <ProfileImage className=" relative">
                  <Avatar
                    src={'/public/images/profile/user-1.jpg'}
                    alt="profileImage"
                    sx={{
                      borderRadius: '50%',
                      width: '100px',
                      height: '100px',
                      border: '4px solid #fff',
                    }}
                  />
                  {!serviceProvider ? (
                    <Tooltip title="Edit Profile Picture">
                      <EditButton onClick={handleEditProfilePic} className=" ">
                        <SmallEditIcon />
                      </EditButton>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <div className=" flex justify-center items-center gap-1">
                          <div className="text-lg">By</div>
                          <Image
                            src="/logos/Karymitra b.png"
                            alt="Badge From Karymitra"
                            width="70"
                            height="70"
                          />
                        </div>
                      }
                    >
                      <EditButton className="flex justify-center items-center">
                        <IconMilitaryAward />
                      </EditButton>
                    </Tooltip>
                  )}
                </ProfileImage>

                <Box mt={1}>
                  <Typography fontWeight={600} variant="h5">
                    {seller?.firstName}
                  </Typography>
                  <Typography color="textSecondary" variant="h6" fontWeight={400}>
                    {seller?.lastName}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* friends following buttons */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '3',
                sm: '3',
                lg: '3',
              },
            }}
          >
            <Stack direction={'row'} gap={2} alignItems="center" justifyContent="center" my={2}>
              <Button color="primary" variant="contained">
                Edit Your Profile
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {/**TabbingPart**/}
        {/* <ProfileTab serviceProvider={serviceProvider} /> */}
      </BlankCard>
    </>
  );
};

export default ProfileBanner;
