export const Footer = () => {
    return (
        <footer className="flex items-center justify-between p-8 bg-blue-500 text-black">
            <span>Copyright &copy; {new Date().getFullYear()} </span>
            <span>All rights reserved.</span>
        </footer>
    );
};
