import { Grid, GridItem } from "@chakra-ui/react";

export const Contents = () => {
  return (
    <Grid
      h={{ base: "2000px", md: "2500px" }} // 'md' 이상일 때 2500px, 작을 때 2000px
      w="100%"
      templateRows={{ base: "repeat(4, 1fr)", md: "1fr 1fr 1fr 1fr" }} // 'md' 이상일 때 '1fr 1fr 600px', 작을 때 'repeat(3, 1fr)'
      templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} // 'md' 이상일 때 'repeat(1, 1fr)', 작을 때 '1fr'
      gap={{ base: 50, md: 100 }} // 'md' 이상일 때 100, 작을 때 50
    >
      <GridItem id="section1" rowSpan={1} backgroundColor={"transparent"}>
        <p>첫 번째 컴포넌트</p>
      </GridItem>
      <GridItem id="section2" rowSpan={1} backgroundColor={"transparent"}>
        <p>두 번째 컴포넌트</p>
      </GridItem>
      <GridItem id="section3" rowSpan={1} backgroundColor={"transparent"}>
        <p>세 번째 컴포넌트</p>
      </GridItem>
      <GridItem id="section4" rowSpan={1} backgroundColor={"transparent"}>
        <p>네 번째 컴포넌트</p>
      </GridItem>
    </Grid>
  );
};
