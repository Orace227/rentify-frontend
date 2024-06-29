import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IconUserPlus, IconMenu2 } from '@tabler/icons-react';
// import AlertCart from '../ProductCart/AlertCart';
import BlankCard from '../../shared/BlankCard';
import Image from 'next/image';
import CustomToast from '../../forms/theme-elements/CustomToast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LocationSearch from './SearchLocation';
import { filterReset } from '@/store/reducers/products/ProductsSlice';
const ProductList = ({ onClick }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [isLoading, setLoading] = React.useState(true);
  const [Product, setProduct] = React.useState([]);
  const [coordinates, setCoordinates] = React.useState({});

  const getVisibleProduct = (Product, sortBy, filters, search) => {
    if (filters.category !== 'All') {
      Product = Product.filter((_Product) =>
        _Product.profile.specializations.some(
          (specialization) => specialization.value === filters.category,
        ),
      );
    }

    //FILTER Product BY Search
    if (search !== '') {
      Product = Product.filter((_Product) =>
        _Product.firstName.toLocaleLowerCase().includes(search?.toLocaleLowerCase()),
      );
    }
    if (sortBy != 5) {
      Product = Product.filter((_Product) => _Product.profile.rating == sortBy);
    }

    if (filters.exp != '15-20') {
      Product = Product.filter(
        (_Product) => _Product.profile?.workExperience?.value == filters.exp,
      );
    }

    return Product;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const body = {
          selectData: {},
        };
        if (coordinates?.latitude && coordinates?.longitude) {
          const ProductData = await axios.post(
            `/serviceProvider/fetchFurniture?availabilityStatus=available&lat=${coordinates.latitude}&lng=${coordinates.longitude}`,
            body,
          );
          console.log('result result ', ProductData.data);
          if (ProductData.status === 200) {
            setProduct(ProductData.data);
          }
        } else {
          const ProductData = await axios.post(
            `/Product/fetchProduct?verificationStatus=approved`,
            body,
          );
          console.log(ProductData.data);
          if (ProductData.status === 200) {
            setProduct(ProductData.data);
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response?.status === 404) {
          CustomToast({
            message: 'Product not found! Please try again',
            status: 'error',
          });
        }

        if (error.response?.status === 500) {
          CustomToast({ message: 'Some internal server error!', status: 'error' });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [coordinates]);

  // const getProduct = useSelector((state) =>
  //   getVisibleProduct(
  //     Product,
  //     state.productReducer.sortBy,
  //     state.productReducer.filters,
  //     state.productReducer.Productearch,
  //   ),
  // );

  const getProduct = useSelector((state) => state.products);

  const handleHireProduct = async (Product) => {
    try {
      console.log(Product);
      router.push(`/hireAProduct/${Product.ProductId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {/* ------------------------------------------- */}
      {/* Header Detail page */}
      {/* ------------------------------------------- */}
      <Stack direction="row" justifyContent="space-between" pb={3}>
        {lgUp ? (
          <Typography variant="h5">Service Providers</Typography>
        ) : (
          <Fab onClick={onClick} color="primary" size="small">
            <IconMenu2 width="16" />
          </Fab>
        )}
        <Box>
          <LocationSearch setCoordinates={setCoordinates} />
        </Box>
        {/* <Box>
          <Productearch />
        </Box> */}
      </Stack>

      {/* ------------------------------------------- */}
      {/* Page Listing Product */}
      {/* ------------------------------------------- */}
      <Grid container spacing={3}>
        {getProduct?.length > 0 ? (
          <>
            {getProduct?.map((provider) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                display="flex"
                alignItems="stretch"
                key={provider.ProductId}
              >
                {/* ------------------------------------------- */}
                {/* Product Card */}
                {/* ------------------------------------------- */}
                {isLoading ? (
                  <>
                    <Skeleton
                      variant="rectangular"
                      width={270}
                      height={300}
                      sx={{
                        borderRadius: (theme) => theme.shape.borderRadius / 5,
                      }}
                    ></Skeleton>
                  </>
                ) : (
                  <BlankCard className="hoverCard">
                    <Typography component={Link} href={``}>
                      <Image
                        // src={`${provider?.profile?.profileImage}`}
                        src={provider?.photo}
                        alt="img"
                        width={100}
                        height={100}
                        style={{ width: '100%', height: '200px' }}
                      />
                    </Typography>
                    <Tooltip title="Buy a Product">
                      <Fab
                        size="small"
                        color="primary"
                        onClick={() => {
                          handleHireProduct(provider);
                        }}
                        sx={{
                          bottom: '93px',
                          right: '15px',
                          position: 'absolute',
                        }}
                      >
                        {/* <Typography variant="body2">10+</Typography> */}

                        <IconUserPlus size="16" />
                      </Fab>
                    </Tooltip>
                    <CardContent sx={{ p: 3, pt: 2 }}>
                      <Typography variant="h6">{provider.name}</Typography>
                      <Stack direction="column" justifyContent="start" mt={1}>
                        <Tooltip title="description">
                          <Stack direction="row" alignItems="center">
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              className="flex gap-2 truncate"
                            >
                              <Typography variant="body2" color="textPrimary">
                                {provider?.description}
                              </Typography>
                            </Typography>
                          </Stack>
                        </Tooltip>
                      </Stack>
                    </CardContent>
                  </BlankCard>
                )}
              </Grid>
            ))}
          </>
        ) : (
          <>
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <Box textAlign="center" mt={6} className="flex flex-col justify-center items-center">
                <Image
                  src="/images/products/empty-shopping-cart.svg"
                  alt="cart"
                  width={200}
                  height={100}
                />
                <Typography variant="h2">There is no Product in your area</Typography>
                <Typography variant="h6" mb={3} mt={1}>
                  The Product you are searching is no longer available.
                </Typography>
                <Button variant="contained" onClick={() => dispatch(filterReset())}>
                  Try Again
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;
