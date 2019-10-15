import React from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import {useSelector} from 'react-redux';

const Layout = props => {

    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);

    return (
        <Aux>
            <main >
                {props.children}
            </main>
            {isNavbarVisible && <Toolbar/>}
        </Aux>
    );
}

export default Layout;