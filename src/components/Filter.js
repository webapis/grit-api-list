//'use client'
import React from "react";

import Navigation from "./Navigation";
import { Box } from "@mui/material";

export default function CustomDrawer({
    facets,
}) {
    return (

        <Box sx={{ backgroundColor:'yellow' }}>
            {/* <Navigation
                limit={10}
                title="Ana Kategori:"
                attribute="anaKategori"
                items={facets}
            />
            <Navigation
                items={facets}
                limit={10}
                title="Kategori:"
                attribute="kategori"
            />

            <Navigation
                items={facets}
                limit={10}
                title="Markalar:"
                attribute="marka"
            />

            <Navigation items={facets} limit={10} title="Renk:" attribute="renk" /> */}

        </Box>

    );
}
