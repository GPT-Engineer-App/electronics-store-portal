import { Box, Button, Container, Flex, Grid, Heading, IconButton, Image, Link, Text, VStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const sampleProducts = [
  { id: 1, name: "Smartphone", price: "$699", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Laptop", price: "$999", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Smartwatch", price: "$199", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Headphones", price: "$299", image: "https://via.placeholder.com/150" },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [productType, setProductType] = useState("");
  const [brand, setBrand] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesPrice = parseInt(product.price.replace("$", "")) <= priceRange[1];
    const matchesType = productType ? product.name.toLowerCase().includes(productType) : true;
    const matchesBrand = brand ? product.name.toLowerCase().includes(brand.toLowerCase()) : true;
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) && matchesPrice && matchesType && matchesBrand;
  });
  return (
    <Container maxW="container.xl" p={0}>
      {/* Navigation Bar */}
      <Flex as="nav" align="center" justify="space-between" p={4} bg="gray.800" color="white">
        <Heading size="md">ElectroShop</Heading>
        <Flex>
          <Link href="#" mx={2}>Home</Link>
          <Link href="#" mx={2}>Products</Link>
          <Link href="#" mx={2}>About</Link>
          <Link href="#" mx={2}>Contact</Link>
          <Input
            placeholder="Search products"
            value={searchQuery}
            onChange={handleSearchChange}
            ml={4}
            bg="white"
            color="black"
            width={{ base: "100px", md: "200px" }}
          />
        </Flex>
        <IconButton aria-label="Cart" icon={<FaShoppingCart />} />
      </Flex>

      {/* Hero Section */}
      <Box as="section" bg="gray.200" py={20} textAlign="center">
        <Image src="https://via.placeholder.com/800x300" alt="Featured Product" mx="auto" mb={4} />
        <Button colorScheme="teal" size="lg">Shop Now</Button>
      </Box>

      {/* Filter Options */}
      <Box as="section" py={10}>
        <Heading size="lg" mb={6} textAlign="center">Filter Products</Heading>
        <Flex justify="center" mb={6}>
          <Box mx={2}>
            <Text>Price Range</Text>
            <Input
              type="range"
              min="0"
              max="1000"
              value={priceRange}
              onChange={(e) => setPriceRange([0, e.target.value])}
            />
            <Text>{`$0 - $${priceRange[1]}`}</Text>
          </Box>
          <Box mx={2}>
            <Text>Product Type</Text>
            <Select placeholder="Select type" value={productType} onChange={(e) => setProductType(e.target.value)}>
              <option value="smartphone">Smartphone</option>
              <option value="laptop">Laptop</option>
              <option value="smartwatch">Smartwatch</option>
              <option value="headphones">Headphones</option>
            </Select>
          </Box>
          <Box mx={2}>
            <Text>Brand</Text>
            <Select placeholder="Select brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="brandA">Brand A</option>
              <option value="brandB">Brand B</option>
              <option value="brandC">Brand C</option>
            </Select>
          </Box>
        </Flex>
      </Box>

      {/* Product Listings */}
      <Box as="section" py={10}>
        <Heading size="lg" mb={6} textAlign="center">Featured Products</Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
          {filteredProducts.map(product => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} textAlign="center">
              <Image src={product.image} alt={product.name} mb={4} />
              <Text fontWeight="bold">{product.name}</Text>
              <Text>{product.price}</Text>
              <Button colorScheme="teal" mt={2}>Add to Cart</Button>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box as="footer" bg="gray.800" color="white" py={10} textAlign="center">
        <Flex justify="center" mb={4}>
          <Link href="#" mx={2}>Facebook</Link>
          <Link href="#" mx={2}>Twitter</Link>
          <Link href="#" mx={2}>Instagram</Link>
        </Flex>
        <Text>&copy; 2023 ElectroShop. All rights reserved.</Text>
      </Box>
    </Container>
  );
};

export default Index;