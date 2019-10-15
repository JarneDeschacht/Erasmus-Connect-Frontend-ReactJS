import React from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout = props => {
    return (
        <Aux>
            <main >
                {props.children}
            </main>
            <Toolbar />
        </Aux>
    );
}

export default layout;