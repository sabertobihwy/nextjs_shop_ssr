
export type ProLandingData = {
    hero: {
        title: string
        subheading: string
        primaryCta: { label: string; href: string }
        secondaryCta: { label: string; href: string }
        heroImage: { src: string; alt: string; width?: number; height?: number }
        video: {
            posterSrc: string
            alt: string
            sourceMp4: string
            watchLabel: string // e.g. "Watch Demo"
            durationLabel?: string // e.g. "3:47"
            ariaLabel?: string
        }
    }

    workflows: {
        eyebrow: string
        title: string
        description: string
        cards: Array<{
            href: string
            image: { src: string; alt: string; width?: number; height?: number }
            tag: string
            text: string
        }>
    }

    features: {
        eyebrow: string
        title: string
        description: string
        featuresImage: { src: string; alt: string; width?: number; height?: number }
        items: Array<{
            iconSvg?: string // 可选：直接塞 SVG 片段；也可用 iconName 自行映射
            title: string
            text: string
        }>
    }

    splitCarousel: {
        eyebrow: string
        title: string
        description: string
        tabs: Array<{
            id: string
            title: string
            text: string
            image: { src: string; alt: string; width?: number; height?: number }
        }>
        testimonial: {
            quote: string
            avatar: { src: string; alt: string; width?: number; height?: number }
            author: string
            org: { name: string; href: string }
        }
    }

    pricing: {
        eyebrow: string
        title: string
        defaultAnnual?: boolean
        plans: Array<{
            name: string
            price: { annual: number; monthly: number; currency?: string }
            blurb: string
            cta: { label: string; href: string; emphasis?: "primary" | "neutral" }
            badge?: string
            includesTitle: string
            features: string[]
        }>
        bigTestimonial: {
            quote: string
            avatar: { src: string; alt: string; width?: number; height?: number }
            author: string
            org: { name: string; href: string; title?: string }
        }
    }

    cta: {
        title: string
        primaryCta: { label: string; href: string }
        secondaryCta: { label: string; href: string }
    }

    footer: {
        columns: Array<{
            heading: string
            links: Array<{ label: string; href: string }>
        }>
        brand: {
            logo: { href?: string }
            legal: {
                copyrightHtml: string // 允许包含 "© Cruip.com · <a href='#0'>Terms</a>"
            }
            socials: Array<{ aria: string; href: string; iconSvg: string }>
        }
    }
}
const heroImage = "/pro-landing/images/hero-image-01.jpg";

const workflow01 = "/pro-landing/images/workflow-01.png";
const workflow02 = "/pro-landing/images/workflow-02.png";
const workflow03 = "/pro-landing/images/workflow-03.png";
const featuresPng = "/pro-landing/images/features.png";
const carousel01 = "/pro-landing/images/carousel-01.png";
const carousel02 = "/pro-landing/images/carousel-02.png";
const carousel03 = "/pro-landing/images/carousel-03.png";
const smallTestimonial = "/pro-landing/images/small-testimonial.jpg";
const largeTestimonial = "/pro-landing/images/large-testimonial-01.jpg";
const videoMp4 = "/pro-landing/videos/video.mp4";


// ------- 数据 -------
export const proLandingMockData: ProLandingData = {
    hero: {
        title: "AI-driven tools for product teams",
        subheading:
            "Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.",
        primaryCta: { label: "Start Building", href: "#0" },
        secondaryCta: { label: "Schedule Demo", href: "#0" },
        heroImage: {
            src: heroImage,
            alt: "Modal video thumbnail",
            width: 1104,
            height: 576,
        },
        video: {
            posterSrc: heroImage,
            alt: "Modal video thumbnail",
            sourceMp4: videoMp4,
            watchLabel: "Watch Demo",
            durationLabel: "3:47",
            ariaLabel: "Watch the video",
        }
    },

    workflows: {
        eyebrow: "Tailored Workflows",
        title: "Map your product journey",
        description:
            "Simple and elegant interface to start collaborating with your team in minutes. It seamlessly integrates with your code and your favorite programming languages.",
        cards: [
            {
                href: "#0",
                image: { src: workflow01, alt: "Workflow 01", width: 350, height: 288 },
                tag: "Built-in Tools",
                text:
                    "Streamline the product development flow with a content platform that's aligned across specs and insights.",
            },
            {
                href: "#0",
                image: { src: workflow02, alt: "Workflow 02", width: 350, height: 288 },
                tag: "Scale Instantly",
                text:
                    "Streamline the product development flow with a content platform that's aligned across specs and insights.",
            },
            {
                href: "#0",
                image: { src: workflow03, alt: "Workflow 03", width: 350, height: 288 },
                tag: "Tailored Flows",
                text:
                    "Streamline the product development flow with a content platform that's aligned across specs and insights.",
            },
        ],
    },

    features: {
        eyebrow: "Advanced Controls",
        title: "Built for modern product teams",
        description:
            "Open AI reads and understands your files, and with nothing more than a single line of feedback, so you can go further than the speed of thought.",
        featuresImage: {
            src: featuresPng, // ← 修正了 .@/ 的笔误
            alt: "Features",
            width: 1104,
            height: 384,
        },
        items: [
            {
                title: "Project Milestones",
                text: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
                iconSvg: `
                <svg class="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />
                  <path fill-opacity=".48" d="m16.295 5.393 7.528 2.034-4.436 16.412L5.87 20.185l.522-1.93 11.585 3.132 3.392-12.55-5.597-1.514.522-1.93Z" />
                </svg>`
            },
            {
                title: "Team Views",
                text: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
                iconSvg: `
                <svg class="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path fill-opacity=".48" d="M7 8V0H5v8h2Zm12 16v-4h-2v4h2Z" />
                  <path d="M19 6H0v2h17v8H7v-6H5v8h19v-2h-5V6Z" />
                </svg>`
            },
            {
                title: "Advanced Search",
                text: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
                iconSvg: `
                <svg class="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M23.414 6 18 .586 16.586 2l3 3H7a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4h12.586l-3 3L18 11.414 23.414 6Z" />
                  <path fill-opacity=".48" d="M13.01 12.508a2.5 2.5 0 0 0-3.502.482L1.797 23.16.203 21.952l7.71-10.17a4.5 4.5 0 1 1 7.172 5.437l-4.84 6.386-1.594-1.209 4.841-6.385a2.5 2.5 0 0 0-.482-3.503Z" />
                </svg>`
            },
            {
                title: "Strategic Initiatives",
                text: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
                iconSvg: `
                <svg class="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path fill-opacity=".48" d="m3.031 9.05-.593-.805 1.609-1.187.594.804a6.966 6.966 0 0 1 0 8.276l-.594.805-1.61-1.188.594-.805a4.966 4.966 0 0 0 0-5.9Z" />
                  <path d="m7.456 6.676-.535-.845 1.69-1.07.534.844a11.944 11.944 0 0 1 0 12.789l-.535.845-1.69-1.071.536-.845a9.944 9.944 0 0 0 0-10.647Z" />
                  <path d="m11.888 4.35-.514-.858 1.717-1.027.513.858a16.9 16.9 0 0 1 2.4 8.677 16.9 16.9 0 0 1-2.4 8.676l-.513.859-1.717-1.028.514-.858A14.9 14.9 0 0 0 14.003 12a14.9 14.9 0 0 0-2.115-7.65Z" opacity=".48" />
                  <path d="m16.321 2-.5-.866 1.733-1 .5.866A22 22 0 0 1 21 12c0 3.852-1.017 7.636-2.948 10.97l-.502.865-1.73-1.003.501-.865A19.878 19.878 0 0 0 19 12a20 20 0 0 0-2.679-10Z" />
                </svg>`
            },
            {
                title: "Flexible Workflows",
                text: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
                iconSvg: `
                <svg class="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path fill-opacity=".48" d="M12 8.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" />
                  <path d="m7.454 2.891.891-.454L7.437.655l-.891.454a12 12 0 0 0 0 21.382l.89.454.91-1.781-.892-.455a10 10 0 0 1 0-17.818ZM17.456 1.11l-.891-.454-.909 1.782.891.454a10 10 0 0 1 0 17.819l-.89.454.908 1.781.89-.454a12 12 0 0 0 0-21.382Z" />
                </svg>`
            },
            {
                title: "Unified Timeline",
                text: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
                iconSvg: `
                <svg class="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path fill-opacity=".48" d="M19 8h5v2h-5V8Zm-4 5h9v2h-9v-2Zm9 5H11v2h13v-2Z" />
                  <path d="M19.406 3.844 6.083 20.497.586 15 2 13.586l3.917 3.917L17.844 2.595l1.562 1.25Z" />
                </svg>`
            },
        ],
    },

    splitCarousel: {
        eyebrow: "Software Standard",
        title: "Improve efficiency & global coverage",
        description:
            "Open is so simple to use, it's easy to overlook the wealth of complex technologies packed under the hood that keep Open robust, safe, and blazing fast.",
        tabs: [
            {
                id: "strategic-sync",
                title: "Strategic Sync",
                text: "Remove corners from the avatars and transform the way your team work.",
                image: { src: carousel01, alt: "Carousel 01", width: 540, height: 520 },
            },
            {
                id: "feedback-loop",
                title: "Feedback Loop",
                text: "Best-in-class design practices to keep your work safe and secure.",
                image: { src: carousel02, alt: "Carousel 02", width: 540, height: 520 },
            },
            {
                id: "enterprise-ready",
                title: "Enterprise-Ready",
                text: "Built for teams of all sizes. From early-stage startups to global enterprises.",
                image: { src: carousel03, alt: "Carousel 03", width: 540, height: 520 },
            },
        ],
        testimonial: {
            quote:
                "I was blown away by how easy it was to create my content using this tool! Within a few hours, I had a professional-looking flow up and running.",
            avatar: { src: smallTestimonial, alt: "Small testimonial", width: 24, height: 24 },
            author: "Chris Pick",
            org: { name: "Notion Circle", href: "#0" },
        },
    },

    pricing: {
        eyebrow: "Simple Pricing",
        title: "Pick the right plan for your business",
        defaultAnnual: true,
        plans: [
            {
                name: "Freelancer",
                price: { annual: 7, monthly: 9, currency: "$" },
                blurb: "Per user/month, billed annually.",
                cta: { label: "Start free trial", href: "#0", emphasis: "neutral" },
                includesTitle: "Freelancer includes:",
                features: ["50 users per month", "Email, Live Chat, WhatsApp", "Unlimited dashboards", "Custom integrations"],
            },
            {
                name: "Small Team",
                price: { annual: 27, monthly: 29, currency: "$" },
                blurb: "Per user/month, billed annually.",
                cta: { label: "Start free trial", href: "#0", emphasis: "neutral" },
                includesTitle: "Everything in Freelancer, plus:",
                features: ["No seat limits", "Real-time space syncing", "Automatic data enrichment", "Custom billing"],
            },
            {
                name: "Business",
                price: { annual: 47, monthly: 49, currency: "$" },
                blurb: "Per user/month, billed annually.",
                cta: { label: "Start free trial", href: "#0", emphasis: "primary" },
                badge: "Popular",
                includesTitle: "Everything in Small Team, plus:",
                features: ["Adjustable permissions", "Unlimited reporting", "Bulk email sending", "Priority support"],
            },
            {
                name: "Enterprise Team",
                price: { annual: 87, monthly: 89, currency: "$" },
                blurb: "Per user/month, billed annually.",
                cta: { label: "Start free trial", href: "#0", emphasis: "neutral" },
                includesTitle: "Everything in Business, plus:",
                features: ["Strongest connection", "First calendar interaction", "Historical attributes", "Time comparisons"],
            },
        ],
        bigTestimonial: {
            quote:
                "Open PRO lives up to its name. It's incredibly easy to use yet powerful enough to handle all my content needs effortlessly. It's become an essential part of our work routine.",
            avatar: { src: largeTestimonial, alt: "Large testimonial", width: 40, height: 40 },
            author: "Chris Pick",
            org: { name: "Disney", href: "#0", title: "VP of Product" },
        },
    },

    cta: {
        title: "Join the content-first platform",
        primaryCta: { label: "Start Building", href: "#0" },
        secondaryCta: { label: "Schedule Demo", href: "#0" },
    },

    footer: {
        columns: [
            {
                heading: "Product",
                links: [
                    { label: "Features", href: "#0" },
                    { label: "Integrations", href: "#0" },
                    { label: "Pricing & Plans", href: "#0" },
                    { label: "Changelog", href: "#0" },
                    { label: "Our method", href: "#0" },
                    { label: "User policy", href: "#0" },
                ],
            },
            {
                heading: "Company",
                links: [
                    { label: "About us", href: "#0" },
                    { label: "Diversity & Inclusion", href: "#0" },
                    { label: "Blog", href: "#0" },
                    { label: "Careers", href: "#0" },
                    { label: "Financial statements", href: "#0" },
                ],
            },
            {
                heading: "Resources",
                links: [
                    { label: "Community", href: "#0" },
                    { label: "Terms of service", href: "#0" },
                    { label: "Report a vulnerability", href: "#0" },
                ],
            },
            {
                heading: "Content Library",
                links: [
                    { label: "Templates", href: "#0" },
                    { label: "Tutorials", href: "#0" },
                    { label: "Knowledge base", href: "#0" },
                    { label: "Learn", href: "#0" },
                    { label: "Cookie manager", href: "#0" },
                ],
            },
        ],
        brand: {
            logo: { href: "index.html" },
            legal: { copyrightHtml: "© Cruip.com <span class='text-gray-700'>·</span> <a class='text-indigo-200/65 transition hover:text-indigo-500' href='#0'>Terms</a>" },
            socials: [
                { aria: "Twitter", href: "#0", iconSvg: `<svg class="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z"></path></svg>` },
                { aria: "Medium", href: "#0", iconSvg: `<svg class="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M23 8H9a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Zm-1.708 3.791-.858.823a.251.251 0 0 0-.1.241V18.9a.251.251 0 0 0 .1.241l.838.823v.181h-4.215v-.181l.868-.843c.085-.085.085-.11.085-.241v-4.887l-2.41 6.131h-.329l-2.81-6.13V18.1a.567.567 0 0 0 .156.472l1.129 1.37v.181h-3.2v-.181l1.129-1.37a.547.547 0 0 0 .146-.472v-4.749a.416.416 0 0 0-.138-.351l-1-1.209v-.181H13.8l2.4 5.283 2.122-5.283h2.971l-.001.181Z"></path></svg>` },
                { aria: "Github", href: "#0", iconSvg: `<svg class="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"></path></svg>` },
            ],
        },
    },
};
