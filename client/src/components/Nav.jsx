import React from "react";
import SearchBar from "./SearchBar";
import {Link} from 'react-router-dom';

export default function Nav() {
    return (
        <div>
            <Link to='/home'>
                <span>Home</span>
            </Link>
            <Link to='/detail'>
                <span>Create breed</span>
            </Link>
            <SearchBar />
        </div>
    )
}