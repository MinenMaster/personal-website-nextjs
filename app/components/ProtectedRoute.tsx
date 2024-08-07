import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const pathname = usePathname();
        if (!loading && !isAuthenticated) {
            router.push("/login?from=" + pathname);
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
        return <p>Loading...</p>;
    }

    return children;
};

export default ProtectedRoute;
