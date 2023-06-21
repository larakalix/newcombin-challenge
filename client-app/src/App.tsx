import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar, Footer, Board } from "./components/layout";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchInterval: false,
            refetchOnMount: true,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <main className="flex flex-col justify-between min-h-screen">
                <Navbar />

                <Board />

                <Footer />
            </main>
        </QueryClientProvider>
    );
}

export default App;
