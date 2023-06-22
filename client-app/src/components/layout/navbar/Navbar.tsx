export const Navbar = () => {
    return (
        <header className="bg-slate-200">
            <nav className="w-full">
                <ul className="flex items-center [&>li>a]:text-black [&>li>a]:flex [&>li>a]:p-8 [&>li>a]:flex-1 [&>li>a]:f-w-full">
                    <li>
                        <a
                            href="/"
                            className="text-2xl font-bold uppercase text-green-500"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="/other"
                            className="text-2xl font-bold uppercase text-green-500"
                        >
                            Other page
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
