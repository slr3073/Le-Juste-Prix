import {createWebHistory, createRouter} from "vue-router";
import Accueil from "./components/Accueil";
import Jouer from "./components/Jouer/Jouer";
import Stats from "./components/Stats/Stats";
import Score from "./components/Score";
import Credits from "./components/Credits";

const routes = [
    {
        path: "/",
        name: "Accueil",
        component: Accueil,
    },
    {
        path: "/play",
        name: "Jouer une partie",
        component: Jouer,
    },
    {
        path: "/stats",
        name: "Statistiques",
        component: Stats,
    },
    {
        path : "/credits",
        name : "Crédits",
        component: Credits
    },
    {
        path : "/score/:id",
        name : "Détail partie",
        component: Score
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
