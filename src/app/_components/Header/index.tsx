import Link from "next/link";

export default function Header() {
    return (
        <header className="font-sans flex justify-center mt-8">
            <Link href="/">
                <h1 className="text-4xl font-bold cursor-pointer">Spoiler Label Annotation</h1>
            </Link>
        </header>
    )
}