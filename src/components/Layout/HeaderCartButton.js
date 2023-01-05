import { useContext, useEffect, useState } from 'react'

import CartIcon from "../Cart/CartIcon"
import CartContext from '../store/cart-context'
import classes from './HeaderCartButton.module.css'

const HeaderCarButton = props => {
    const [btnIsHighLighted, setBtnIsHighLighted] = useState (false); //animasyon için
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx; //Destructring örneği

    const numberOfCartItems =items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0 ); //second argument for initial value
 
    const btnClasses = `${classes.button} ${btnIsHighLighted ?  classes.bump : ''} ` //if you want to appent multiple class write like this

    useEffect(()=> {
        if(items.length === 0){
            return;
        }
        setBtnIsHighLighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighLighted(false) //bump animasyonu 300 ms de gerçekleşiyor animasyonun clasını kaldırmak için false yapıyoruz
        }, 300);
        
        return () => {
            clearTimeout(timer); // tekrar tekrar çalışması için timerı temizliyoruz. 
        }
    }, [items])
    
    return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
)
}

export default HeaderCarButton;