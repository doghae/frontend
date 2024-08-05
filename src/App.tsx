import { Routes } from "./routes";
import { theme } from "@/styles/variants/index";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/context/AuthContext";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
