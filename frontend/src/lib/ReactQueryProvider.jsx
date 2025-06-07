import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

function ReactQueryProvider({ children }) {

  const defaultQueryFn = async ({ queryKey }) => {
    const { data } = await axios.get(
      `http://localhost:3000${queryKey[0]}`,
    )
    return data
  }

  const [client] = useState(new QueryClient({
   defaultOptions:{
    queries:{
      queryFn:defaultQueryFn
    }
   }
  }));

  return <QueryClientProvider client={client}>

    {children}
    
    </QueryClientProvider>;
}

export default ReactQueryProvider;