import { Grid, GridItem } from "@chakra-ui/react";
import { Section1 } from "./Section1";
import { Section2 } from "./Section2";
import { Section3 } from "./Section3";
import { Section4 } from "./Section4";
import { Loginbox } from "./Loginbox";

export const Contents = () => {
  return (
    <>
      <Grid
        h={{ base: "1600px", md: "2000px" }}
        w="100%"
        templateRows={{ base: "repeat(4, 1fr)", md: "1fr 300px 300px 500px" }}
        templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
        gap={{ base: 50, md: 100 }}
      >
        <GridItem id="section1" rowSpan={1} backgroundColor={"transparent"}>
          <Section1 />
        </GridItem>
        <GridItem id="section2" rowSpan={1} backgroundColor={"transparent"}>
          <Section2 />
        </GridItem>
        <GridItem id="section3" rowSpan={1} backgroundColor={"transparent"}>
          <Section3 />
        </GridItem>
        <GridItem id="section4" rowSpan={1} backgroundColor={"transparent"}>
          <Section4 />
        </GridItem>
      </Grid>

      <Loginbox />
    </>
  );
};
