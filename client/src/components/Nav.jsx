import React from "react";
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div>
            <SearchBar />
            <Link to='/home'>
                <span>HOME</span>
            </Link>
            <Link to='/create'>
                <span>CREATE</span>
            </Link>
            
        </div>
    )
}