import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="p-2 flex gap-10 bg-amber-300 justify-center mb-10">
                <Link to="/" className="[&.active]:font-bold [&.active]:underline">
                    Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold [&.active]:underline">
                    About
                </Link>
                <Link to="/dnd" className="[&.active]:font-bold [&.active]:underline">
                    Dnd
                </Link>
                <Link to="/free-structure" className="[&.active]:font-bold [&.active]:underline">
                    Free Structure
                </Link>
            </div>
            <hr/>
            <Outlet/>
            <TanStackRouterDevtools/>
        </>
    ),
})
