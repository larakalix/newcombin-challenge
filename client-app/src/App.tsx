import { useState } from "react";
import { Navbar, Footer } from "./components/layout";

function App() {
    return (
        <main className="flex flex-col justify-between min-h-screen">
            <Navbar />

            <section className="flex items-center justify-center flex-1 bg-slate-500">
                <h1 className="text-3xl font-bold uppercase text-green-500">
                    Hello world!
                </h1>
            </section>

            <Footer />
        </main>
    );
}

export default App;
