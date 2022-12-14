import React from "react";
import { QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import { getClient } from "./queryClient";
import { routes } from "./routes";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "./components/layout/Header/Header";
const App = () => {
  const elem = useRoutes(routes);
  const queryClient = getClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Header />
      {elem}
    </QueryClientProvider>
  );
};

export default App;
