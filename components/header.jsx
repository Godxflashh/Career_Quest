import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";


const Header = () => {
    return (
    <header className="fixed top-1 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
        <nav className="conatiner mx-auto px-3 h-30 flex item-center justify-between">
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Career quest Logo"
                    width={100}
                    height={100}
                    className="h-25 py-1 w-auto object-contain"
                />
            </Link>
            <div className="flex items-center space-x-2">
                <SignedIn>
                    <Link href={"/dashboard"}>
                    <Button variant="outline">
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="hidden md:block">Industry Insights</span>
                    </Button>
                    </Link>
                </SignedIn>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button>
                        <StarIcon className="h-4 w-4" />
                        <span className="hidden md:block">Growth Tools</span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link href={"/resume"} className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span >Build Resume</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={"/ai-cover letter"} className="flex items-center gap-2">
                                <PenBox className="h-4 w-4" />
                                <span >Cover Letter</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={"/interview"} className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4" />
                                <span >Interview Prep</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <SignedOut>
                    <SignInButton>
                        <Button variant="outline">Sign In</Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton 
                      appearance={{
                        elements: {
                            avatarBox: "w-10 h-10",
                            userButtonPopoverCard: "shadow-xl",
                            userPreviewMainIdentifier: "front-semibold",
                        },
                      }}
                      afterSignOutUrl="/"
                    />
                </SignedIn>
            </div>
        </nav>
  </header>
    );
};

export default Header;
