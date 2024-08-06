import { Routes } from "./routes";
import { theme } from "@/styles/variants/index";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext"; // UserContext import

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <UserProvider> {/* UserProvider 추가 */}
          <Routes />
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
