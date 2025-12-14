import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, adminOnly = false, ...rest }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!user) return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
                if (adminOnly && user.role !== 'admin') return <Redirect to={{ pathname: '/' }} />;
                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;
