import { NavLink } from "react-router";

export default function Page404() {
    return (
        <>
            <h1>404</h1>
            <h2>Page not found</h2>
            <NavLink to="/" end>Home</NavLink>

        </>


    );
}