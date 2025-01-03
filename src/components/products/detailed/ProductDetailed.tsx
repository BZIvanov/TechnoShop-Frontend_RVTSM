import { useNavigate, useParams } from "react-router";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { useDispatch, useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";
import {
  useGetProductQuery,
  useGetSimilarProductsQuery,
} from "@/providers/store/services/products";
import { showNotification } from "@/providers/store/features/notification/notificationSlice";
import { useAddToWishlistMutation } from "@/providers/store/services/wishlist";
import {
  useGetMyProductReviewQuery,
  useReviewProductMutation,
} from "@/providers/store/services/reviews";
import {
  addToCart,
  setDrawerOpen,
} from "@/providers/store/features/cart/cartSlice";
import { UserRoles } from "@/providers/store/services/types/users";
import ImagesCarousel from "@/components/common/images/ImagesCarousel";
import { currencyFormatter, percentFormatter } from "@/utils/formatting";
import ProductRating from "../ProductRating";
import InfoTextListItem from "./InfoTextListItem";
import InfoChipsListItem from "./InfoChipsListItem";
import InfoTabs from "./InfoTabs";
import AddToCart from "../actions/AddToCart";
import AddToWishlist from "../actions/AddToWishlist";
import RateProduct from "../actions/RateProduct";
import ChatWithSeller from "../actions/ChatWithSeller";
import ProductsList from "../ProductsList";

const ProductDetailed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productId } = useParams();

  const user = useSelector(selectUser);

  const { data: productData } = useGetProductQuery(productId || "", {
    skip: !productId,
  });
  const product = productData?.product;
  const { data: similarProductsData } = useGetSimilarProductsQuery(
    productId || "",
    { skip: !productId }
  );
  const { data: myReviewData } = useGetMyProductReviewQuery(productId || "", {
    skip: !user || user.role !== UserRoles.BUYER,
  });

  const [addToWishlist] = useAddToWishlistMutation();
  const [reviewProduct] = useReviewProductMutation();

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, count: 1 }));
    dispatch(setDrawerOpen(true));
  };

  const handleAddToWishlist = async () => {
    const result = await addToWishlist(product._id);

    if ("error" in result) {
      navigate(`/${UserRoles.BUYER}/wishlist`);
    } else {
      dispatch(
        showNotification({ type: "success", message: "Added to the wishlist" })
      );
    }
  };

  const handleRateProduct = async (rating: number) => {
    const result = await reviewProduct({ id: product._id, rating });

    if (!("error" in result)) {
      dispatch(
        showNotification({
          type: "success",
          message: `Successfully rated with rating of ${rating} stars`,
        })
      );
    }
  };

  const discountedPrice =
    product?.price - (product?.price * product?.discount) / 100;

  return (
    <Grid container={true} columns={12} sx={{ padding: 2 }}>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ "& .slide img": { maxHeight: "390px", objectFit: "cover" } }}
      >
        <ImagesCarousel images={product.images} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }} sx={{ paddingLeft: 1 }}>
        <Typography
          gutterBottom={true}
          variant="h5"
          sx={{
            color: (theme) => theme.palette.common.white,
            backgroundColor: (theme) => theme.palette.primary.main,
            padding: 1,
          }}
        >
          {product.title}
        </Typography>

        <ProductRating
          rating={product.averageRating}
          reviews={product.reviewCount}
        />

        <Card sx={{ width: "100%", bgcolor: "background.paper" }}>
          <CardContent>
            <InfoTextListItem itemKey="Price">
              <Box display="flex" gap={3} alignItems="center">
                {product?.discount !== 0 ? (
                  <Typography variant="h6" color="error" fontWeight="bold">
                    <Typography
                      component="span"
                      sx={{
                        textDecoration: "line-through",
                        marginRight: 1,
                      }}
                    >
                      {currencyFormatter(product.price)}
                    </Typography>
                    {currencyFormatter(discountedPrice)} (-
                    {percentFormatter(product.discount / 100)})
                  </Typography>
                ) : (
                  <Typography variant="h6" color="error" fontWeight="bold">
                    {currencyFormatter(product?.price)}
                  </Typography>
                )}
              </Box>
            </InfoTextListItem>
            <InfoChipsListItem
              linkType="category"
              itemKey="Category"
              itemValues={product.category}
            />
            <InfoChipsListItem
              linkType="subcategory"
              itemKey="Subcategories"
              itemValues={product.subcategories}
            />
            <InfoTextListItem itemKey="Shipping">
              <Typography variant="body1">{product.shipping}</Typography>
            </InfoTextListItem>
            <InfoTextListItem itemKey="Color">
              <Typography variant="body1">{product.color}</Typography>
            </InfoTextListItem>
            <InfoTextListItem itemKey="Brand">
              <Typography variant="body1">{product.brand}</Typography>
            </InfoTextListItem>
            <InfoTextListItem itemKey="Quantity">
              <Typography variant="body1">{product.quantity}</Typography>
            </InfoTextListItem>
            <InfoTextListItem itemKey="Sold">
              <Typography variant="body1">{product.sold}</Typography>
            </InfoTextListItem>
            <InfoTextListItem itemKey="Shop">
              <Typography variant="body1">
                {product.shop?.shopInfo?.name || ""}
              </Typography>
            </InfoTextListItem>
          </CardContent>

          {(!user || user.role === UserRoles.BUYER) && (
            <CardActions>
              <AddToCart
                productId={product._id}
                productQuantity={product.quantity}
                onAddToCart={handleAddToCart}
              />
              <AddToWishlist
                productId={product._id}
                onAddToWishlist={handleAddToWishlist}
              />
              <RateProduct
                productId={product._id}
                onRateProduct={handleRateProduct}
                review={myReviewData?.review}
              />
              <ChatWithSeller
                productId={product._id}
                shopSellerId={product?.shop?.user.toString()}
              />
            </CardActions>
          )}
        </Card>
      </Grid>

      <Box sx={{ width: "100%", marginBlock: 3 }}>
        <Divider />
      </Box>

      <Grid size={{ xs: 12 }}>
        <InfoTabs productId={product._id} description={product.description} />
      </Grid>

      <Box sx={{ width: "100%", marginBlock: 3 }}>
        <Divider />
      </Box>

      <Grid size={{ xs: 12 }}>
        <Typography
          variant="h5"
          sx={{
            width: "100%",
            textAlign: "center",
            backgroundColor: (theme) => theme.palette.grey[300],
            p: 2,
            borderRadius: 1,
          }}
        >
          Similar Products
        </Typography>

        <ProductsList products={similarProductsData?.products || []} />
      </Grid>
    </Grid>
  );
};

export default ProductDetailed;
