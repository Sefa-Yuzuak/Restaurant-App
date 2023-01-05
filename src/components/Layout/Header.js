import React from "react";

import HeaderCarButton from "./HeaderCartButton";
import mealsImage from '../../assets/meals.jpg'
import logo from '../../assets/logo.png'
import classes from './Header.module.css'

const Header = props => {
    return <React.Fragment>
        <header className={classes.header}>
        <div className={classes['logo']}>
            <img src={logo} alt='restourant logo' />
        </div>
            <HeaderCarButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt='A table full of delicious food!' />
        </div>
    </React.Fragment>
};

export default Header;