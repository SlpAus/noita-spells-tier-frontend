const Link = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 underline">
        {children}
    </a>
);

export default function Footer() {
    return (
        <footer className="text-center text-sm text-gray-400 mt-24 mb-12">
            <p>
                开发 <Link href="https://github.com/SlpAus">@SlpAus</Link>
            </p>
            <p>
                <Link href="https://github.com/SlpAus/noita-spells-tier-frontend">noita-spells-tier</Link>
            </p>
        </footer>
    );
}