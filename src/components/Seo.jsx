// src/components/Seo.jsx
import { Helmet } from "react-helmet-async";

export default function Seo({ title, description }) {
    return (
        <Helmet>
            <title>{title} | Amigo Secreto Online</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
    );
}