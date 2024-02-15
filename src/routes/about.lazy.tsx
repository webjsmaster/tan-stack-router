import {createLazyFileRoute} from '@tanstack/react-router';
import About from "@/pages/about/About.tsx";

export const Route = createLazyFileRoute('/about')({
    component: AboutRoute,
})

function AboutRoute() {
    return <div className="p-2"><About/></div>
}
