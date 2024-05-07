import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRouter from './navigation/Router';
import './index.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <AppRouter />
        </GoogleOAuthProvider>
    </React.StrictMode>
);