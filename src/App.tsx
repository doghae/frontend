import { theme } from "@/styles/variants/index";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <p>hello</p>
    </ChakraProvider>
  );
};

export default App;
