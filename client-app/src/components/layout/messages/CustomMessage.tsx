import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const CustomMessage = ({
    message,
    isLoading = false,
}: {
    message: string;
    isLoading?: boolean;
}) => {
    return (
        <section className="flex flex-col gap-4 items-center justify-center flex-1 bg-slate-200">
            {isLoading && (
                <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-2xl" />
            )}
            <h1 className="text-base font-bold uppercase text-slate-800">
                {message}
            </h1>
        </section>
    );
};
