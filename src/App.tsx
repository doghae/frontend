import { Routes } from "./routes";
import { theme } from "@/styles/variants/index";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
