import LiveBlockProvider from "@/components/LiveBlocksProvider";

function PageLayout({ children }: { children: React.ReactNode }) {
    return <LiveBlockProvider>{children}</LiveBlockProvider>
}

export default PageLayout;