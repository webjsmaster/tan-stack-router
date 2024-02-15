import {createFileRoute} from '@tanstack/react-router';
import Dnd from "../pages/dnd/Dnd.tsx";

export const Route = createFileRoute('/dnd')({
    component: DndRoute,
})

function DndRoute() {
    console.log('[9] 🥕: PARRENT')
    return <Dnd/>
}
