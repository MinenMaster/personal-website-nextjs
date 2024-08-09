import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login?from=" + pathname);
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
        return (
            <div className="loaderBackground">
                <div className="loader"></div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
