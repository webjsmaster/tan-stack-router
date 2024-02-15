import {createLazyFileRoute} from '@tanstack/react-router';
import FileStructure from "@/pages/file-structure/FileStructure.tsx";

export const Route = createLazyFileRoute('/free-structure')({
    component: FreeStructureRoute,
})

function FreeStructureRoute() {
    return <FileStructure/>
}
