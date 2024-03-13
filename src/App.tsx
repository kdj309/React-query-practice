import { RouterProvider } from "react-router-dom";
import routes from "./routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "./App.css"
export const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom"/>
    </QueryClientProvider>
  );
}

export default App;
