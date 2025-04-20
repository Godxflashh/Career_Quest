"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
    const imageRef = useRef(null);

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled");
            } else {
                imageElement.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="w-full pt-36 md:pt-48 pb-10">
            <div className="space-y-6 text-center">
                <div className="space-y-6 mx-auto">
                    <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-400 via-gray-200 to-gray-600 bg-clip-text text-transparent text-center sm:text-6xl">
                        Your AI Career coach is Here for Your
                        <br />
                        Professional Success
                    </h1>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                        Advance your career with personalized guidance, interview prep, and AI powered tools for job Success.
                    </p>
                </div>
                <div className="flex justify-center space-x-4">
                    <Link href="/register">
                        <Button size="lg" className="px-8">
                            Get Started
                        </Button>
                    </Link>
                </div>
                <div className="hero-image-wrapper">
                    <div>
                        <Image
                            ref={imageRef}
                            src={"/banner.jpeg"}
                            width={1280}
                            height={720}
                            alt="Banner Career Quest"
                            className="rounded-lg shadow-2xl border mx-auto hero-image"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;