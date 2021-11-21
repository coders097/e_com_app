import React, { ReactElement } from 'react';

const StyleWrapper = (props:{
    children: ReactElement;
}) => {
    return (
        <section className="StyleWrapper">
            <h2>TOP CATEGORIES</h2>
            {props.children}
        </section>
    );
};

export default StyleWrapper;